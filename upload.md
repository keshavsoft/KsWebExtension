# Release Notes

## Version 2.25

### Improvements

* Reorganized extension structure: moved core source files into a new `src/` folder to clean up the root directory.
* Added compatibility with Firefox for Android (Mobile).
* Updated and injected new components: `KSComponents.js`, `ksvertical.js`, and `kstableonly.js`.
* Cleaned up and removed deprecated scripts (`kstable.js`, `KSTableComponents.js`, `inject.js`).

---

## Version 2.17.1

### Improvements

* Updated KSTable engine.
* Improved table rendering and stability.
* Internal code cleanup and maintenance updates.
* Performance optimizations for large tables.
* Bug fixes and minor enhancements.
* added css also
* Updated KSTableComponent engine.

## Version 2.18

### Improvements

* Updated KSTable engine.
* Improved table rendering and stability.
* Internal code cleanup and maintenance updates.
* Performance optimizations for large tables.
* Bug fixes and minor enhancements.
* added css also
* Updated KSTableComponent engine.
* Header fixed

---
## Version 2.20

### Improvements

* Updated KSTable engine.
* Improved table rendering and stability.
* Internal code cleanup and maintenance updates.
* Performance optimizations for large tables.
* Bug fixes and minor enhancements.
* added css also
* Updated KSTableComponent engine.
* Header fixed

29 failed, because on windows, shifter to linux for vite build
---
## Version 2.21

### Improvements

* Updated KSTable engine.
* Improved table rendering and stability.
* Internal code cleanup and maintenance updates.
* Performance optimizations for large tables.
* Bug fixes and minor enhancements.
* added css also
* Updated KSTableComponent engine.
* Header fixed
* kstable working on

---

# Notes to Reviewer

This extension injects `src/KSComponents.js`, `src/ksheader.js`, `src/kstablecomp.js`, `src/ksvertical.js`, and `src/kstableonly.js` into web pages through `src/injectStart.js` and `src/injectEnd.js`.

Package contents:

* manifest.json
* src/ folder (containing the injection scripts and core JS/CSS files)
* icons/ folder

No build step is required.

The uploaded package is the exact source used by the extension and can be reviewed directly.

Testing:

1. Load the extension through `about:debugging`.
2. Choose **Load Temporary Add-on**.
3. Select `manifest.json`.
4. Open any webpage.
5. Verify that `kstable.js` is injected and KSTable functionality is available.

This release contains updates to the KSTable engine and internal maintenance changes only.

Version 2.12.1

- Updated KSTable engine.
- Improved stability and performance.
- Fixed minor issues and internal code improvements.
- General maintenance update.





Notes to Reviewer: 

This extension consists of the following source files and directories:

- manifest.json
- icons/ folder
- src/ folder containing:
  - injectStart.js
  - injectEnd.js
  - KSComponents.js
  - ksheader.js
  - kstablecomp.js
  - kstableonly.js
  - ksvertical.js
  - tailwind-3-min.css

Purpose:
The extension injects the KSComponents and associated KSTable rendering libraries into web pages so that KSTable functionality is available in the page context.

No build tools, bundlers, transpilers, minifiers, remote code, dynamic code generation, eval(), or external dependencies are used.

The uploaded ZIP contains the exact source code reviewed by Firefox.
