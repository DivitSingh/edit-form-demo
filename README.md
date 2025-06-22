# `PillList` Edit Entry Type – Implementation Documentation

## Overview

The `PillList` is a new edit entry type implemented within a React form component. It enables users to input and manage a dynamic list of short text entries (such as tags or keywords) using a user-friendly, visual "pill" interface.

Each entry is styled as a white rectangle with a thin black border and a small ✕ icon to remove it. Users can add new entries by typing into a text input and pressing `Enter`.

---

## Use Case

The `PillList` input type is useful for scenarios where a user needs to enter multiple values for a single field. Example use cases:

- Tags or keywords
- Interests or skills
- Email lists or user handles

---

## How It Works

- The component accepts a list attribute (e.g. `tags`) as part of the `entityObj` state.
- A temporary state field (`__pillInput`) holds the current input value.
- On pressing `Enter`, the current input is added to the list if it's not empty or a duplicate.
- Clicking the ✕ button next to any pill removes that entry from the list.
- On form submission, the `__pillInput` field is stripped out, and the updated entity is passed to `onSubmitSuccess`.

---

## Integration Details

### 1. EditEntryType Update

```js
export const EditEntryType = {
  ...
  PillList: 'PillList',
}
```

### 2. PillList Rendering in `EditForm.jsx`

```jsx
else if (editEntry.type === EditEntryType.PillList) {
  // UI rendering for pill entries + input field
}
```

### 3. State Management

The pills are rendered using `entity[editEntry.attribute]`. Additions and deletions are handled using `useState` and array manipulation.

---

## Design Choices

- Pills use flexbox for inline layout and spacing.
- Duplicate entries are ignored.
- The delete button is designed to be intuitive (✕) and responsive to clicks.
- The field is self-contained and generic – it works for any attribute provided via `editEntries`.

---

## Testing & Demo Setup

To test the `PillList`, a minimal React setup was used:

- **EditForm.jsx**: contains only the `PillList` logic, stripped of unrelated features and external dependencies.
- **TestFormPage.jsx**: renders the `EditForm` with one entry using the `PillList` type.
- **App.js**: renders `TestFormPage` directly.

In the project directory, you can run:

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Example Entry Used

```js
{
  attribute: 'tags',
  attributeName: 'Tags',
  type: EditEntryType.PillList,
  isRequired: false,
}
```

---

## Submission Notes

- The original `EditForm.jsx` file included many features and external dependencies. For simplicity and clarity, this implementation was isolated into a clean, minimal version to meet the requirements without unrelated compile errors.
- The current version focuses exclusively on the `PillList` and avoids any dependency on third-party services like Firebase or custom components.
