const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Sibling directories mapping to the files in src/
const fileMappings = [
  {
    repo: 'tailwind-header-dom',
    subDir: 'public',
    prefix: 'v',
    files: ['ksheader.js', 'ksheader.min.js']
  },
  {
    repo: 'ks-web-comp-table',
    subDir: 'dist',
    prefix: 'v',
    files: ['KSComponents.js']
  },
  {
    repo: 'tailwind-table-dom-comp',
    subDir: 'dist',
    prefix: 'v',
    files: ['kstablecomp.js']
  },
  {
    repo: 'tailwind-table-dom-comp-show',
    subDir: 'dist',
    prefix: 'v',
    files: ['kstableonly.js']
  },
  {
    repo: 'tailwind-vertical-dom',
    subDir: 'dist',
    prefix: 'v',
    files: ['ksvertical.js']
  }
];

// Helper to get latest version folder in a directory
function getLatestVersionFolder(parentDir, prefix = 'v') {
  if (!fs.existsSync(parentDir)) {
    throw new Error(`Directory does not exist: ${parentDir}`);
  }
  const dirs = fs.readdirSync(parentDir)
    .filter(f => {
      const stats = fs.statSync(path.join(parentDir, f));
      if (!stats.isDirectory()) return false;
      const regex = new RegExp(`^${prefix}\\d+(\\.\\d+)*$`);
      return regex.test(f);
    });

  if (dirs.length === 0) {
    throw new Error(`No version folders found in: ${parentDir}`);
  }

  dirs.sort((a, b) => {
    const partsA = a.slice(prefix.length).split('.').map(Number);
    const partsB = b.slice(prefix.length).split('.').map(Number);
    for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
      const numA = partsA[i] || 0;
      const numB = partsB[i] || 0;
      if (numA !== numB) {
        return numA - numB;
      }
    }
    return 0;
  });

  return dirs[dirs.length - 1];
}

// Helper to copy directory recursively
function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }
  const files = fs.readdirSync(from);
  for (const file of files) {
    const fromPath = path.join(from, file);
    const toPath = path.join(to, file);
    const stat = fs.statSync(fromPath);
    if (stat.isDirectory()) {
      copyFolderSync(fromPath, toPath);
    } else {
      fs.copyFileSync(fromPath, toPath);
    }
  }
}

function run() {
  const extensionRoot = __dirname;
  const workspaceRoot = path.join(extensionRoot, '..');
  const packagePath = path.join(extensionRoot, 'package.json');
  const srcPath = path.join(extensionRoot, 'src');
  const archivePath = path.join(extensionRoot, 'archive');

  // 1. Read the old version from package.json for archiving
  if (!fs.existsSync(packagePath)) {
    console.error('Error: package.json not found.');
    process.exit(1);
  }
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const oldVersion = packageJson.version;
  if (!oldVersion) {
    console.error('Error: Version not found in package.json.');
    process.exit(1);
  }

  const versionParts = oldVersion.split('.');
  const minorPart = versionParts.length > 1 ? versionParts[1] : oldVersion;
  const archiveFolderName = `v${minorPart}`;
  const targetArchiveDir = path.join(archivePath, archiveFolderName);

  console.log(`\n--- Step 1: Archiving current src/ to archive/${archiveFolderName} ---`);
  if (fs.existsSync(targetArchiveDir)) {
    console.log(`Archive directory ${archiveFolderName} already exists. Overwriting files inside.`);
  } else {
    fs.mkdirSync(targetArchiveDir, { recursive: true });
    console.log(`Created archive directory: archive/${archiveFolderName}`);
  }

  if (fs.existsSync(srcPath)) {
    copyFolderSync(srcPath, targetArchiveDir);
    console.log(`Successfully archived all files from src/ to archive/${archiveFolderName}`);
  } else {
    console.log('Warning: src/ directory does not exist, nothing to archive.');
  }

  // 2. Copy files from sibling folders to src/
  console.log('\n--- Step 2: Copying latest JS files from other folders to src/ ---');
  if (!fs.existsSync(srcPath)) {
    fs.mkdirSync(srcPath, { recursive: true });
    console.log('Created src/ directory.');
  }

  for (const mapping of fileMappings) {
    const repoPath = path.join(workspaceRoot, mapping.repo);
    if (!fs.existsSync(repoPath)) {
      console.warn(`Warning: Sibling repository directory not found: ${mapping.repo}. Skipping.`);
      continue;
    }

    const searchDir = path.join(repoPath, mapping.subDir);
    if (!fs.existsSync(searchDir)) {
      console.warn(`Warning: Search directory not found: ${searchDir}. Skipping.`);
      continue;
    }

    try {
      const latestFolder = getLatestVersionFolder(searchDir, mapping.prefix);
      const sourceDir = path.join(searchDir, latestFolder);
      console.log(`Found latest version folder for ${mapping.repo}: ${latestFolder}`);

      for (const file of mapping.files) {
        const srcFilePath = path.join(sourceDir, file);
        const destFilePath = path.join(srcPath, file);

        if (fs.existsSync(srcFilePath)) {
          fs.copyFileSync(srcFilePath, destFilePath);
          console.log(`  Copied: ${mapping.repo}/${mapping.subDir}/${latestFolder}/${file} -> src/${file}`);
        } else {
          console.warn(`  Warning: File not found: ${srcFilePath}`);
        }
      }
    } catch (e) {
      console.error(`  Error processing ${mapping.repo}:`, e.message);
    }
  }

  // 3. Run publish.js
  console.log('\n--- Step 3: Running publish.js to package the extension ---');
  const publishScriptPath = path.join(extensionRoot, 'publish.js');
  if (fs.existsSync(publishScriptPath)) {
    try {
      execSync('node publish.js', { stdio: 'inherit', cwd: extensionRoot });
    } catch (e) {
      console.error('Error running publish.js:', e);
      process.exit(1);
    }
  } else {
    console.error('Error: publish.js not found in root.');
    process.exit(1);
  }

  console.log('\nAutomation process completed successfully!');
}

run();
