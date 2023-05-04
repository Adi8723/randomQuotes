// get Quotes from Api


const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const author = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');


let apiQuotes = [];

// show new quote

function newQuotes(){
   
    // pick a random quote from apiQuotes
     const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

     // Check if Autor field is blank and replace it with 'Unknown
     if (!quote.author) {
        author.innerHTML = 'Unknown'
     }else{
         author.innerHTML = quote['author']
    }
    // check the qupte length to determine styling
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote')
    }else{
        quoteText.classList.remove('long-quote')
    }
    quoteText.innerHTML = quote['text']
    
}



async function getQuotes(){
    let url = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(url)
        apiQuotes = await response.json();
        newQuotes();
    } catch (error) {
       
        // Cath error Here 
    }

}

// tweetquote

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerHTML} - ${author.innerHTML}`;
    window.open(twitterUrl, '_blank')
}

// Eventlisteners

newQuoteBtn.addEventListener('click', newQuotes)
twitterBtn.addEventListener('click', tweetQuote )
// onload
getQuotes()