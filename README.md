# Chichi's Bakery Website

## Project Title
Chichi's Bakery Website (WEDE5020 Portfolio of Evidence)

## Student Information
- **Name:** [Thikhedzo Mbedzi]
- **Student Number:** [10522077]
- **Module:** Web Development (Introduction) &ndash; WEDE5020
- **Group:** [03]

## Project Overview
This is the code for the Chichi's Bakery website, made for the WEDE5020
Portfolio of Evidence. Chichi's Bakery is a made-up, family-run bakery. The
project is being built in three parts:

- **Part 1:** HTML pages, planning and research (done)
- **Part 2:** CSS styling and making it work on phones/tablets 
- **Part 3:** JavaScript, SEO and putting the site online (this part)

## Website Goals and Objectives
- Give the bakery a website that people can find and look at anytime.
- Let customers see all the products on offer.
- Let customers send in cake/catering requests through a form.
- Show the location, contact details and opening hours clearly.

**How we will know it's working:**
1. 20+ cake/catering requests come through the site per month, 3 months after launch.
2. People spend 90+ seconds on the site on average.
3. More walk-in customers say they found the bakery online.

## Key Features and Functionality
- 5 pages: Home, About Us, Products, Enquiry, Contact.
- Basic HTML5 structure using `header`, `nav`, `main`, `section`, `footer`.
- Enquiry form for cake/catering requests.
- Contact form and a map section for two locations.
- Same navigation menu on every page.
- One external stylesheet (`css/style.css`) linked to all 5 pages.
- Colour scheme, fonts, and spacing applied across the whole site.
- Flexbox and Grid used for the header, product cards, and layout.
- Hover/focus/active styles on buttons, links and the nav menu.
- Responsive design with breakpoints for desktop, tablet (900px) and mobile (600px).

## Timeline and Milestones
| Part | Weeks | What gets done |
|---|---|---|
| Part 1 | 1&ndash;4 | Planning, proposal approved, HTML pages built |
| Part 2 | 5&ndash;7 | CSS styling, works on phones/tablets |
| Part 3 | 8&ndash;10 | JavaScript, form validation, SEO files, deployment |

## Part 1 Details
What was done for Part 1:
- Two website proposals were written and sent to the lecturer for approval
  (see `Website_Project_Proposal.docx`): **Chichi's Bakery** and
  **Paws & Hope Animal Rescue**. Chichi's Bakery was picked to go ahead with.
- Content was researched and organised in the `/content-research` folder
  (images, text, documents).
- The file and folder structure below was set up.
- Five HTML pages were built with a simple structure, navigation, and
  placeholder content, ready to be styled in Part 2.

### File and Folder Structure
```
chichis-bakery/
├── index.html
├── about.html
├── products.html
├── enquiry.html
├── contact.html
├── css/            
├── js/             
├── images/         
├── content-research/
│   ├── images/
│   ├── text/
│   └── documents/
└── README.md
```

### Sitemap
```
                    Homepage (index.html)
                            |
   -----------------------------------------------------
   |               |                |                  |
About Us        Products          Enquiry            Contact
(about.html)   (products.html)   (enquiry.html)    (contact.html)
```
See `images/sitemap.png` for the sitemap picture.

## Part 2 Details

What was added for Part 2:
- Built one external stylesheet, `css/style.css`, linked to all 5 pages.
- Added a CSS reset and default/base styles (fonts, colours, spacing).
- Styled typography using a heading font and a body font, with a clear size scale.
- Built the layout using Flexbox (header/nav, forms) and CSS Grid (product cards).
- Added colours, card shadows, and `:hover` / `:focus` / `:active` states on
  buttons, links and the nav menu.
- Added responsive design: a tablet breakpoint at 900px (product grid drops to
  2 columns) and a mobile breakpoint at 600px (nav stacks, grid becomes 1
  column, buttons go full-width).
- Added the real bakery logo (`images/logo.png`) and a real bread photo
  (`images/bread-sourdough.jpg`) .
- Added simple placeholder graphics for the products/team photos.
- Tested the site at desktop, tablet and mobile widths using browser dev tools.

## Part 3 Details

