# KSTable Engine - Developer Guide & Release Process

This document describes how to develop, test, package, and release updates for the **KSTable Engine** Firefox Extension.

---

## 1. Directory Structure

All core extension code is stored under the `src/` directory to keep the root directory clean:
*   `src/injectStart.js`: Content script that runs at `document_start` (injects `KSComponents.js`).
*   `src/injectEnd.js`: Content script that runs at `document_end` (injects libraries like `ksheader.js`, `kstablecomp.js`, etc.).
*   `src/KSComponents.js`, `src/ksheader.js`, `src/kstablecomp.js`, `src/kstableonly.js`, `src/ksvertical.js`: Loaded JS libraries.
*   `src/tailwind-3-min.css`: Injected tailwind styles.
*   `icons/`: Toolbar and menu icons.
*   `manifest.json`: Configuration mapping files and specifying permissions.

---

## 2. Local Development & Testing

### Option A: Testing on Desktop Firefox
1. Open Firefox on your computer.
2. Navigate to `about:debugging`.
3. Click **"This Firefox"** -> **"Load Temporary Add-on"**.
4. Select `manifest.json` from the root of this workspace.

### Option B: Testing on Firefox for Android (Mobile)
Ensure ADB is installed and your phone has USB/Wireless debugging enabled (with "Remote debugging via USB" turned on inside Firefox for Android settings).

1. Connect your phone over ADB (USB or Wireless).
2. Verify connection:
   ```powershell
   adb devices
   ```
3. Run the extension watch/load command in the root folder:
   ```powershell
   npx web-ext run --target=firefox-android --android-device=<Your_Device_ID>
   ```

---

## 3. Release & Submission Process

Follow these steps for every new release:

### Step 1: Update Version
1. Open `manifest.json` and change the `"version"` field (e.g., `"2.25"`).
2. Do not change the version in `package.json` manually; it is synced automatically by the packaging script.

### Step 2: Update Release Notes
1. Open `upload.md`.
2. Move the previous version's release notes section to the top of `archive/upload_history.md`.
3. Overwrite the copy-paste fields in `upload.md` with your new version's notes:
   *   Section 1: **Release Notes**
   *   Section 2: **Notes to Reviewer** (verify if any new JS files were added to the `src/` folder and list them under "This extension consists of the following source files...").

### Step 3: Run Package Build
Generate the zipped extension bundle by running:
```powershell
npm run package
```
This automatically:
- Syncs the version to `package.json`.
- Creates `KSTable-Engine-<version>.zip` in the root folder containing `manifest.json`, the `icons/` folder, and the `src/` folder.

### Step 4: Upload to Firefox Add-on Developer Hub
1. Open the [Add-on Developer Hub](https://addons.mozilla.org/developers/).
2. Click **"Submit New Version"**.
3. Upload the newly built `KSTable-Engine-<version>.zip` file.
4. Copy the text from `upload.md` and paste it into the **"Release Notes"** and **"Notes to Reviewer"** fields.
5. Submit for review.

### Step 5: Git Commit & Tag
Commit and tag the release version:
```bash
git add .
git commit -m "Release v<version>"
git tag "v<version>"
git push origin master --tags
```