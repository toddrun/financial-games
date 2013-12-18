//Borrowed from https://github.com/karlbright/requirejs-mocha-chai-bootstrap/blob/master/scripts/SpecRunner.js

require.config({
	baseUrl: '../public/javascript/',
	paths: {
		finance: 'vendor/FinanceJs/finance',
		require: 'vendor/RequireJs/require',
		mocha: 'vendor/Mocha/mocha',
		chai: 'vendor/Chai/chai'
	}
});

require(['require', 'chai', 'mocha'], function(require, chai) {
	 assert = chai.assert;
	 should = chai.should();
	 expect = chai.expect;
	 
	 mocha.setup('bdd');
	 
	 require([
	          './savings-game/scenario_test.js'
	          ],
	     function() {
		 	mocha.run();
	 	 }
	 );	 
	
});
