const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const copyButton= document.getElementById('copy');
const soundButton= document.getElementById('sound');
const twitterButton= document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Get random quote from API
async function getQuote() {
  newQuoteButton.classList.add('loading');
  newQuoteButton.innerText = "Loading Quote...";
  const apiUrl = 'https://api.quotable.io/random';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Reduce font size for long quote
    (data.content.length > 100) ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');

    quoteText.innerText = data.content;

    // If the Author is blank, add 'Unknown'
    (data.author === '') ? authorText.innerText = 'Unknown' : authorText.innerText = data.author;

    newQuoteButton.innerText = "New Quote";
    newQuoteButton.classList.remove('loading');
  } catch (error) {
    console.log('Sorry, no quote was found', error);
  }
}

// Event Listener
soundButton.addEventListener('click', () => {
  // The SpeechSynthesisUtterance is a web speech api that represents a speech requests
  let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorText.innerText}`);
  speechSynthesis.speak(utterance);
});

copyButton.addEventListener('click', () => {
  // Copy the quote text
  navigator.clipboard.writeText(quoteText.innerText);
});

twitterButton.addEventListener('click', () => {
  const quote = quoteText.innerText
  const author = authorText.innerText
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
});

newQuoteButton.addEventListener('click', getQuote);

// On load
getQuote();