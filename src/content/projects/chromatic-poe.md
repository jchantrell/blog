---
name: Chromatic PoE
link: https://github.com/jchantrell/chromatic-poe
tags: TypeScript, SolidJS, Tauri, Rust, UI/UX, WebView
---
A desktop and web application for creating, viewing and updating [filter files](https://www.pathofexile.com/item-filter/about) for the online games Path of Exile 1 & 2.

There's two versions; a WebView desktop application made with [Tauri](https://v2.tauri.app/) and a web page hosted on [GitHub Pages](https://jchantrell.github.io/chromatic-poe/). Under the hood it integrates with multiple external sources to download, transform and store data for both current game versions in the browser's storage, utilising WASM SQLite when it makes sense to do so. It uses [SolidJS](https://www.solidjs.com/) (a high performance alternative to React) for rendering, meaning it's a purely client-side experience with barely noticeable latency.

I put significant effort into the overall UI/UX, partly out of curiosity for what's possible with SolidJS and Tauri and partly because I wanted to make a tool that I'd love to use personally. You'll find features like drag/drop sorting, undos's and redo's, key bindings for common actions, intelligent full text search capability everywhere that it matters, hierarchal item pickers and a whole lot more.
