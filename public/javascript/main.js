require.config({
	paths: {
		jquery: 'vendor/jQuery/2.0.3/jquery.min',
		finance: 'vendor/FinanceJs/finance',
		chart: 'vendor/ChartJs/Chart.min'
	}
});

require(
	[
	 	'app',
	],
	function(App) {
		App.initialize();
	}
);
