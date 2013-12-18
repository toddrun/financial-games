;(function() {
	
	var Scenario = function() {
		var years = [3, 5, 10, 15, 20, 30];
		
		var createInvestment = function() {
			var amount = getRandomInt(1, 50) * 1000;
			var rate = getRandomInt(2, 12);
			rate += getRandomInt(0, 3) * .25;
			
			return {
				amount: amount,
				rate: rate
			}
		}
		
		var createTerm = function() {
			return years[getRandomInt(1, years.length) - 1];
		}

		var getRandomInt = function(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		};
			
		var generate = function(points) {
			//points are ignored for now
			var investment = createInvestment();
			var term = createTerm();
			
			return {
				investments: [investment],
				terms: [term]
			};
		};
		
		return {
			generate: generate
		};
	};
	
	if (typeof define !== "undefined") {
		define([], function() {
			return new Scenario();
		});
	} 
	
}());