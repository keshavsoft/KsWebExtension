# Release Notes

## Version 2.17.1

### Improvements

* Updated KSTable engine.
* Improved table rendering and stability.
* Internal code cleanup and maintenance updates.
* Performance optimizations for large tables.
* Bug fixes and minor enhancements.
* added css also
* Updated KSTableComponent engine.

---

# Notes to Reviewer

This extension injects `kstable.js`, `kstablecomp.js`, `ksheader` into web pages through `inject.js`.

Package contents:

* manifest.json
* inject.js
* kstable.js
* kstablecomp.js
* ksheader.js
* Icons folder

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

This extension consists of below six source files:

- manifest.json
- inject.js
- kstable.js
- kstablecomp.js
- ksheader.js
- tailwind-3-min.css
- icons folder

Purpose:
The extension injects kstable.js into web pages so that KSTable functionality is available in the page context.

No build tools, bundlers, transpilers, minifiers, remote code, dynamic code generation, eval(), or external dependencies are used.

The uploaded ZIP contains the exact source code reviewed by Firefox.
