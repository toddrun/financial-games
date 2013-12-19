define(['libs/savings-game/scenario'], function(scenario) {

	describe ("Scenario::generate", function() {
		
		it ("returns single values for 1 point", function() {
			var question = scenario.generate(1);
			assert.equal(1, question.investments.length);
			assert.equal(1, question.terms.length);
			
			var investment = question.investments[0];
			assert.ok(investment.amount);
			assert.ok(investment.rate);
			
			var term = question.terms[0];
			assert.ok(term);
		});
		
		it ("defaults to 1 point question", function() {
			var question = scenario.generate();
			assert.equal(1, question.investments.length);
			assert.equal(1, question.terms.length);
			
			var investment = question.investments[0];
			assert.ok(investment.amount);
			assert.ok(investment.rate);
			
			var term = question.terms[0];
			assert.ok(term);
		});
		
		it ("returns different investments each time", function() {
			var first = scenario.generate().investments[0];
			var second = scenario.generate().investments[0];
			var third = scenario.generate().investments[0];
			
			assert.ok(first.amount != second.amount 
					|| second.amount != third.amount);
			assert.ok(first.rate != second.rate 
					|| second.rate != third.rate);
		});
		

		it ("returns different terms each time", function() {
			var first = scenario.generate().terms[0];
			var second = scenario.generate().terms[0];
			var third = scenario.generate().terms[0];
			var fourth = scenario.generate().terms[0];
			var fifth = scenario.generate().terms[0];
			
			assert.ok(first != second 
					|| first != third 
					|| first != fourth 
					|| first != fifth);
		});
		
	});
	
	describe ("Scenario::evaluate", function() {
		
		it ('uses monthly compounding', function() {
			//Tests values from https://etax.dor.ga.gov/ptd/gcp/LGS_GCP_Review_of_Income_May_2010_Page_184_187.pdf
			//Can also use http://investor.gov/tools/calculators/compound-interest-calculator
			assert.equal(1.10, calculateValueOf(scenario, 1, 10, 1));
			assert.equal(1.08, calculateValueOf(scenario, 1, 8, 1));
			assert.equal(11047.13, calculateValueOf(scenario, 10000, 10, 1));
			assert.equal(10830.00, calculateValueOf(scenario, 10000, 8, 1));
		})
		
		it ('includes an answer for the each investment and term', function() {
			//1 dollar at 10% for 1 year
			var answers = scenario.evaluate(simplePuzzle(10000, 10, 30)).answers;
			assert.equal(1, answers.length);
			
			assert.equal(30, answers[0].term);
			assert.equal(198373.99, answers[0].value);
		});

		it ('includes yearly totals with term and value', function() {
			var totals = scenario.evaluate(simplePuzzle(10000, 10, 10)).totals;
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
			assert.equal(2, scenario.evaluate(simplePuzzle(5, 4, 1)).totals.length);
			assert.equal(4, scenario.evaluate(simplePuzzle(5, 4, 3)).totals.length);
			assert.equal(6, scenario.evaluate(simplePuzzle(5, 4, 5)).totals.length);
			assert.equal(18, scenario.evaluate(simplePuzzle(5, 4, 17)).totals.length);
		});
		
		it ('has an answer that equals the last total', function() {
			var solution = scenario.evaluate(simplePuzzle(15000, 5, 15));
			var answer = solution.answers[0];
			var lastTotal = solution.totals[15];
			assert.equal(answer.value, lastTotal.value);
			assert.equal(answer.term, lastTotal.term);
		});
	});
});

var calculateValueOf = function (scenario, amount, rate, term) {
	return scenario.evaluate(simplePuzzle(amount, rate, term)).answers[0].value;
}

var simplePuzzle = function(amount, rate, term){
	return {
		
		investments: [
		    {amount: amount, rate: rate}
		],
		terms: [term]
	};
};
