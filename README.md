# Desi Barbeque (React + Vite)

A single-page, modern website for **Desi Barbeque** with menu browsing, gallery, party-order info, and a WhatsApp-based ordering flow.

## Features
- **Multi-page sections** (single-page app routing via internal state):
  - Home
  - Menu (with tabs: *Mains & wings*, *Chicken tikka skewers*, *Veg tikka*)
  - Gallery
  - About
  - Party orders
  - Contact
- **WhatsApp ordering / callback flow**
  - “Order on WhatsApp” buttons open WhatsApp with a pre-filled message.
  - Contact form opens WhatsApp in a new tab/window with the submitted details.
- **Menu download link**
  - “Download full menu (PDF)” links to **`/menu.pdf`**.
- **Mobile floating CTA**
  - Bottom bar with **Call** and **WhatsApp** actions on small screens.

## Tech Stack
- React (via Vite)
- Tailwind CSS (configured through `@tailwindcss/vite`)
- lucide-react (icons)
- oxlint (linting)

## Getting Started
### Prerequisites
- Node.js (LTS recommended)

### Install
```bash
npm install
```

### Run in development
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

### Lint
```bash
npm run lint
```

## Project Structure
- `src/App.jsx` — main UI + all sections/pages + WhatsApp and menu interactions
- `src/main.jsx` — React entry
- `src/index.css` — global styles
- `public/` — static assets served at the site root (e.g., `menu.pdf` should be placed here)
- `src/assets/gallery/` — gallery images used on the Gallery page

## Adding/Updating Assets
### Gallery photos
Gallery images are imported in `src/App.jsx` from:
- `src/assets/gallery/tikka-skewers-row.jpg`
- `src/assets/gallery/tandoori-on-coals.jpg`
- `src/assets/gallery/tikka-flavours-grill.jpg`
- `src/assets/gallery/tandoori-plate.jpg`

To add new gallery images, place them in `src/assets/gallery/` and update the `GALLERY_ITEMS` list in `src/App.jsx`.

### Full menu PDF
The app expects a file at:
- `public/menu.pdf`

Place your PDF there so the “Download full menu (PDF)” link works.

## Configuration Notes
- WhatsApp number is hardcoded in `src/App.jsx` as `WHATSAPP_NUMBER`.
- If you need multiple branches/phones, adjust the constants and links in `src/App.jsx`.

## License
See `LICENSE` in the project root.

