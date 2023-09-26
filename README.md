# CRUD Functionality for Inspirational Quotes App

Building applications often requires performing a set of fundamental operations. These are commonly referred to as CRUD operations:

- Create: Add new data.
- Read: Retrieve existing data.
- Update: Modify existing data.
- Delete: Remove data.

In this workshop, we'll construct a module with helper functions that handle these CRUD operations for an inspirational quotes application. These functions will lay the foundation for future workshops where we'll integrate them into an Express API.

## 🎯 Workshop Objectives

- Understand and perform CRUD operations to manage inspirational quotes.
- Read from and write to a JSON file to persist quote data.
- Use the `uuid` package to generate unique identifiers for quotes.
- Organize code into modules for enhanced maintainability.

## 🎫 Workshop Tickets

Throughout the workshop, each ticket represents a phase in our project's development. By completing them in order, you will construct a fully functional CRUD module for our Inspirational Quotes App.

🧪 If you encounter a ticket with a test icon next to it, this indicates that you can run the corresponding test command to receive immediate feedback on your solution.

For convenience, we've added scripts to the package.json for each ticket:

```json
{
  "scripts": {
    "test:ticket1": "vitest run __tests__/ticket1.test.js",
    "test:ticket2": "vitest run __tests__/ticket2.test.js",
    "test:ticket3": "vitest run __tests__/ticket3.test.js",
    "test:ticket4": "vitest run __tests__/ticket4.test.js",
    "test:ticket5": "vitest run __tests__/ticket5.test.js",
    "test:ticket6": "vitest run __tests__/ticket6.test.js"
  }
}
```

