// *Set messages after game over
// The table/game looks like Rob made it. Change this.
// *What about those stupid 11, 12, 13?
// What about Aces equal 1 and 11?
// The player can hit forever?
// There is no win counter/bet system
// There is no "deck" to draw from
// *The cards aren't red or black like they should/could be
// *The cards are lame. Find images.
// *There is no delay on showing the cards... it's instant. 
// You can see the dealers 2nd card on deal. That's unfair (to the house).

//***Create a wagering system**


// 1.When the user clicks deal, deal.

var theDeck = [];
var playersHand = [];
var dealersHand = [];
var topOfTheDeck = 4;
var playerBank = 10;
var betAmount = 0;
var cardsDealt = false;

$(document).ready(function(){

	$('.chips').click(function(){
		placeBet();
	});

	$('.deal-button').click(function(){
		createDeck(); //Run a function that creates an array of 1H-13D
		shuffleDeck(); //Run the function that shuffles the cards
		
		
		//push onto the player's hand array, the new card. Then push into the DOM
		playersHand.push(theDeck[0]);
		setTimeout(function(){ 
			placeCard('player', 'one', theDeck[0])
			}, 500);
		

		dealersHand.push(theDeck[1]);
		setTimeout(function(){ 
			placeCard('dealer', 'one', theDeck[1])
			}, 1000);
		

		playersHand.push(theDeck[2]);
		setTimeout(function(){ 
			placeCard('player', 'two', theDeck[2])
			}, 1500);
		

		dealersHand.push(theDeck[3]);
		setTimeout(function(){ 
			placeCard('dealer', 'two', theDeck[3])
			}, 2000);
		
		setTimeout(function(){ 
			calculateTotal(playersHand, 'player');
			calculateTotal(dealersHand, 'dealer'); 
			}, 3000);
		
	});


	$('.hit-button').click(function(){
		//placeCard('player', 'three', theDeck[4])
		var playerTotal = calculateTotal(playersHand, 'player');

		if(playerTotal <= 21){
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
		}
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

	$('.reset').click(function(){
		 playersHand = []; // empty the players hand
        dealersHand = []; // empty the dealers hand
        theDeck = []; // empty the deck
        topOfTheDeck = 4; // reset top of deck to 5
        cardsDealt = false;
        $('.row-winner').text(''); // reset win/loss/push message to an empty string
        $('.card').text(''); // reset cards to blank
        $('.player-total-number').text('0'); // reset number in player total html
        $('.dealer-total-number').text('0'); // reset number in dealer total html
        $('.hit-button').prop('disabled', false);
		$('.stand-button').prop('disabled', false);
	});

});

function placeBet(){
	if((cardsDealt == false) && (playerBank > 0)){
			betAmount += 1;
			playerBank -= 1;
			$('.bank-display').html('Bank: ' +playerBank + '<br>Bet: '+ betAmount);
	}
}

function checkWin(){
	//Get player total
	var playersTotal = calculateTotal(playersHand, 'player');
	//Get dealer total
	var dealersTotal = calculateTotal(dealersHand, 'dealer');

	if(playersTotal > 21){
		console.log(playersTotal);
		//player had busted
		//Set a message somewhere that says this
		alert("Player BUST!!!");
		//$( ".alert" ).append( "<strong>Hello</strong>" );
		$('.bank-display').html('Bank: ' +playerBank + '<br>Bet: 0');
	} 
	else if(playersTotal == 21){
		alert('BLACKJACK!');
		playerBank += (((betAmount * 2)*2)-betAmount);
		$('.bank-display').html('Bank: ' +playerBank + '<br>Bet: 0');
	}
	else if(dealersTotal > 21){
		//dealer had busted
		//Set a message somewhere that says this
		alert("Dealer BUST!");
		//$( ".alert" ).append( "<strong>Dealer BUST!</strong>" );
		playerBank += (betAmount * 2);
		console.log(playerBank);
		$('.bank-display').html('Bank: ' +playerBank + '<br>Bet: 0');
	}
	else{ //neither player has more than 21
		if(playersTotal > dealersTotal){
			//Player won. Say this somewhere
			alert("The player has Won!!!");
			//$( ".alert" ).append( "<strong>The player has Won!!!</strong>" );
			playerBank += (betAmount * 2);
			$('.bank-display').html('Bank: ' +playerBank + '<br>Bet: 0');
			}

		else if(dealersTotal > playersTotal){
			//Dealer won. Say this somewher
			alert("The dealer Won!");
			$('.bank-display').html('Bank: ' +playerBank + '<br>Bet: 0');
		}
		else{
			//Push. (tie) Say this somewhere
			alert("PUSH!! We have a tie!!");
			$('.bank-display').html('Bank: ' + (playerBank + betAmount) + '<br>Bet: 0');
		}
	$('.hit-button').prop('disabled', true);
	$('.stand-button').prop('disabled', true);
	$('.deal-button').prop('disabled', true);
	}
	betAmount = 0;
	if(alert('Game Overr!')){}
	// else window.location.reload(); 
}
	


function placeCard(who, where, cardToPlace){
	var classSelector = '.' + who + '-cards .card-' + where;

	//write logic to fix the 11, 12, 13th card issue

	// $(classSelector).html(cardToPlace);
	$(classSelector).css({"background-Image": "url(images/PNG-cards-1.3/" + cardToPlace + ".png",
	 "background-size": "cover", "transition": "all 1s ease-in", "transform": "rotate(1080deg)"});
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
	var hasAce = false; // init ace as false
	for(var i = 0; i<hand.length; i++){
	cardValue = Number(hand[i].slice(0,-1));
		if((cardValue == 1) && ((total + 11) <= 21)){
			//This card is an ace, chech if eleven will fit. it not = 1
			cardValue = 11;
			hasAce = true;
		}
	// console.log(hand[i]);
	// console.log(cardValue);
		else if(cardValue > 10){
		cardValue = 10;
		}
		else if((cardValue + total > 21) && (hasAce)){
			total = total - 10;
			hasAce =false;
		}

	total += cardValue;
	}

	//update the html with the new total
	var elementToUpdate = '.' +whosTurn + '-total-number';
	$(elementToUpdate).text(total);
	return total;
}



