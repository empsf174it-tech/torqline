# Torqline - Vehicle Sales Comparison & Review Guide

A premium multi-page static website for vehicle comparison and reviews, built with HTML, CSS, and JS (no frameworks).

## Features
- **Feature Matrix:** Side-by-side comparison up to 4 vehicles with sticky headers.
- **Verified Reviews:** Rating distributions and verified owner badges.
- **Pros & Cons Breakdown:** Structured verdicts and category groupings.
- **Affiliate Link Tracking:** Built-in datalayer pushes for Google Analytics/GTM.
- **Ownership Cost Estimator:** Client-side calculation tool.
- **Responsive:** Full mobile slide-out menu, scroll-reveal animations, reduced-motion support.

## Affiliate Tracking Spec
Any "Check price" link must include:
- `data-affiliate="true"`
- `data-product-id="[slug]"`
- `data-merchant="[merchant]"`
- `data-placement="[location]"`
- `rel="sponsored noopener"`
- `target="_blank"`

## Setup
No build step required. Open `index.html` in a browser or serve via a local web server (e.g., `python -m http.server`).
