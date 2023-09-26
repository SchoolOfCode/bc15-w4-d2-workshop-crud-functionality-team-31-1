import { promises as fs } from "node:fs";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";

const quote1 = {
    id: uuidv4(),
    quoteText: "Be yourself; everyone else is already taken.",
    author: "Unknown"
}
//Test id randomly generated
//console.log(quote1.id)

const filePath = path.resolve(process.cwd(), "quotes.json");

export async function addQuote(quoteText, author = "Unknown") {
    const quotes = await fs.readFile("quotes.json");
    const quotesList = JSON.parse(quotes);
    //console log to test
    //console.log(quotesList);
    quotesList.push(quote1.quoteText, quote1.author);

    const JSONData = JSON.stringify(quotesList);
    await fs.writeFile("quotes.json", JSONData);
    return quote1;
}
await addQuote(quote1);

export async function getQuotes() {}

export async function getQuote(id) {}

export async function editQuote(id, newQuoteText, newAuthor) {}

export async function deleteQuote(id) {}
