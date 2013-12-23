define(['libs/savings-game/puzzle'], function(puzzle) {

	describe ("Puzzle::generate", function() {
		
		it ("returns single values for 1 point", function() {
			var question = puzzle.generate(1);
			assert.equal(1, question.investments.length);
			assert.equal(1, question.terms.length);
			
			var investment = question.investments[0];
			assert.ok(investment.amount);
			assert.ok(investment.rate);
			
			var term = question.terms[0];
			assert.ok(term);
		});
		
		it ("defaults to 1 point question", function() {
			var question = puzzle.generate();
			assert.equal(1, question.investments.length);
			assert.equal(1, question.terms.length);
			
			var investment = question.investments[0];
			assert.ok(investment.amount);
			assert.ok(investment.rate);
			
			var term = question.terms[0];
			assert.ok(term);
		});
		
		it ("returns different investments each time", function() {
			var first = puzzle.generate().investments[0];
			var second = puzzle.generate().investments[0];
			var third = puzzle.generate().investments[0];
			
			assert.ok(first.amount != second.amount 
					|| second.amount != third.amount);
			assert.ok(first.rate != second.rate 
					|| second.rate != third.rate);
		});
		

		it ("returns different terms each time", function() {
			var first = puzzle.generate().terms[0];
			var second = puzzle.generate().terms[0];
			var third = puzzle.generate().terms[0];
			var fourth = puzzle.generate().terms[0];
			var fifth = puzzle.generate().terms[0];
			
			assert.ok(first != second 
					|| first != third 
					|| first != fourth 
					|| first != fifth);
		});
		
	});
	
	describe ("Puzzle::solve", function() {
		
		it ('uses monthly compounding', function() {
			//Tests values from https://etax.dor.ga.gov/ptd/gcp/LGS_GCP_Review_of_Income_May_2010_Page_184_187.pdf
			//Can also use http://investor.gov/tools/calculators/compound-interest-calculator
			assert.equal(1.10, calculateValueOf(puzzle, 1, 10, 1));
			assert.equal(1.08, calculateValueOf(puzzle, 1, 8, 1));
			assert.equal(11047.13, calculateValueOf(puzzle, 10000, 10, 1));
			assert.equal(10830.00, calculateValueOf(puzzle, 10000, 8, 1));
		})
		
		it ('includes an answer for the each investment and term', function() {
			//1 dollar at 10% for 1 year
			var answers = puzzle.solve(simplePuzzle(10000, 10, 30)).answers;
			assert.equal(1, answers.length);
			
			assert.equal(30, answers[0].term);
			assert.equal(198373.99, answers[0].value);
		});

		it ('includes yearly totals with term and value', function() {
			var totals = puzzle.solve(simplePuzzle(10000, 10, 10)).totals;
			assert.ok(totals, "should have totals");
			assert.equal(11, totals.length);
			
			assert.equal(0, totals[0].term, 'term');
			assert.equal(10000, totals[0].value, 'val');
			assert.equal(1, totals[1].term);
			assert.equal(11047.13, totals[1].value);
			assert.equal(5, totals[5].term);
			assert.equal(16453.09, totals[5].value);
			assert.equal(10, totals[10].term);
			assert.equal(27070.41, totals[10].value);
		});
		
		it ('includes yearly totals for the length of the term, include initial investment', function() {
			assert.equal(2, puzzle.solve(simplePuzzle(5, 4, 1)).totals.length);
			assert.equal(4, puzzle.solve(simplePuzzle(5, 4, 3)).totals.length);
			assert.equal(6, puzzle.solve(simplePuzzle(5, 4, 5)).totals.length);
			assert.equal(18, puzzle.solve(simplePuzzle(5, 4, 17)).totals.length);
		});
		
		it ('has an answer that equals the last total', function() {
			var solution = puzzle.solve(simplePuzzle(15000, 5, 15));
			var answer = solution.answers[0];
			var lastTotal = solution.totals[15];
			assert.equal(answer.value, lastTotal.value);
			assert.equal(answer.term, lastTotal.term);
		});
	});
	
	describe("Puzzle::score", function() {
		
		//6,000 @ 3.25 for 3 years = 6663.25
		//Gain = 663.25; 10% = 66.325; 5% = 33.1625
		
		it ("awards 1.25 for exact answer", function() {
			//6,000 @ 3.25 for 3 years = 6613.25
			var question = simplePuzzle(6000, 3.25, 3);

			var exact = puzzle.score(question, [{term: 3, value: 6613}]);
			assert.equal(1.25, exact);
			assert.ok(puzzle.score(question, [{term: 3, value: 6610}, "lower"]) < exact, "Lower guess should award fewer points");
		});

		it ("awards less points as guess gets higher", function() {
			var question = simplePuzzle(6000, 3.25, 3);

			var exact = puzzle.score(question, [{term: 3, value: 6613}]);
			var first = puzzle.score(question, [{term: 3, value: 6623}]);
			var second = puzzle.score(question, [{term: 3, value: 6633}]);
			var third = puzzle.score(question, [{term: 3, value: 6643}]);
			assert.ok(first < exact);
			assert.ok(second < first);
			assert.ok(third < second);
		});

		it ("awards less points as guess gets lower", function() {
			var question = simplePuzzle(6000, 3.25, 3);

			var exact = puzzle.score(question, [{term: 3, value: 6613}]);
			var first = puzzle.score(question, [{term: 3, value: 6603}]);
			var second = puzzle.score(question, [{term: 3, value: 6593}]);
			var third = puzzle.score(question, [{term: 3, value: 6583}]);
			assert.ok(first < exact);
			assert.ok(second < first);
			assert.ok(third < second);
		});
		
		it ("doesn't award points if guess is more than .25% of the actual gain", function() {
			var question = simplePuzzle(6000, 3.25, 3);
			
			var gain = 613;
			var offset = 613 * .25;
			
			var above = 6613 + offset;
			var below = (6613 - offset) + 1;
			
			assert.equal(0, puzzle.score(question, [{term: 3, value: above}]));
			assert.equal(0, puzzle.score(question, [{term: 3, value: below}]));

			assert.ok(0 < puzzle.score(question, [{term: 3, value: above - 1}]));
			assert.ok(0 < puzzle.score(question, [{term: 3, value: below + 1}]));
		});
		
		
	});
});

var calculateValueOf = function (puzzle, amount, rate, term) {
	return puzzle.solve(simplePuzzle(amount, rate, term)).answers[0].value;
}

var simplePuzzle = function(amount, rate, term){
	return {
		
		investments: [
		    {amount: amount, rate: rate}
		],
		terms: [term]
	};
};
