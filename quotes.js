import { promises as fs } from "node:fs";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";


//Test id randomly generated
//console.log(quote1.id)

const filePath = path.resolve(process.cwd(), "quotes.json");

export async function addQuote(quoteText, author = "Unknown") {
    
    const newQuote = {
    quoteText,
    author,
    id: uuidv4(),
};
   
    await fs.writeFile(filePath, JSON.stringify([], null, 2), "utf8")
    const quoteList = await fs.readFile("quotes.json");
    const quotes = JSON.parse(quoteList);
    //console log to test
    //console.log(quotesList);
    quotes.push(newQuote);

    const JSONData = JSON.stringify(quotes);
    await fs.writeFile("quotes.json", JSONData);
    return newQuote;
}
await addQuote("You must be the change you wish to see in the world.", "Mahatma Gandhi");

export async function getQuotes() {}

export async function getQuote(id) {}

export async function editQuote(id, newQuoteText, newAuthor) {}

export async function deleteQuote(id) {}
