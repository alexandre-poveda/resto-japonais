const https = require('https');
const { execSync } = require('child_process');

function getGitHubToken() {
  const creds = execSync('git credential fill', { input: 'protocol=https\nhost=github.com\n' }).toString();
  return creds.split('\n').find(l => l.startsWith('password=')).replace('password=', '').trim();
}

const token = getGitHubToken();

function apiRequest(path, method, body) {
  return new Promise((resolve, reject) => {
    const dataString = body ? JSON.stringify(body) : '';
    const req = https.request({
      hostname: 'api.github.com',
      path,
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'NodeJS',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(dataString)
      }
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, data: json });
        } catch (e) {
          resolve({ status: res.statusCode, text: data });
        }
      });
    });
    req.on('error', reject);
    if (dataString) req.write(dataString);
    req.end();
  });
}

async function run() {
  console.log('1. Renaming santo-mare-restaurant to resto-italien...');
  const renameRes = await apiRequest('/repos/alexandre-poveda/santo-mare-restaurant', 'PATCH', {
    name: 'resto-italien',
    description: 'Resto Italien — Santo Mare : Cuisine Côtière & Méditerranéenne'
  });
  console.log('Rename result:', renameRes.status, renameRes.data.name || renameRes.data.message);

  console.log('\n2. Creating new repository resto-japonais...');
  const createRes = await apiRequest('/user/repos', 'POST', {
    name: 'resto-japonais',
    description: 'Resto Japonais — Qitchen : Haute Gastronomie Japonaise & Bar à Sushi',
    private: false,
    has_issues: true,
    has_projects: true,
    has_wiki: true
  });
  console.log('Create result:', createRes.status, createRes.data.name || createRes.data.message);
  if (createRes.data.html_url) {
    console.log('New repo URL:', createRes.data.html_url);
  }
}

run();
