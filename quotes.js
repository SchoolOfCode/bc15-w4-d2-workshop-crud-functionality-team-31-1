import { promises as fs } from "node:fs";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";

const filePath = path.resolve(process.cwd(), "quotes.json");

export async function addQuote(quoteText, author = "Unknown") {}

export async function getQuotes() {}

export async function getQuote(id) {}

export async function editQuote(id, newQuoteText, newAuthor) {}

export async function deleteQuote(id) {}
