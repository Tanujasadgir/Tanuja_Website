# Tanuja Sadgir — Cybersecurity Portfolio

A sleek, dark-themed single-page portfolio website for **Tanuja Sadgir**, Cybersecurity Engineer.
Built with plain HTML, CSS, and vanilla JavaScript — no build step, no dependencies.

## Features

- Modern dark UI with cyan/blue accents, animated grid background, and a terminal-style hero card
- Fully responsive (desktop, tablet, mobile) with a hamburger menu
- Smooth-scroll navigation with active-section highlighting
- Scroll-reveal animations and animated stat counters
- Sections: Hero, About, Skills, Experience timeline, Projects, Education, Contact
- Contact form using a `mailto:` handoff (works on static hosting)
- Accessible: semantic markup, reduced-motion support, keyboard-friendly nav

## Project Structure

```
.
├── index.html          # All page sections
├── css/
│   └── styles.css      # Theme, layout, responsive rules, animations
├── js/
│   └── main.js         # Nav, scroll effects, counters, form handling
├── assets/
│   ├── favicon.svg     # Site icon
│   └── README.txt      # Where to drop your resume PDF / photo
└── README.md
```

## Run Locally

It's a static site, so you can simply open `index.html` in a browser.
For best results (so fonts and paths resolve cleanly), serve it locally:

```bash
# Option 1: Python
python3 -m http.server 8000

# Option 2: Node (if you have it)
npx serve .
```

Then visit `http://localhost:8000`.

## Add Your Resume PDF

The hero's **Download Resume** button links to `assets/Tanuja_Sadgir_Resume.pdf`.
Drop your resume into the `assets/` folder using exactly that filename to enable the download.

## Deploy to GitHub Pages

1. Create a new GitHub repository and push these files to it:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

2. In the repository on GitHub, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Select branch **main** and folder **/ (root)**, then click **Save**.
5. After a minute, your site will be live at:

   ```
   https://<your-username>.github.io/<repo-name>/
   ```

> Tip: For a clean URL like `https://<your-username>.github.io/`, name the repository
> `<your-username>.github.io`.

## Customization

- **Colors / theme:** edit the CSS variables at the top of [css/styles.css](css/styles.css) (`--accent`, `--bg`, etc.).
- **Content:** all text lives directly in [index.html](index.html).
- **Contact form backend:** the form currently uses `mailto:`. To collect submissions
  without opening an email client, sign up for [Formspree](https://formspree.io), then
  change the `<form>` in `index.html` to `action="https://formspree.io/f/<your-id>" method="POST"`
  and remove the `e.preventDefault()` handling in [js/main.js](js/main.js).
