import { promises as fs } from "node:fs";
import path from "path";
import { describe, expect, it, beforeEach, afterAll } from "vitest";

const projectRoot = path.resolve(process.cwd());
const filePath = path.resolve(process.cwd(), "quotes.json");

describe("Ticket 1 - Project Setup", () => {
  beforeEach(async () => {
    // Reset the `quotes.json` file to an empty array
    await fs.writeFile(filePath, JSON.stringify([], null, 2), "utf8");
  });

  it("node_modules directory should exist", async () => {
    expect(await fs.stat(path.join(projectRoot, "node_modules"))).toBeTruthy();
  });

  it("package.json file should exist", async () => {
    expect(await fs.stat(path.join(projectRoot, "package.json"))).toBeTruthy();
  });

  it("uuid package should be a dependency", async () => {
    const packageJSON = JSON.parse(
      await fs.readFile(path.join(projectRoot, "package.json"), "utf8")
    );
    expect(packageJSON.dependencies?.uuid).toBeDefined();
  });

  it("quotes.js file should exist", async () => {
    expect(await fs.stat(path.join(projectRoot, "quotes.js"))).toBeTruthy();
  });

  it("quotes.json file should exist", async () => {
    expect(await fs.stat(path.join(projectRoot, "quotes.json"))).toBeTruthy();
  });

  it("quotes.json should be initialized with an empty array", async () => {
    const quotesContent = JSON.parse(
      await fs.readFile(path.join(projectRoot, "quotes.json"), "utf8")
    );
    expect(
      Array.isArray(quotesContent) && quotesContent.length === 0
    ).toBeTruthy();
  });
});

afterAll(async () => {
  await fs.writeFile(filePath, JSON.stringify([], null, 2));
});
