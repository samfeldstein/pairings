# Notebook

## Roadmap

- Delete lists
- Edit lists (delete and add items)
- Sort lists
- Select lists to pair
- Disable save button if there's nothing to save
  - This has proven harder than it sounds, and since it's not all-important I'm going to move on for now.
- Rendered listed are stacking on top of each other in the all lists section. The problem should be in the render list function.
- Remove items from lists in all lists
- Aria label for create list delete buttons
- Style deleteable list items with a class
- Document meta
- When you delete a list, it doesn't disappear from generator options
- Multiword list ids
- Hide save button while entering new list name. If it's already there, people might think they're supposed to click it
- Adding list items in all lists doesn't sort, and doesn't add delete buttons

## Fix

- Only render save button if the list is not empty. Or disable it at least.
- In new list, used required attr instead of showing an error
  - With default submit behavior, that should be what you need. Is there a way to prevent page reload, but preserve other functionality?
  - <https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation>
  - prevent default form behavior, as done in generator
- Use type="button" to disable default behavior where you can
- Replace class hidden with hidden attr
- Generator reset behavior should just occur when you hit the generate button
- Make list names bigger in all lists 

## Refactor

- Use one event listener for multiple events?
- Make input a component? Use case seems to fit. Element used multiple times that needs special treatment.
- Make list items a component?

## Wishlist

- Lock lists in place so you don't have to select them every time you open the app.
