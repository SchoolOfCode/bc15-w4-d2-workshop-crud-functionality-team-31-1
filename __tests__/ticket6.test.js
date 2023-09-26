import { promises as fs } from "node:fs";
import path from "path";
import { describe, expect, it, beforeEach, afterAll } from "vitest";
import { deleteQuote, getQuote } from "../quotes";

const filePath = path.resolve(process.cwd(), "quotes.json");

describe("deleteQuote", () => {
  beforeEach(async () => {
    // Resetting the data before each test for consistency
    await fs.writeFile(
      filePath,
      JSON.stringify(
        [
          {
            id: "sample-id",
            quoteText: "Sample Quote",
            author: "Sample Author",
          },
        ],
        null,
        2
      )
    );
  });

  it("should delete an existing quote and return true", async () => {
    const result = await deleteQuote("sample-id");
    const deletedQuote = await getQuote("sample-id");

    expect(result).toBe(true);
    expect(deletedQuote).toBe(null);
  });

  it("should return false if the quote ID does not exist", async () => {
    const result = await deleteQuote("non-existent-id");
    expect(result).toBe(false);
  });
});

afterAll(async () => {
  await fs.writeFile(filePath, JSON.stringify([], null, 2));
});
