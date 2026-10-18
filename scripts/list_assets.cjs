const fs = require('fs');

const files = ['qitchen_dump.html', 'qitchen_menu.html', 'qitchen_about.html', 'qitchen_reservation.html'];
const allImages = new Set();
const allVideos = new Set();

files.forEach(file => {
  const html = fs.readFileSync(file, 'utf8');
  const imgs = html.match(/https:\/\/framerusercontent\.com\/images\/[a-zA-Z0-9_-]+\.(?:webp|png|jpg|jpeg)/g) || [];
  imgs.forEach(i => allImages.add(i));
  const vids = html.match(/https:\/\/framerusercontent\.com\/assets\/[a-zA-Z0-9_-]+\.(?:mp4|webm)/g) || [];
  vids.forEach(v => allVideos.add(v));
});

console.log('Total unique images:', allImages.size);
console.log([...allImages]);
console.log('Total unique videos:', allVideos.size);
console.log([...allVideos]);
