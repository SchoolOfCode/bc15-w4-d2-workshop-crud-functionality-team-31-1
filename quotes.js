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

export async function getQuotes() {
//Load and parse all quotes from `quotes.json`.
const getQuote = await fs.readFile("quotes.json");
const fetchedQuotes = JSON.parse(getQuote);


//Return the array of all quotes.

return fetchedQuotes;



}
await addQuote();

export async function getQuote(id) {
    const getQuote = await fs.readFile("quotes.json");
const fetchedQuotes = JSON.parse(getQuote);
const foundCode = fetchedQuotes.find(quote  => quote.id === id)
return foundCode || null
}

export async function editQuote(id, newQuoteText, newAuthor) {
    //1. Load and parse the existing quotes from `quotes.json`.
    const getQuote = await fs.readFile("quotes.json");
    const fetchedQuotes = JSON.parse(getQuote);
    
    //2. Search for the quote object with the given `id` within the array of quote objects.
    const foundCode = fetchedQuotes.find(quote  => quote.id === id)
    if (!foundCode) {
        return null;
    } else {
    //If found, update the object's `quoteText` and `author` properties with the provided `newQuoteText` and `newAuthor`.
    foundCode.quoteText = newQuoteText;
    foundCode.author = newAuthor;
    //4. Save the updated array of quote objects back to `quotes.json`.
    //getQuote.push(foundCode);

    const JSONData = JSON.stringify(fetchedQuotes);
    await fs.writeFile("quotes.json", JSONData);
    // 5. Finally, return the updated quote object. If no quote with the specified ID is found, return `null`.
    return foundCode;
}
}

export async function deleteQuote(id) {
// Load and parse the existing quotes from `quotes.json`.
const getQuote = await fs.readFile("quotes.json");
const fetchedQuotes = JSON.parse(getQuote);
const JSONData = JSON.stringify(fetchedQuotes);
const deleteQuote = fetchedQuotes.findIndex((quote)  => quote.id === id)
//Find and remove the quote with the specified `id` from the array of quote objects.
  if(deleteQuote === -1){
    return false;
  }
  fetchedQuotes.splice(deleteQuote, 1);

  // Step 4: Save the updated quotes list back to quotes.json.
  await fs.writeFile('quotes.json', JSON.stringify(fetchedQuotes, null, 2), 'utf-8');

  // Step 5: Return true if the quote was successfully deleted.
  return true;

};