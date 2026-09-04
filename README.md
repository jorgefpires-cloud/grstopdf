# GRS to PDF — Browser-only

Standalone GitHub Pages starter for investigating and eventually converting Esko/Barco `.GRS` files entirely in the browser.

Current version:
- local `.GRS` file selection/drag-drop
- binary/header inspection
- PackEdge producer/version detection
- browser-side diagnostics
- browser-side test PDF generation
- no backend and no file upload
- GitHub Pages workflow

The proprietary GRS object format is not publicly documented as a complete binary specification, so the real converter must be developed incrementally and validated against real GRS/PDF pairs.

Roadmap:
1. Decode record boundaries.
2. Decode page/group/style records.
3. Decode paths and transformations.
4. Decode text/fonts.
5. Decode CT/LP/image references.
6. Build a scene graph.
7. Render SVG.
8. Emit real PDF.
9. Regression-test against supplied GRS/PDF pairs.

## Deploy
Create an empty GitHub repository and upload this directory's contents to its root. Then use Settings → Pages → Source: GitHub Actions.
