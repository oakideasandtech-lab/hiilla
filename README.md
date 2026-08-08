# HIILLA - Bike Delivery Faster Than Anyone Else.

Static website for [hiilla.com](https://hiilla.com) - an e-hailing bike delivery service providing a central platform to third-party dispatch companies and individuals easing the problems of delivery service across major cities in Lagos.

## About

This is a static HTML/CSS/JS rebuild of the former WordPress site. It is fully static and can be hosted on any static hosting platform (GitHub Pages, Netlify, Vercel, Cloudflare Pages, etc.). The site is managed with Git.

## Pages

| Page | File |
|------|------|
| Home | `index.html` |
| Become A Dispatch | `become-a-rider.html` |
| Become A Fleet | `become-a-fleet.html` |
| Contact | `contact.html` |
| Delivery Fare Estimates | `fare.html` |
| Rider Onboarding | `rider-onboarding-form.html` |
| Fleet Onboarding | `fleet-onboarding.html` |
| Newsletter Signup | `newsletter-signup.html` |
| Thank You | `thank-you-for-onboarding.html` |
| Privacy Policy | `privacy-policy.html` |
| Terms & Conditions | `terms-and-conditions.html` |

## Structure

```
.
├── index.html                  # Home page
├── *.html                      # Inner pages
├── css/
│   └── style.css               # Global styles
├── js/
│   ├── layout.js               # Injects shared header/footer
│   └── main.js                 # Nav toggle + fare calculator
├── assets/                     # Images, logos, favicons
└── original/                   # Archived snapshot of the original WordPress pages
```

## Development

No build step or dependencies are required. Simply open `index.html` in a browser, or serve the folder locally:

```
python -m http.server 8080
```

## Layout System

The shared header and footer are injected via `js/layout.js` using `#site-header-mount` and `#site-footer-mount` placeholder divs. To edit the site-wide navigation or footer, update `js/layout.js` once - every page picks up the change automatically.

Each page sets `data-nav` on the `<body>` tag (e.g. `data-nav="rider"`) to highlight the active link in the navigation.

## Notes

- The fare calculator (`fare.html`) provides a client-side estimate based on the same-day / instant delivery type options present on the original site.
- The contact, onboarding, and newsletter forms are static HTML with client-side validation. They do not send data anywhere; connect them to a form backend (Formspree, Netlify Forms, etc.) for real submissions.
- The former WooCommerce store pages (shop, cart, checkout, my-account) are not included in this static build.

## License

&copy; HIILLA TRANSIT SERVICES. All rights reserved.