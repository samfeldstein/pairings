---
title: Notebook
---

## Checklist for this site

- Deploy and make sure it works live
- Make it a PWA
- What to do with extras? For instance, if there are more students than saints.

### Content

- [x] Help page
  - [x] PWA instructions

## Checklist for every site

### Styles

- [x] Add fonts
- [x] Preload fonts
- [ ] Credits

### Docs

- ReadMe
- PWA instructions

### Accessibility

- Test keyboard shortcuts
- Test voiceover

## Performance

- [ ] Run Chrome Lighthouse
- [ ] Make it [work offline](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Offline_and_background_operation)?

## Issues

- When you add an item to a saved list, the list doesn't sort automatically. It also doesn't add a delete button. This doesn't seem like a huge deal, so I'm leaving it alone for now.
  - Acutally, when you add items in list of lists, they probably need to sort and render delete button right away. Cause otherwise that won't happen until the user force quits the app. Maybe get this done with a save button that calls render all lists.
- Generated pairings wrapping doesn't work on mobile. Probably need to use a table or put each pairings in its own li.
- Got rid of generated list names, so remove those styles
