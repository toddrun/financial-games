;(function() {
	
	var Scenario = function(finance) {
		var years = [3, 5, 10, 15, 20, 30];
		
		//Creates array with single simple investment with random values
		var createInvestment = function() {
			var amount = getRandomInt(1, 50) * 1000;
			var rate = getRandomInt(2, 12);
			rate += getRandomInt(0, 3) * .25;
			
			return {
				amount: amount,
				rate: rate
			}
		}
		
		//Creates array with single values from "years"
		var createTerm = function() {
			return years[getRandomInt(1, years.length) - 1];
		}

		var getRandomInt = function(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		};
			
		var round = function(value) {
			return Math.round(value * 100) / 100
		}
		
		//Generates a new puzzle with investments and terms
		var generate = function(points) {
			//points are ignored for now
			var investment = createInvestment();
			var term = createTerm();
			
			return {
				investments: [investment],
				terms: [term]
			};
		};
		
		//Provides solution to a puzzle
		var evaluate = function(puzzle) {
			var investments = puzzle.investments;
			var terms = puzzle.terms;
			
			var answers = [];
			var totals = [{term: 0, value: 0}];
			
			investments.forEach(function (investment) {
				var amount = investment.amount;
				var rate = investment.rate;
				totals[0].value = totals[0].value + amount;

				terms.forEach(function (term) {
					var monthlyRate = rate / 12 / 100;
					var months = term * 12;
					var futureValue = amount;
					
					for ( i = 1; i <= months; i++ ) {
						futureValue = futureValue * (1 + monthlyRate);
						if (i % 12 == 0) {
							var year = i/12;
							if (!totals[year]) {
								totals.push({term: year, value: 0});
							}
							totals[year].value = totals[year].value + round(futureValue);
						}
					}
					
					answers.push(
						{term: term, value: round(futureValue)}
					);
				});
			});
			
			return {
				answers: answers,
				totals: totals
			}
		};
		
		return {
			generate: generate,
			evaluate: evaluate
		};
	};
	
	if (typeof define !== "undefined") {
		define(['finance'], function(finance) {
			return new Scenario(finance);
		});
	} 
	
}());