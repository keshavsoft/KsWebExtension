# Extension Submission Guide (v2.26)

This document contains the exact text to copy-paste when uploading the new version of **KSTable Engine** to the Firefox Add-on Developer Hub.

---
## Version 2.26

### Improvements

* Removed CSS (`tailwind-3-min.css`) injection and resource declaration.
* Bumped version to 2.26.

---

## 1. Release Notes
*Copy and paste the text below into the **"Release Notes"** box (Let your users know what's new):*

```text
Version 2.26:
- Removed CSS (tailwind-3-min.css) injection to avoid affecting web page styles.
```

---

## 2. Notes to Reviewer
*Copy and paste the text below into the **"Notes to Reviewer"** box:*

```text
Purpose:
The extension injects the KSComponents and associated KSTable rendering libraries into web pages so that KSTable functionality is available in the page context.

This extension consists of the following source files and directories:
- manifest.json
- icons/ folder (KSIcon-48.png, KSIcon-96.png)
- src/ folder containing:
  - injectStart.js
  - injectEnd.js
  - KSComponents.js
  - ksheader.js
  - kstablecomp.js
  - kstableonly.js
  - ksvertical.js

No build tools, bundlers, transpilers, minifiers, remote code, dynamic code generation, eval(), or external dependencies are used. The uploaded ZIP contains the exact source code reviewed by Firefox.

Testing Instructions:
1. Load the temporary extension via `about:debugging`.
2. Open any webpage.
3. Open the browser console; you will see logs confirming the successful injection of components.
```


