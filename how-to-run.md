# How to Run the Update & Packaging Scripts

This guide explains the workflow for using `update-src.js` and `publish.js` to build and package updates for the **KSTable Engine** Firefox Extension.

---

## Prerequisites

Before running the scripts, make sure you have:
1. installed the dependencies:
   ```powershell
   npm install
   ```
2. Your sibling repository directories (e.g. `ks-web-comp-table`, `tailwind-header-dom`, etc.) compiled with their latest changes.

---

## Workflow: Releasing a New Version

Follow these steps when you are ready to prepare a new release of the extension:

### Step 1: Bump the version code
Open [manifest.json](file:///d:/KeshavSoftRepos/2026-07-16%282%29/KsWebExtension/manifest.json) in your editor and update the `"version"` field (e.g., change `"2.27"` to `"2.28"`).
> [!NOTE]
> Do not manually edit the version in `package.json`. The scripts will sync it automatically.

### Step 2: Run the update and package script
Open your terminal in the `KsWebExtension` directory and run:
```powershell
npm run update-src
```

**What this command does automatically:**
1. **Archives current files**: Reads the previous version from `package.json` and moves the current contents of `src/` to a backup folder under `archive/v<oldVersion>` (e.g. `archive/v27/`).
2. **Copies latest builds**: Scans all sibling directories, detects their latest compiled build versions, and copies the updated `.js` files directly into `src/`.
3. **Validates & Packages**: Syncs the version to `package.json` and creates a clean zip file named `KSTable-Engine-<version>.zip` in the root folder.

### Step 3: Verify the generated Zip
Check the root directory of `KsWebExtension`. You should see the newly created zip file (e.g., `KSTable-Engine-2.28.zip`).

---

## Alternative commands

If you want to package the current contents of `src/` **without** fetching new updates from sibling folders or creating a backup archive, run the packaging script directly:
```powershell
npm run package
```
