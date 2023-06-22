const newDeckUrl = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1 "

axios.get(newDeckUrl)
    .then( res => {
	const deck_id = res.data.deck_id;
	window.onkeydown = function (event) {
	    if (event.key == 'n')
		drawCard(deck_id)
	}
	button = document.querySelector("button");
	button.addEventListener("click", function (event) {
	    draw5(deck_id)
	})
    })
    
function draw5(deck) {
    let hand = [];
    let cardUrl =  "https://deckofcardsapi.com/api/deck/" + deck + "/draw/?count=1";
    for (let i = 0; i < 5; i++)
	hand.push(axios.get(cardUrl))

    Promise.all(hand)
	.then(res => {
	    for( let i = 0; i < res.length; i++)
		showCard(res[i].data.cards[0])	    
	})
}
	   
function drawCard (deck) {

    let cardUrl =  "https://deckofcardsapi.com/api/deck/" + deck + "/draw/?count=1";

    axios.get(cardUrl)
	.then(res => {
	    showCard(res.data.cards[0])
    })
}

function showCard( card ){
    console.log(card.value, "of", card.suit)
    addElements ( card )
}


function addElements( card ) {

    img = document.createElement('img')
    img.src = card.images.png;
    img.height = "200";
    document.body.appendChild(img)

}

