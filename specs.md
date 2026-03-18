# Optimum Touch Enterprise Website Specs

## 1) Project Overview
- Project type: Multi-page static website with PHP mail handlers.
- Brand: Optimum Touch Enterprise (licensed moneylending service positioning).
- Delivery model: Plain HTML/CSS/JS assets under `public_html` with no build step.
- Primary goals:
  - Present services, compliance-first messaging, and borrower education.
  - Capture leads through `Apply Now` and `Contact` forms.
  - Provide self-service loan tools and educational content.

## 2) Tech Stack and Dependencies
- Markup: HTML5 (12 pages).
- Styling: `assets/css/main.css` (core), Bootstrap utilities, plugin CSS.
- Scripting: jQuery-based frontend + plugin ecosystem + custom scripts.
- Backend:
  - `apply-now.php`: form validation + email + redirect to thank-you page.
  - `contact.php`: email relay + redirect to thank-you page.

### Core frontend libraries loaded site-wide
- `bootstrap.min.css` / `bootstrap.bundle.min.js`
- `fontawesome-all.min.css`
- `swiper.min.css` / `swiper.min.js`
- `animate.min.css` + `wow.js`
- `odometer.min.css` + `odometer.min.js`
- `magnific-popup.css` + `jquery.magnific-popup.min.js`
- `bootstrap-select.min.css` + `bootstrap-select.min.js`
- `nouislider.min.css` + `nouislider.min.js` + `wNumb.min.js`
- `jquery.validate.min.js`, `jquery.ajaxchimp.min.js`, `jquery.appear.min.js`
- `assets/js/theme.js` (global interactions)

### Page-specific additions
- `loan-calculator.html`, `loan-eligibility.html`:
  - `assets/css/jquery-ui.css`
  - `assets/js/jquery-1.12.4.js`
  - `assets/js/jquery-ui.js`
  - custom scripts: `loan-calculator.js`, `loan-eligibility.js`
- `index.html`, `services.html`: `assets/css/flaticon.css`
- `news-details.html`: inline CSS and inline JS content model for 10 posts.

## 3) Site Map and Page Specs

### `index.html` (Home)
Sections:
1. Main slider (`main-slider`) with 3 hero slides, fade transition, autoplay 5s.
2. About + inline range-based loan estimator (`about-one`).
3. Services teaser cards (`service-one service-one--home`).
4. Differentiators (`feature-one`).
5. Trust section (`trusted-company`).
6. Testimonials carousel (`testimonials-one`).
7. Benefits/progress bars (`why-choose`).
8. Odometer counters (`funfact-one`).
9. Featured news cards (`blog-home blog-home--featured`).
10. Continuous marquee highlights (`pro-marquee`).
11. CTA banner (`call-to-action`).

### `about.html`
Sections:
1. `page-header`
2. `about-three` (company narrative)
3. `why-choose-one why-choose-one--glass` (glassmorphism cards)
4. `trust-pdpa` (ethics + PDPA statement)
5. `funfact-one`

### `services.html`
Sections:
1. `page-header`
2. `service-page service-page--modern` with:
  - KPI cards
  - service card grid
  - 4-step process cards
  - eligibility/doc panels
  - policy cards
  - dual-button CTA block

### `service-details.html`
Sections:
1. `page-header`
2. `service-details`:
  - service sidebar links
  - downloadable resource links
  - support callout
  - detail content + accordion FAQ

### `news.html`
Sections:
1. `page-header`
2. `blog-page news-hub`:
  - intro copy
  - 10 gradient-themed news cards linking to `news-details.html?post=1..10`

### `news-details.html`
Sections:
1. `page-header`
2. `blog-details` custom article shell

Behavior:
- Inline JS defines 10 post objects and hydrates title, date, category, image, paragraphs via `?post=` query param.
- Prev/Next links wrap in a circular sequence (1..10).
- "Latest 10 Posts" sidebar highlights active post link.

### `contact.html`
Sections:
1. `page-header`
2. `contact-one` (contact info + contact form)
3. Embedded Google map iframe

### `apply-now.html`
Sections:
1. `page-header`
2. `apply-one` large multi-step form blocks:
  - Loan Details
  - Personal Details
  - Address Details
  - Other Details

