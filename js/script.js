// Set messages after game over
// The table/game looks like Rob made it. Change this.
// What about those stupid 11, 12, 13?
// What about Aces?
// The player can hit forever?
// There is no win counter/bet system
// There is no "deck" to draw from
// The cards aren't red or black like they should/could be
// The cards are lame. Find images.
// There is no delay on showing the cards... it's instant. 
// You can see the dealers 2nd card on deal. That's unfair (to the house).


// 1.When the user clicks deal, deal.

var theDeck = [];
var playersHand = [];
var dealersHand = [];
var topOfTheDeck = 4;

$(document).ready(function(){

	$('.deal-button').click(function(){
		createDeck(); //Run a function that creates an array of 1H-13D
		shuffleDeck(); //Run the function that shuffles the cards
		
		
		//push onto the player's hand array, the new card. Then push into the DOM
		playersHand.push(theDeck[0]);
		placeCard('player', 'one', theDeck[0])

		dealersHand.push(theDeck[1]);
		placeCard('dealer', 'one', theDeck[1])

		playersHand.push(theDeck[2]);
		placeCard('player', 'two', theDeck[2])

		dealersHand.push(theDeck[3]);
		placeCard('dealer', 'two', theDeck[3])

		calculateTotal(playersHand, 'player');
		calculateTotal(dealersHand, 'dealer');
	});


	$('.hit-button').click(function(){
		//placeCard('player', 'three', theDeck[4])
		var slotForNewCard = '';
		if(playersHand.length == 2){
			slotForNewCard = "three";
		}
		else if(playersHand.length == 3){
			slotForNewCard = "four";
		}
		else if(playersHand.length == 4){
			slotForNewCard = "five";
		}
		else if(playersHand.length == 5){
			slotForNewCard = "six";
		}
			placeCard('player' , slotForNewCard, theDeck[topOfTheDeck]);
			playersHand.push(theDeck[topOfTheDeck]);
			calculateTotal(playersHand, 'player');
			topOfTheDeck++;
	});


	$('.stand-button').click(function(){
		//PLayer clicked on stand. What happens to the player? Nothing!
		var dealerTotal = calculateTotal(dealersHand, 'dealer');
		var slotForNewCard = '';
		//console.log(dealerTotal);
		while(dealerTotal < 17){
			// Dealer has < 17. Hit away!
			if(dealersHand.length == 2){
				slotForNewCard = "three";
			}
			else if(dealersHand.length == 3){
				slotForNewCard = "four";
			}

			else if (dealersHand.length == 4){
				slotForNewCard = "five";
			}

			else if(dealersHand.length == 5){
				slotForNewCard = "six";
			}
			placeCard('dealer', slotForNewCard, theDeck[topOfTheDeck]);
			dealersHand.push(theDeck[topOfTheDeck]);
			dealerTotal = calculateTotal(dealersHand, 'dealer');
			topOfTheDeck++
		}

		//Dealer had at least 17. Check to see who won
		checkWin();
	});

});

function checkWin(){
	//alert("Game Over");
	//Get player total
	var playersTotal = calculateTotal(playersHand, 'player');
	//Get dealer total
	var dealersTotal = calculateTotal(dealersHand, 'dealer');

	if(playersTotal > 21){
		console.log(playersTotal);
		//player had busted
		//Set a message somewhere that says this
		alert("Player BUST!!!");
	} 
	else if(dealersTotal > 21){
		//dealer had busted
		//Set a message somewhere that says this
		alert("Dealer BUST!");
	}
	else{ //neither player has more than 21
		if(playersTotal > dealersTotal){
			//Player won. Say this somewhere
			alert("The player has Won!!!");
		}
		else if(dealersTotal > playersTotal){
			//Dealer won. Say this somewhere
			alert("The dealer Won!");
		}
		else{
			//Push. (tie) Say this somewhere
			alert("We have a tie!!");
		}
	}
}

function placeCard(who, where, cardToPlace){
	var classSelector = '.' + who + '-cards .card-' + where;

	//write logic to fix the 11, 12, 13th card issue

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

function calculateTotal(hand, whosTurn){
	var cardValue = 0;
	var total = 0;
	for(var i = 0; i<hand.length; i++){
	cardValue = Number(hand[i].slice(0,-1))
	// console.log(hand[i]);
	// console.log(cardValue);
	if(cardValue > 10){
		cardValue = 10;
	}

	total += cardValue;
	}

	//update the html with the new total
	var elementToUpdate = '.' +whosTurn + '-total-number';
	$(elementToUpdate).text(total);
	return total;
}



