# SquashApps

SquashApps is a responsive App Store-style catalog for products made by Squashberry.

## What is included

- App Store-inspired discovery page
- Featured editorial cards
- Apps and Websites collections
- Search
- Product detail pages
- App-style screenshot galleries
- **GET** for installable products
- **OPEN** for web products
- Responsive mobile navigation
- Install prompt support through the browser's `beforeinstallprompt` event
- GitHub Pages deployment workflow

## Product list

- WHO
- SquashAI
- MediSquash
- Netfliks
- Netfinder
- SquashberryPay

## Design reference

The interface is intentionally based on the structure and interaction patterns shown in Apple's official App Store materials: product-page headers, prominent Get/Open actions, screenshot galleries, metadata, editorial discovery cards, and search.

Reference material:
- https://developer.apple.com/app-store/product-page/
- https://developer.apple.com/app-store/search/
- https://developer.apple.com/app-store/asset-best-practices/

The repository uses original SquashApps branding and original catalog content rather than copying Apple's interface assets.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` builds the app and publishes the `dist` folder to GitHub Pages.

