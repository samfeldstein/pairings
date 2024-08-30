# Notebook

## Roadmap

- Delete lists
- Edit lists (delete and add items)
- Sort lists
- Select lists to pair
- Disable save button if there's nothing to save
  - This has proven harder than it sounds, and since it's not all-important I'm going to move on for now.
- Rendered listed are stacking on top of each other in the all lists section. The problem should be in the render list function.

## Fix

- Only render save button if the list is not empty. Or disable it at least.
- In new list, used required attr instead of showing an error
  - With default submit behavior, that should be what you need. Is there a way to prevent page reload, but preserve other functionality?
  - https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
  - prevent default form behavior, as done in generator
- Use type="button" to disable default behavior where you can
- Replace class hidden with hidden attr

## Refactor

- Use one event listener for multiple events?
- Make input a component? Use case seems to fit. Element used multiple times that needs special treatment.
- Make list items a component?

## Wishlist

- Lock lists in place so you don't have to select them every time you open the app.
