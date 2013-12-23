;(function() {
	
	var Puzzle = function(finance) {
		var years = [3, 5, 10, 15, 20, 30];
		
		//Creates array with single simple investment with random values
		var _createInvestment = function() {
			var amount = _getRandomInt(1, 50) * 1000;
			var rate = _getRandomInt(2, 12);
			rate += _getRandomInt(0, 3) * .25;
			
			return {
				amount: amount,
				rate: rate
			}
		}
		
		//Creates array with single values from "years"
		var _createTerm = function() {
			return years[_getRandomInt(1, years.length) - 1];
		}

		var _getRandomInt = function(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		};
			
		var _round = function(value) {
			return Math.round(value * 100) / 100
		}
		
		//Generates a new puzzle with investments and terms
		var generate = function(points) {
			//points are ignored for now
			var investment = _createInvestment();
			var term = _createTerm();
			
			return {
				investments: [investment],
				terms: [term]
			};
		};
		
		//Provides solution to a puzzle
		var solve = function(puzzle) {
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
							totals[year].value = totals[year].value + _round(futureValue);
						}
					}
					
					answers.push(
						{term: term, value: _round(futureValue)}
					);
				});
			});
			
			return {
				answers: answers,
				totals: totals
			};
		};
		
		var score = function(puzzle, guess) {
			var solution = solve(puzzle);
			if (guess[0].value) {
				var guess = guess[0].value;
				var actual = solution.answers[0].value;
				var initial = puzzle.investments[0].amount;
				var actualGain = actual - initial;
				var guessedGain = guess - initial;
				
				var difference = Math.abs(guessedGain - actualGain);
				var differentPercent = difference / actualGain;
				
				var deduction = differentPercent / .25;
				var maxAllowed = deduction < .50 ? 1.25 : 1
				
				var points = maxAllowed - deduction;
				if (points < 0) {
					return 0;
				}
				points = Math.round(100 * points);
				points = points.toFixed(2) / 100;
				
				return points;
			}
			return 0;
		};

		return {
			generate: generate,
			solve: solve,
			score: score
		};
	};
	
	if (typeof define !== "undefined") {
		define(['finance'], function(finance) {
			return new Puzzle(finance);
		});
	} 
	
}());