### `loan-calculator.html`
Sections:
1. `page-header`
2. `contact-two` with jQuery UI sliders and EMI output panel.

### `loan-eligibility.html`
Sections:
1. `page-header`
2. `contact-two` with multi-factor eligibility calculator panel.

### `faq.html`
Sections:
1. `page-header`
2. `faq-one faq-one__faq-page` (accordion + contact side box).

### `thank-you.html`
Sections:
1. `page-header`
2. `thank-you-page` confirmation message and home button.

## 4) Global Layout Specification

### Header system
- Topbar (`.topbar`):
  - Left: social icons + quick links.
  - Right: support email + business hours.
  - Hidden on widths `<= 991px`.
- Main nav (`.main-menu`):
  - Logo + desktop menu + search icon + verification phone.
  - Desktop menu visible at `>= 1200px`.
  - Mobile toggler visible below that.
- Sticky header (`.stricky-header`):
  - Injects cloned `.main-menu` content.
  - Appears after scroll > 130px.
  - Glass/frosted visual treatment with gradients, blur, and border.

### Mobile nav
- Open/close via `.mobile-nav__toggler`.
- Menu content cloned from desktop nav by JS.
- Includes contact info and social links.

### Search popup
- Trigger: `.search-toggler`.
- Action: toggles `.search-popup.active`.
- Search form action is placeholder `#` (non-integrated).

### Footer system
- `site-footer`: dark branded footer with 4 columns:
  - about and phone block
  - explore links
  - latest news links
  - contact details
- `bottom-footer`: copyright and social links.

## 5) Visual Design Specs

### Typography
- CSS imports:
  - `Inter` (body UI font)
  - `Rajdhani` (headings)
- Additional page-level import in many pages: `Rubik`.
- Effective defaults in `:root`:
  - `--thm-font: "Inter", sans-serif`
  - `--heading-font: "Rajdhani", serif`

### Core color tokens (`:root`)
- `--thm-color: #555c63` (body text)
- `--thm-base: #008fd5` (primary CTA/accent)
- `--thm-primary: #004aa1` (secondary accent)
- `--thm-secondary: #ed4b4b`
- `--thm-special: #5366c2`
- `--thm-black: #0c2139`
- `--thm-form-input: #eff2f6`
- Supporting darks: `#09192c`, `#1d1c1c`

### High-usage neutral/system colors
- White variants: `#fff`, `#ffffff`, translucent white overlays.
- Footer text neutral: `#b0c2d7`.
- Panel/background neutrals: `#e6eaef`, `#eef4fb`, `#f8fbff`, `#deebf7`.

### Signature gradients used in custom sections
- Brand blue: `#004AA1 -> #008FD5` (multiple components).
- Hero/page header overlays: layered radial + linear gradients.
- News/service custom cards: per-card colorway gradients (blue/teal/coral/violet etc.).
- Marquee background: deep blue gradient (`#081b36`, `#0f356d`, `#0a274f`) + radial glows.

### Shape, depth, and radii
- Common radii: 4px, 12px, 14px, 16px, 18px, 20px, pill (`999px`).
- Shadows: medium/heavy card shadows in modern/news sections.
- Visual style mix:
  - legacy template blocks (flat + subtle shadows)
  - new custom blocks (glassmorphism, gradients, stronger depth).

## 6) Components and UI Behavior

### Buttons (`.thm-btn`)
- Base: background `var(--thm-base)`, white text, 4px radius, 15x30 padding.
- Hover: white background + `var(--thm-base)` text.
- Secondary variations exist in specific components (e.g. service modern CTA alt).

### Carousels and sliders
- Swiper used for hero/testimonials/client rows.
- Swiper options supplied via `data-swiper-options` JSON and initialized in `theme.js`.
- Odometer counters animate on appear.

### Marquee (`index.html`)
- Custom JS duplicates chip row and sets CSS variable duration based on row width.
- Pauses on hover.
- Honors reduced-motion via CSS media query.

### Accordions
- Bootstrap collapse accordions in FAQ and service details.
- Icon toggling plus/minus handled in `theme.js`.

