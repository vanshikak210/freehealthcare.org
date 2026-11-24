# Free Healthcare Initiative of California: website

Jekyll + Minima site (same structure as the Open Coding Society template). Built by GitHub Actions, hosted on **Cloudflare Pages**.

## How it deploys
1. Push to `main`. The GitHub Action (`.github/workflows/build.yml`) builds the site with Jekyll.
2. The finished site is published to the `deploy` branch.
3. Cloudflare Pages serves the `deploy` branch with **no build command** (production branch: `deploy`, output directory: blank).

If a build fails, check the **Actions** tab on GitHub.

## Edit the site
| To change | Edit |
|---|---|
| A page's text | `index.md`, `events.md`, `about.md`, `help.md`, `petition.md`, `involved.md`, `donate.md`, `contact.md` |
| Top navigation | `_data/nav.yml` |
| Events | `_data/events.yml` (add an entry; it hides itself after its `end` time) |
| Team members | `_data/team.yml` |
| Shared links (petition, Instagram, email) | `_config.yml` |
| Colors, fonts, layout | `_sass/theme.scss` |

## Preview locally
```
bundle install
bundle exec jekyll serve
```
