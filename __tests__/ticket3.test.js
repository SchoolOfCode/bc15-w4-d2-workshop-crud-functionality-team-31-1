import { promises as fs } from "node:fs";
import path from "path";
import { describe, expect, it, beforeEach, afterAll } from "vitest";
import { addQuote, getQuotes } from "../quotes";

const filePath = path.resolve(process.cwd(), "quotes.json");

describe("getQuotes", () => {
  beforeEach(async () => {
    // Reset the `quotes.json` file to an empty array
    await fs.writeFile(filePath, JSON.stringify([], null, 2), "utf8");
  });

  it("should retrieve all quotes from quotes.json", async () => {
    const allQuotesBefore = await getQuotes();
    const quoteText =
      "Life is what happens when you're busy making other plans.";
    const author = "John Lennon";
    await addQuote(quoteText, author);
    const allQuotesAfter = await getQuotes();

    // Confirm the number of quotes has increased by 1
    expect(allQuotesAfter.length).toEqual(allQuotesBefore.length + 1);
  });
});

afterAll(async () => {
  await fs.writeFile(filePath, JSON.stringify([], null, 2));
});
