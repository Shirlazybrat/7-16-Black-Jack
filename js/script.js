// 1.When the user clicks deal, deal.

var theDeck = [];
var theTotal = 0;

$(document).ready(function(){

	$('.deal-button').click(function(){
		createDeck(); //Run a function that creates an array of 1H-13D
		shuffleDeck(); //Run the function that shuffles the cards
		placeCard('player', 'one', theDeck[0])
		placeCard('dealer', 'one', theDeck[1])
		placeCard('player', 'two', theDeck[2])
		placeCard('dealer', 'two', theDeck[3])
	});

	$('.hit-button').click(function(){
		placeCard('player', 'three', theDeck[4])
	});

	$('.stand-button').click(function(){

	});

});

dealerTotal();
playerTotal();


function placeCard(who, where, cardToPlace){
	var classSelector = '.' + who + '-cards .card-' + where;
	$(classSelector).html(cardToPlace);
}



function createDeck(){
	// Fill the deck with 
	// - 52 cards
	// - 4 suits
	// - h, s, c, d
	var suits = ['h', 's', 'd', 'c'];
	for(var s = 0; s< suits.length; s++){
		for(var c =1; c<=13; c++){
			theDeck.push(c+suits[s]);
		}
	}
}


function shuffleDeck(){
	// [1]
	// [2]
	// [3]
	// ...
	// [50]
	// [51]
	// [52]
for(var i=1; i< 1000; i++){
	card1 = Math.floor(Math.random() * theDeck.length);
	card2 = Math.floor(Math.random() * theDeck.length);
	var temp = theDeck[card1];
	theDeck[card1] = theDeck[card2];
	theDeck[card2] = temp;
	}
}

function placeTotal(who, where, cardToPlace){
	var totalSelector = '.' + who + '-total-number' + where;
	$(totalSelector).html(cardToPlace);
}

function dealerTotal(){
	var sum = 0;
	for(var i=0; i<theDeck.length; i++){
		sum += card;
		$(totalSelector).html(cardToPlace); 
	}
}

function playerTotal(){

}