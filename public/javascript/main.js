require.config({
	paths: {
		jquery: 'vendor/jQuery/2.0.3/jquery.min',
		jqueryui: 'vendor/jQuery/ui.1.10.3.min/jquery-ui.min',
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
