define(['libs/savings-game/scenario'], function(scenario) {

	describe ("Scenario", function() {
		
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
});