For example, to run the test for Ticket 1 (once you've installed dependencies in ticket 1), you'd run the following in your terminal:

```
npm run test:ticket1
```

### 🧪🎫 Ticket 1 - Project Setup

Let's set the stage. Our project has been initialized with the `npm init` command. Here's a brief overview of what's already in place:

Execute the following command in your terminal:

```
npm install
```

💡 This command ensures that all essential tools and libraries specified in the project's `package.json` file are downloaded and available for use.

Upon opening the `package.json` file, you'll notice that certain packages have already been installed:

- `uuid` (dependency) - This third-party package makes it easy to assign a unique ID to each quote. Using UUID ensures that each quote will have a globally unique identifier, eliminating potential ID clashes.
- `vitest` (devDependency) - This third-party package lets us verify your solutions with automated tests.

Two main files have been set up in the root directory of your project:

- `quotes.js` - This is where CRUD helper functions will reside.
- `quotes.json` - This file will store the list of quotes.

The `quotes.js` file already contains some boilerplate code.

Imports:

```js
import { promises as fs } from "node:fs";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";
```

- We're using the `promises` version of `fs` (File System) to handle file operations asynchronously, making it possible to read and write from our `quotes.json` without blocking the rest of our application.
- The `path` module helps with file and directory path operations, ensuring that we always work with the correct paths irrespective of the operating system or the folder from which our script is executed.
- The `uuidv4` function generates a random UUID. The version 4 UUIDs are universally unique identifiers with 122 randomly generated bits.

File Path Resolution:

```js
const filePath = path.resolve(process.cwd(), "quotes.json");
```

- This line determines the absolute path to `quotes.json`, ensuring we always target the right file regardless of where our script runs.

Helper Functions:

```js
export async function addQuote(quoteText, author = "Unknown") {}

export async function getQuotes() {}

export async function getQuote(id) {}

export async function editQuote(id, newQuoteText, newAuthor) {}

export async function deleteQuote(id) {}
```

- These are the placeholder functions that you'll be implementing in the upcoming tickets.

The `quotes.json` file, which is in JSON format, is initialized with an empty array:

```json
[]
```

🧪 Before moving on, run the tests for this ticket to ensure that everything has been set up correctly:

```
npm run test:ticket1
```

### 🧪🎫 Ticket 2 - Add/Save a New Quote

In this ticket, you'll tackle the first core functionality of our Inspirational Quotes App: adding new quotes. A significant aspect of CRUD operations is the ability to create or add new data. For our application, this means saving new quotes with unique identifiers to the `quotes.json` file.

You'll be implementing the `addQuote` function located in the `quotes.js` file.

```js
export async function addQuote(quoteText, author = "Unknown") {}
```

Follow these steps to implement the function:

1. The function should accept two parameters: `quoteText` (a String) and `author` (a String) with a default value of "Unknown".
2. Create a new quote object with both the `quoteText` and `author`.
3. Generate and assign a unique ID to this `quote` using the `v4` method from the `uuid` package.
4. Load and parse the existing quotes from `quotes.json`.
5. Add the new `quote` object to the end of the parsed list.
6. Save this updated list back to `quotes.json`.
7. Finally, return the newly created `quote` object.

A typical quote object will look like:

```json
{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "quoteText": "You must be the change you wish to see in the world.",
  "author": "Mahatma Gandhi"
}
```

💡 Always ensure that the UUID generated for each quote is distinct. This prevents potential conflicts during CRUD operations, ensuring each quote can be accurately retrieved, edited, or deleted without affecting others.

🧪 Before moving on, run the tests for this ticket to ensure your solution is accurate:

```
npm run test:ticket2
```

### 🧪🎫 Ticket 3 - Retrieve All Quotes

Building upon Ticket 2, in this ticket, we'll introduce functionality to retrieve all the saved quotes from the `quotes.json` file.

You'll be implementing the `getQuotes` function located in the `quotes.js` file.

```js
export async function getQuotes() {}
```

Follow these steps to implement the function:

1. Load and parse all quotes from `quotes.json`.
2. Return the array of all quotes.

🧪 Before moving on, run the tests for this ticket to ensure your solution is accurate:

```
npm run test:ticket3
```

### 🧪🎫 Ticket 4 - Retrieve a Quote by ID

Continuing from the previous tickets, in this one, we'll focus on retrieving a specific quote by its unique ID from the `quotes.json` file.

You'll be implementing the `getQuote` function located in the `quotes.js` file.

```js
export async function getQuote(id) {}
```

Follow these steps to implement the function:

1. Load and parse the existing quotes from `quotes.json`.
2. Search for the quote with the given `id` within the array of quote objects.
3. If found, return the quote object; otherwise, return `null`.

💡 Remember, the UUID is unique for every quote, which allows for precise retrieval without clashes.

🧪 Before moving on, run the tests for this ticket to ensure your solution is accurate:

```
npm run test:ticket4
```

### 🧪🎫 Ticket 5 - Edit a Quote by ID

Editing or updating existing data is a critical aspect of CRUD operations. In this ticket, we'll introduce functionality to modify a saved quote based on its unique ID in the `quotes.json` file.

You'll be implementing the `editQuote` function in the `quotes.js` file.

```js
export async function editQuote(id, newQuoteText, newAuthor) {}
```

Follow these steps to implement the function:

1. Load and parse the existing quotes from `quotes.json`.
2. Search for the quote object with the given `id` within the array of quote objects.
3. If found, update the object's `quoteText` and `author` properties with the provided `newQuoteText` and `newAuthor`.
4. Save the updated array of quote objects back to `quotes.json`.
5. Finally, return the updated quote object. If no quote with the specified ID is found, return `null`.

🧪 Before moving on, run the tests for this ticket to ensure your solution is accurate:

```
npm run test:ticket5
```

### 🧪🎫 Ticket 6 - Delete a Quote by ID

The final CRUD operation we'll tackle is the ability to delete a quote by its unique ID. By the end of this ticket, you'll be able to remove quotes from the `quotes.json` file.

You'll be implementing the `deleteQuote` function located in the `quotes.js` file.

```js
export async function deleteQuote(id) {}
```

Follow these steps to implement the function:

1. Load and parse the existing quotes from `quotes.json`.
2. Find and remove the quote with the specified `id` from the array of quote objects.
3. Save the updated quotes list, excluding the deleted quote, back to `quotes.json`.
4. Return `true` if the quote was successfully deleted, or `false` if no matching quote was found.

🧪 Before moving on, run the tests for this ticket to ensure your solution is accurate:

```
npm run test:ticket6
```

## 🥳🏁🔥 Congratulations!

You've successfully built a CRUD module for managing inspirational quotes! This foundation is not just a significant step for this project but a representation of a fundamental software development principle.

Being able to design, develop, and test modules in isolation or parallel is a robust concept known as modularity. It ensures that components of a system can evolve, be replaced, or maintained without impacting other parts of the system. The benefits are immense:

1. Ease of Understanding: Smaller, self-contained modules are easier to understand, reducing the cognitive load for developers.
2. Parallel Development: Different teams or developers can work on separate modules simultaneously, leading to faster development cycles.
3. Reusable Code: Modules can be reused across different parts of an application or even different projects.
4. Better Testing: Isolated modules can be tested in a vacuum, ensuring that they work as expected before integrating.

In future workshops, we'll leverage this module to power our REST API for the Inspirational Quotes App, integrating these CRUD operations with HTTP methods to interact with our application from anywhere!🚀
