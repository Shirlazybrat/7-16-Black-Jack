#Black Jack Game using jQuery/Javascript, HTML, and CSS.

##The Javascript has three primary buttond: Deal, Hit and Stand.

<!-- ![Alt text](img/revelry4.png "Revelry Logo") -->


###A fun game app that harnessess the power of vanilla javascript and jQuery to create an interactive experience for the user as they try to win Blackjack!!! The dynamic display of the cards being dealt uses css transitions and the player is able to place bids, Hit and Stand in order to beat the computer during the game. Once a winner has been identified, the player may reset the game to play again as desired.

Visit here to play: [Black Jack](http://shirletterly.com/blackjack/)

##Built with:
	- Html
	- CSS
	- Javascript
	- jQuery 
	- Bootstrap

##Sample Code
###The following code was created to allow the player to place a bet before beginning the game. This calculation function will return the values of the players score depending on the win status and the score updates with each iteration of the game.
```javascript
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
```


####Early stages of game
![Alt text](imgages/screenshot.jpg "Early stages of game")

##Future Add-ons
- The ability for two players to play against each other.
- Clickable chips for placing bets with specific values.
- A UX/UI design that encourages player usage.


##Team Members from pair-programming
###Please visit our personal profiles to see our current projects.
- [Shirlette Chambers](https://github.com/Shirlazybrat)
- [Daniel Owen](https://github.com/daniel-owen)
- [Drew Wiley](https://github.com/drewwiley)
