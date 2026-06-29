const fs = require('fs');
const path = require('path');

// 1. Read manifest.json version
const manifestPath = path.join(__dirname, 'manifest.json');
if (!fs.existsSync(manifestPath)) {
  console.error('Error: manifest.json not found in the root directory.');
  process.exit(1);
}

let manifest;
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
} catch (e) {
  console.error('Error: Failed to parse manifest.json.', e);
  process.exit(1);
}

const version = manifest.version;
if (!version) {
  console.error('Error: Version not found in manifest.json.');
  process.exit(1);
}

console.log(`Current version in manifest.json: ${version}`);

// 2. Sync version to package.json
const packagePath = path.join(__dirname, 'package.json');
if (fs.existsSync(packagePath)) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    if (packageJson.version !== version) {
      packageJson.version = version;
      fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n', 'utf8');
      console.log(`Updated package.json version to: ${version}`);
    } else {
      console.log('package.json version is already in sync.');
    }
  } catch (e) {
    console.warn('Warning: Failed to update package.json version.', e);
  }
} else {
  console.warn('Warning: package.json not found, skipping version sync.');
}

// 3. Define the files/folders to package from upload.md list
const filesToPack = [
  'manifest.json',
  'injectStart.js',
  'injectEnd.js',
  'kstable.js',
  'kstablecomp.js',
  'KSTableComponents.js',
  'ksheader.js',
  'tailwind-3-min.css'
];

const foldersToPack = [
  { local: 'icons', zip: 'icons' }
];

// Check if all files/folders exist
for (const file of filesToPack) {
  if (!fs.existsSync(path.join(__dirname, file))) {
    console.error(`Error: Required file "${file}" does not exist.`);
    process.exit(1);
  }
}

for (const folder of foldersToPack) {
  if (!fs.existsSync(path.join(__dirname, folder.local))) {
    console.error(`Error: Required folder "${folder.local}" does not exist.`);
    process.exit(1);
  }
}

// 4. Initialize AdmZip and package the files
let AdmZip;
try {
  AdmZip = require('adm-zip');
} catch (e) {
  console.error('Error: "adm-zip" package is not installed. Please run "npm install" first.');
  process.exit(1);
}

const zip = new AdmZip();

console.log('Packaging extension files...');

// Add files
for (const file of filesToPack) {
  console.log(`  Adding file: ${file}`);
  zip.addLocalFile(path.join(__dirname, file));
}

// Add folders
for (const folder of foldersToPack) {
  console.log(`  Adding folder: ${folder.local} -> ${folder.zip}`);
  zip.addLocalFolder(path.join(__dirname, folder.local), folder.zip);
}

// Write the zip file
const zipName = `KSTable-Engine-${version}.zip`;
const zipPath = path.join(__dirname, zipName);

try {
  zip.writeZip(zipPath);
  console.log(`\nSuccess! Created extension package: ${zipName}`);
} catch (e) {
  console.error('Error writing zip file:', e);
  process.exit(1);
}
