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

## Languages

- English lives at the site root; Spanish lives in `es/`. Each page has a `ref:` in its front matter so the two versions link to each other.
- Menus and footer text: `_data/ui.yml` and `_data/nav.yml`. Events and team: the `es:` block inside `_data/events.yml` / `_data/team.yml`.
- To add another real translation, add a language to `_data/languages.yml` (`real`), a column in `ui.yml` / `nav.yml`, and a folder of translated pages.
- Other languages in the Preferences list open Google Translate on the current page (machine translation).
