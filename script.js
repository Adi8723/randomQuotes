const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorTe = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');


let apiQuotes = [];

// showing loading

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// remove loading spinner

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// show new quote

function newQuote() {
    loading();
    // -----> Only use one of the following const quote statements

    // pick a random quote from apiQuotes
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

    // Check if Autor field is blank and replace it with 'Unknown
    if (!quote.author) {
        authorTe.textContent = 'Unknown'
    } else {
        authorTe.textContent = quote.author
    }

    // check the quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}



async function getQuotes() {
    loading();
    let url = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(url);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {

        // Cath error Here 
    }

}

// tweetquote

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
    window.open(twitterUrl, '_blank')
}

// Eventlisteners

newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)
// onload

getQuotes();

