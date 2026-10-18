const fs = require('fs');
const https = require('https');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'assets');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const listScript = fs.readFileSync(path.join(__dirname, 'list_assets.cjs'), 'utf8');

const files = ['qitchen_dump.html', 'qitchen_menu.html', 'qitchen_about.html', 'qitchen_reservation.html'];
const allImages = new Set();
const allVideos = new Set();

files.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    const html = fs.readFileSync(filePath, 'utf8');
    const imgs = html.match(/https:\/\/framerusercontent\.com\/images\/[a-zA-Z0-9_-]+\.(?:webp|png|jpg|jpeg)/g) || [];
    imgs.forEach(i => allImages.add(i));
    const vids = html.match(/https:\/\/framerusercontent\.com\/assets\/[a-zA-Z0-9_-]+\.(?:mp4|webm)/g) || [];
    vids.forEach(v => allVideos.add(v));
  }
});

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
      console.log(`Already exists: ${path.basename(dest)}`);
      return resolve();
    }
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        return reject(new Error(`Failed to download ${url}: status code ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Downloaded: ${path.basename(dest)}`);
          resolve();
        });
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  const manifest = {};
  console.log(`Starting download of ${allImages.size} images...`);
  for (const imgUrl of allImages) {
    const filename = path.basename(imgUrl);
    const dest = path.join(targetDir, filename);
    try {
      await downloadFile(imgUrl, dest);
      manifest[imgUrl] = `/assets/${filename}`;
    } catch (err) {
      console.error(`Failed ${imgUrl}:`, err.message);
      manifest[imgUrl] = imgUrl; // fallback
    }
  }

  console.log(`Starting download of ${allVideos.size} videos...`);
  for (const vidUrl of allVideos) {
    const filename = path.basename(vidUrl);
    const dest = path.join(targetDir, filename);
    try {
      await downloadFile(vidUrl, dest);
      manifest[vidUrl] = `/assets/${filename}`;
    } catch (err) {
      console.error(`Failed ${vidUrl}:`, err.message);
      manifest[vidUrl] = vidUrl; // fallback
    }
  }

  fs.writeFileSync(path.join(__dirname, '..', 'src', 'asset_manifest.json'), JSON.stringify(manifest, null, 2));
  console.log('Manifest written to src/asset_manifest.json');
}

run();
