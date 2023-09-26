import { promises as fs } from "node:fs";
import path from "path";
import { describe, expect, it, beforeEach, afterAll } from "vitest";
import { editQuote } from "../quotes";

const filePath = path.resolve(process.cwd(), "quotes.json");

describe("editQuote", () => {
  beforeEach(async () => {
    // Resetting the data before each test for consistency
    await fs.writeFile(
      filePath,
      JSON.stringify(
        [
          {
            id: "sample-id",
            quoteText: "Original Quote",
            author: "Original Author",
          },
        ],
        null,
        2
      )
    );
  });

  it("should edit an existing quote and return it", async () => {
    const updatedQuote = await editQuote(
      "sample-id",
      "Updated Quote",
      "Updated Author"
    );
    expect(updatedQuote.quoteText).toBe("Updated Quote");
    expect(updatedQuote.author).toBe("Updated Author");
  });

  it("should return null if the quote ID does not exist", async () => {
    const result = await editQuote(
      "non-existent-id",
      "Doesn't matter",
      "Doesn't matter"
    );
    expect(result).toBe(null);
  });
});

afterAll(async () => {
  await fs.writeFile(filePath, JSON.stringify([], null, 2));
});
