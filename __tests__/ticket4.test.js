import { promises as fs } from "node:fs";
import path from "path";
import { describe, expect, it, beforeEach, afterAll } from "vitest";
import { addQuote, getQuote } from "../quotes";

const filePath = path.resolve(process.cwd(), "quotes.json");

describe("getQuote", () => {
  beforeEach(async () => {
    // Reset the `quotes.json` file to an empty array
    await fs.writeFile(filePath, JSON.stringify([], null, 2), "utf8");
  });

  let savedQuoteId;

  beforeEach(async () => {
    // Add a quote to be retrieved in the tests
    const quoteText =
      "Life is what happens when you're busy making other plans.";
    const author = "John Lennon";
    const newQuote = await addQuote(quoteText, author);
    savedQuoteId = newQuote.id;
  });

  it("should retrieve a quote by its unique ID from quotes.json", async () => {
    const retrievedQuote = await getQuote(savedQuoteId);

    // Confirm the retrieved quote contains the correct ID
    expect(retrievedQuote.id).toEqual(savedQuoteId);

    // Confirm the retrieved quote's content
    expect(retrievedQuote.quoteText).toEqual(
      "Life is what happens when you're busy making other plans."
    );
    expect(retrievedQuote.author).toEqual("John Lennon");
  });

  it("should return null if a quote with the given ID does not exist", async () => {
    const nonExistentId = "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6";
    const retrievedQuote = await getQuote(nonExistentId);

    expect(retrievedQuote).toBeNull();
  });
});

afterAll(async () => {
  await fs.writeFile(filePath, JSON.stringify([], null, 2));
});
