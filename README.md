# Free Healthcare Initiative of California: website

Jekyll + Minima site (same structure as the Open Coding Society template). Hosted on **Cloudflare Pages**, which builds it on every push to `main`.

## Cloudflare Pages build settings
- Build command: `bundle install && bundle exec jekyll build`
- Build output directory: `_site`
- Environment variable (optional): `JEKYLL_ENV=production`

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
