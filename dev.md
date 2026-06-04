# KsWebExtension

Firefox extension for injecting KSTable into web pages.

## Versioning

Keep all versions in sync.

```json
// manifest.json
{
  "version": "1.10.1"
}
```

```json
// package.json
{
  "version": "1.10.1"
}
```

```bash
git tag v1.10.1
```

---

## Development

Load the extension temporarily in Firefox.

1. Open Firefox.
2. Navigate to:

```text
about:debugging
```

3. Click:

```text
This Firefox
```

4. Click:

```text
Load Temporary Add-on
```

5. Select:

```text
manifest.json
```

---

## Release Process

### Step 1

Update:

```text
kstable.js
```

### Step 2

Update version in:

```text
manifest.json
package.json
```

### Step 3

Update:

```text
CHANGELOG.md
```

### Step 4

Commit changes.

```bash
git add .
git commit -m "Release v1.10.1"
```

### Step 5

Create tag.

```bash
git tag v1.10.1
git push
git push origin v1.10.1
```

---

## Create Upload ZIP

Select and zip:

```text
manifest.json
inject.js
kstable.js
```

Example:

```text
KsWebExtension-v1.10.1.zip
```

Do not zip:

```text
.git
archive
node_modules
```

---

## Upload To Firefox

Open:

https://addons.mozilla.org/developers/

Navigate:

```text
Add-on Developer Hub
→ Submit New Version
```

Upload:

```text
KsWebExtension-v1.10.1.zip
```

Submit for review.

---

## Archive

After successful release:

```text
archive/
 ├─ v1
 ├─ v2
 ├─ v3
```

Store previous release artifacts if required.

---

## Current Release

```text
Version : 1.10.1
Tag     : v1.10.1
```