## 7) Form and Backend Specifications

### Contact form (`contact.html -> contact.php`)
Fields:
- `name` (required)
- `email` (required)
- `phone`
- `subject`
- `message`

Backend behavior (`contact.php`):
- Uses `$_REQUEST` values.
- Sends mail to `support@creditoptimum.com`.
- Redirects to `thank-you.html` on success.
- No strict server-side request method check.

### Apply form (`apply-now.html -> apply-now.php`)
Major field groups and names:
- Loan: `loanamount`, `income`, `purposeloan`, `loanyears`
- Personal: `yourname`, `your-email`, `phonenumber`, `martialstatus`, `birthdate`, `numberofdependents`
- Address: `house-no`, `street`, `city`, `state`, `country`, `pin`
- Employment: `employmentindustry`, `employer_name`, `employer_status`, `lengthemployment`, `worknumber`

Backend behavior (`apply-now.php`):
- Enforces POST-only flow.
- Required server fields: `yourname`, `your-email`, `phonenumber`, `loanamount`.
- Validates email format.
- Sends structured mail to `support@creditoptimum.com`.
- Redirects to `thank-you.html` with HTTP 303 on success.
- Returns HTTP 400/500 text on failure.

## 8) Calculator Specifications

### Home page quick estimator (`index.html`, handled in `theme.js`)
- Loan amount slider: 1000 to 40000, step 1000.
- Month slider: 1 to 18, step 1.
- Interest source: `data-interest-rate="15"`.
- Formula: simple total = principal + (principal * rate), monthly = total / months.
- Outputs:
  - `#loan-monthly-pay`
  - `#loan-month`
  - `#loan-total`

### Loan calculator page (`loan-calculator.js`)
Inputs:
- Principal slider: 10000 to 5000000
- Months slider: 12 to 360
- Interest slider: 4.10 to 16.20

Formula:
- Standard EMI calculation with monthly interest ratio.
- Outputs:
  - `#emi` monthly EMI
  - `#tbl_emi` total interest
  - `#tbl_la` total payable

### Loan eligibility page (`loan-eligibility.js`)
Inputs:
- Principal, monthly income, tenure (years), interest, other EMIs.

Logic:
- Computes EMI for requested principal.
- Calculates effective allowable repayment by income slabs:
  - <=14999: 40%
  - <=29999: 45%
  - >=30000: 50%
- Adjusts with `existingLoan = existing - (existing * 60 / 100)`.
- Computes eligibility principal and display values.

## 9) Responsive Spec
Primary breakpoints seen across styles:
- 425px, 480px, 575px, 667px, 767px, 991px, 1199px, 1200px.

Behavior highlights:
- Topbar hidden below 992px.
- Desktop menu hidden below 1200px, mobile nav enabled.
- Hero headline scales down aggressively across breakpoints.
- Modern services/news cards reduce heights and stack on smaller screens.

## 10) Content and Brand Constants
- Company name: Optimum Touch Enterprise.
- Registration mention: `001620733-P`.
- Primary contact email: `support@creditoptimum.com`.
- Verification phone: `03-8891 3285`.
- Office address:
  - `14B, 1ST FLOOR, JALAN SG. 1/8, TAMAN INDUSTRI BOLTON, 68100 BATU CAVES, SELANGOR`.

## 11) SEO and Metadata
- Titles are page-specific and branded.
- Meta description reused on most pages; `news-details.html` has a custom one.
- Standard favicon set included.

## 12) Notable Implementation Notes
- `news-details.html` is data-driven from inline JS (no backend CMS).
- Most pages include `jquery.validate.min.js` but forms rely mostly on HTML required fields and backend checks.
- Calculator/eligibility pages load both jQuery 3.5.1 and jQuery 1.12.4 (legacy compatibility pattern).
- Currency display is mixed (`RM` on most pages, `$` in some calculator/eligibility UI text).
- There are duplicate/placeholder footer latest-news entries on multiple pages.

## 13) File Summary
- HTML pages: 12
- Backend handlers: 2 (`contact.php`, `apply-now.php`)
- Primary stylesheet: `assets/css/main.css`
- Primary behavior script: `assets/js/theme.js`
