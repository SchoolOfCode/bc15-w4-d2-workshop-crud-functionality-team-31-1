import { promises as fs } from "node:fs";
import path from "path";
import { describe, expect, it, beforeEach, afterAll } from "vitest";
import { validate } from "uuid";
import { addQuote } from "../quotes";

const filePath = path.resolve(process.cwd(), "quotes.json");

describe("addQuote", () => {
  beforeEach(async () => {
    // Reset the `quotes.json` file to an empty array
    await fs.writeFile(filePath, JSON.stringify([], null, 2), "utf8");
  });

  // Test case to add a quote with both text and author provided
  it("should correctly add a new quote with author to quotes.json and increase its length", async () => {
    const initialQuotes = JSON.parse(await fs.readFile(filePath, "utf8"));
    const initialLength = initialQuotes.length;

    const quoteText = "Be yourself; everyone else is already taken.";
    const author = "Oscar Wilde";
    const newQuote = await addQuote(quoteText, author);

    // Confirm the returned quote contains the provided text
    expect(newQuote.quoteText).toEqual(quoteText);

    // Confirm the returned quote contains the provided author
    expect(newQuote.author).toEqual(author);

    // Confirm the returned quote has an ID
    expect(validate(newQuote.id)).toBeTruthy();

    // Confirm that the quote has been saved in the file
    const updatedQuotes = JSON.parse(await fs.readFile(filePath, "utf8"));
    const savedQuote = updatedQuotes.find((q) => q.id === newQuote.id);

    expect(savedQuote).toBeTruthy();
    expect(savedQuote.quoteText).toEqual(quoteText);
    expect(savedQuote.author).toEqual(author);

    // Confirm the array length has increased by 1
    expect(updatedQuotes.length).toEqual(initialLength + 1);
  });

  // Test case to check the default behavior when an author is not provided
  it("should add a new quote to quotes.json, default its author to 'Unknown' if not provided, and increase its length", async () => {
    const initialQuotes = JSON.parse(await fs.readFile(filePath, "utf8"));
    const initialLength = initialQuotes.length;

    const quoteText = "A quote without a known author.";
    const newQuote = await addQuote(quoteText);

    // Confirm the returned quote contains the provided text
    expect(newQuote.quoteText).toEqual(quoteText);

    // Confirm the returned quote's author defaults to "Unknown"
    expect(newQuote.author).toEqual("Unknown");

    // Confirm that the quote has been saved in the file
    const updatedQuotes = JSON.parse(await fs.readFile(filePath, "utf8"));
    const savedQuote = updatedQuotes.find((q) => q.id === newQuote.id);

    expect(savedQuote).toBeTruthy();
    expect(savedQuote.author).toEqual("Unknown");

    // Confirm the array length has increased by 1
    expect(updatedQuotes.length).toEqual(initialLength + 1);
  });
});

afterAll(async () => {
  await fs.writeFile(filePath, JSON.stringify([], null, 2));
});
