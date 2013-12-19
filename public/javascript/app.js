

define ([
         'jquery', 'finance', 'chart', 'libs/savings-game/scenario'
         ], function($, finance, chart, scenario) {
	
	var years = [3, 5, 10, 15, 20, 30];
	var puzzle = null;
	
	var buildYears = function(solution) {
		years = [];
		solution.totals.forEach(function (total) {
			years.push(total.term);
		});
		return years;
	};
	
	var buildValues = function(solution) {
		values = [];
		solution.totals.forEach(function (total) {
			values.push(total.value);
		});
		return values;
	};
	
	var initialize = function() {
		$(document).ready(function() {
			puzzle = scenario.generate();
			
			var investment = puzzle.investments[0];
			var dollars = investment.amount;
			var percent = investment.rate;
			var years = puzzle.terms[0];
			
			$('#initialinvestment').html(finance.format(dollars, 'USD'));
			$('#interestrate').html(percent);
			$('#years').html(years);
			
			$('#submit').on('click', processGuess);
			
			/*
			$('#calcanswer').val(formattedValue);
			
			var yearLabels = buildYears(solution);
			var valuePoints = buildValues(solution);
			
			var data = {
					labels: yearLabels,
					datasets : [
								{
									fillColor : "rgba(152,251,152,0.5)",
									strokeColor : "rgba(0,128,0,1)",
									pointColor : "rgba(0,128,0,1)",
									pointStrokeColor : "#fff",
									data : valuePoints
								}
					]
				};
			
			var options = {
					
					//Interpolated JS string - can access value
					scaleLabel : "<%=value%>",
					
					//String - Scale label font declaration for the scale label
					scaleFontFamily : "'Arial'",
					
					//Number - Scale label font size in pixels	
					scaleFontSize : 12,
					
					//String - Scale label font weight style	
					scaleFontStyle : "normal",
					
					//String - Scale label font colour	
					scaleFontColor : "#666",	
					
					///Boolean - Whether grid lines are shown across the chart
					scaleShowGridLines : true,
					
					//String - Colour of the grid lines
					scaleGridLineColor : "rgba(0,0,0,.05)",
					
					//Number - Width of the grid lines
					scaleGridLineWidth : 1,	
					
					//Boolean - Whether the line is curved between points
					bezierCurve : false, //true,
					
					//Boolean - Whether to show a dot for each point
					pointDot : true,
					
					//Number - Radius of each point dot in pixels
					pointDotRadius : 8,
					
					//Number - Pixel width of point dot stroke
					pointDotStrokeWidth : 5,
					
					//Boolean - Whether to show a stroke for datasets
					datasetStroke : true,
					
					//Number - Pixel width of dataset stroke
					datasetStrokeWidth : 2,
					
					//Boolean - Whether to fill the dataset with a colour
					datasetFill : true,
					
					//Boolean - Whether to animate the chart
					animation : true,

					//Number - Number of animation steps
					animationSteps : 60,
					
					//String - Animation easing effect
					animationEasing : "easeOutQuart",

					//Function - Fires when the animation is complete
					onAnimationComplete : null
					
				}
			
			var ctx = $("#chart").get(0).getContext("2d");
			var myNewChart = new Chart(ctx).Line(data, options);
			*/
		});
	};
	
	var processGuess = function(solution) {

		var solution = scenario.evaluate(puzzle);
		
		var value = solution.answers[0].value;
		var formattedValue = finance.format(value, 'USD');
		 
		var guess = $('#guess').val();
		//TODO: Strip out $ and ,
		var formattedGuess = finance.format(guess, 'USD');
		if (formattedGuess === '$NaN') {
			guess = 0;
			formattedGuess = finance.format(guess, 'USD');
		}
		
		$('#answer').html(formattedGuess);
		$('#actual').html(formattedValue);
		$('#difference').html(finance.format(guess - value, 'USD'));
		
		var yearLabels = buildYears(solution);
		var valuePoints = buildValues(solution);
		
		var data = {
				labels: yearLabels,
				datasets : [
							{
								fillColor : "rgba(152,251,152,0.5)",
								strokeColor : "rgba(0,128,0,1)",
								pointColor : "rgba(0,128,0,1)",
								pointStrokeColor : "#fff",
								data : valuePoints
							}
				]
			};
		
		var options = {
				
				//Interpolated JS string - can access value
				scaleLabel : "<%=value%>",
				
				//String - Scale label font declaration for the scale label
				scaleFontFamily : "'Arial'",
				
				//Number - Scale label font size in pixels	
				scaleFontSize : 12,
				
				//String - Scale label font weight style	
				scaleFontStyle : "normal",
				
				//String - Scale label font colour	
				scaleFontColor : "#666",	
				
				///Boolean - Whether grid lines are shown across the chart
				scaleShowGridLines : true,
				
				//String - Colour of the grid lines
				scaleGridLineColor : "rgba(0,0,0,.05)",
				
				//Number - Width of the grid lines
				scaleGridLineWidth : 1,	
				
				//Boolean - Whether the line is curved between points
				bezierCurve : false, //true,
				
				//Boolean - Whether to show a dot for each point
				pointDot : true,
				
				//Number - Radius of each point dot in pixels
				pointDotRadius : 8,
				
				//Number - Pixel width of point dot stroke
				pointDotStrokeWidth : 5,
				
				//Boolean - Whether to show a stroke for datasets
				datasetStroke : true,
				
				//Number - Pixel width of dataset stroke
				datasetStrokeWidth : 2,
				
				//Boolean - Whether to fill the dataset with a colour
				datasetFill : true,
				
				//Boolean - Whether to animate the chart
				animation : true,

				//Number - Number of animation steps
				animationSteps : 60,
				
				//String - Animation easing effect
				animationEasing : "easeOutQuart",

				//Function - Fires when the animation is complete
				onAnimationComplete : null
				
			}
		
		var ctx = $("#chart").get(0).getContext("2d");
		var myNewChart = new Chart(ctx).Line(data, options);
	}
	
	var getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};
		
	return {
		initialize: initialize
	}
	
});