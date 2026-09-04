# GRS → PDF (browser-only reverse-engineering build)

This build reads `.GRS` files locally in the browser. There is no upload server.

## Current state

- Native file chooser is visible and works without drag/drop.
- Drag/drop is also supported.
- `Inspect GRS` reports header bytes, producer/version strings, and printable runs.
- `Generate test PDF` only proves browser-side PDF creation. It is **not** a GRS renderer yet.

## Current test corpus

Two GRS files are available for reverse engineering:

- `logos.grs`: 73,792 bytes; header contains `3.1 NT Jun 16 2001`
- `1.grs`: 118,473 bytes; contains `Esko PackEdge 23.03 NT Mar 15 2023`

A real renderer should be implemented only after object records are decoded and validated against known PDF output.