What was added for Part 3:
- **`js/main.js`** (all pages): footer year and last-modified date, current-page highlight in the nav, fade-in animation on scroll (`IntersectionObserver`), a lightbox gallery (click any product/team image, use arrows or Esc), an accordion and tabs, and a back-to-top button.
- **`js/products.js`** (products.html): the product list is now loaded dynamically from a JavaScript array, with live search, a category filter and sorting by price or name.
- **`js/forms.js`** (enquiry.html and contact.html): client-side validation with inline error messages (name, email, SA phone number, date not in the past, message length) and AJAX (`fetch`) submission.
  - **Enquiry form:** once valid, shows a response with pricing and availability based on the enquiry type and date (closed Mondays, 3 days&rsquo; notice for cakes/catering).
- **FAQ accordion** added to enquiry.html; **tabs** added to contact.html to switch between the two location maps.
- **SEO:** added `robots.txt` and `sitemap.xml`; each page keeps its own title, meta description and heading structure; images use alt text.
- **Deployment:** hosted on github.

## Changelog
| Date | Change |
|---|---|
| 2026-08-14 | Started the project: set up the file/folder structure |
| 2026-08-14 | Wrote the two website proposals |
| 2026-08-14 | Chichi's Bakery approved and chosen to move forward with |
| 2026-08-14 | Built the HTML pages: index, about, products, enquiry, contact |
| 2026-08-14 | Added the enquiry and contact forms |
| 2026-09-01 | Fixed the stylesheet link on index.html so all pages use css/style.css |
| 2026-09-01 | Fixed the .logo CSS selector so the logo styling actually applies |
| 2026-09-01 | Fixed the Bread section on products.html |
| 2026-09-01 | Fixed the map address placeholders on contact.html to match the real address |
| 2026-09-05 | Built the full external stylesheet: base styles, typography, layout, colours |
| 2026-09-05 | Added Flexbox for the header/nav and forms, Grid for the product cards |
| 2026-09-05 | Added hover/focus/active styles for buttons, links and nav |
| 2026-09-10 | Added responsive breakpoints for tablet (900px) and mobile (600px) |
| 2026-09-11 | Added the real logo and bread photo, plus placeholder images for the rest |
| 2026-10-29 | Created `js/main.js`: footer date, active nav link, scroll fade-in animation, lightbox gallery, accordion, tabs, back-to-top button |
| 2026-10-29 | Created `js/products.js`: products now load dynamically, with search, category filter and sorting; replaced the hard-coded product HTML on products.html |
| 2026-10-29 | Created `js/forms.js`: client-side validation with error messages, AJAX submission, enquiry response (price/availability) and mailto email for the contact form |
| 2026-10-29 | Replaced the inline footer script on index.html (which had typos) with `main.js` |
| 2026-10-29 | contact.html: removed the stray `[ ]` brackets around the map iframes, made the maps responsive and put them in tabs |
| 2026-10-29 | enquiry.html: added an FAQ accordion |
| 2026-10-29 | Added `robots.txt` and `sitemap.xml` |
| 2026-10-29 | Appended Part 3 styles to `css/style.css` (validation errors, lightbox, accordion, tabs, product filters, animations, reduced-motion support) |
| 2026-11-02 | Connected the enquiry form to Formspree so submissions are sent by AJAX to a real endpoint

## References

Netlify (2025) *Netlify Pricing*. Available at: https://www.netlify.com/pricing/ (Accessed: 10 August 2026).

Mozilla Developer Network (2025) *HTML: HyperText Markup Language*. Available at: https://developer.mozilla.org/en-US/docs/Web/HTML (Accessed: 10 August 2026).

GitHub (2025) *GitHub Pages Documentation*. Available at: https://docs.github.com/en/pages (Accessed: 10 August 2026).

World Wide Web Consortium (2025) *Web Accessibility Initiative (WAI)*. Available at: https://www.w3.org/WAI/ (Accessed: 10 August 2026).

Mozilla Developer Network (2025) *CSS Flexible Box Layout*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout (Accessed: 20 August 2026).

Mozilla Developer Network (2025) *CSS Grid Layout*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout (Accessed: 20 August 2026).

Mozilla Developer Network (2025) *Using Media Queries*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries (Accessed: 20 August 2026).

Mozilla Developer Network (2025) *Using the Fetch API*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch (Accessed: 29 October 2026).

Mozilla Developer Network (2025) *Intersection Observer API*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API (Accessed: 29 October 2026).

Mozilla Developer Network (2025) *Client-side form validation*. Available at: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation (Accessed: 29 October 2026).
