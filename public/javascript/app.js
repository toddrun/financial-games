

define (['jquery', 'finance', 'chart'], function($, finance, chart) {
	
	var years = [3, 5, 10, 15, 20, 30];
	
	var initialize = function() {
		$(document).ready(function() {
			
			var dollars = getRandomInt(1, 50) * 1000;
			var percent = getRandomInt(2, 12);
			percent += getRandomInt(1, 4) * .25;
			var term = years[getRandomInt(1, years.length) - 1];
			
			
			
			var value = finance.calculateAccruedInterest(dollars, percent, term);
			value += dollars;
			var formattedValue = finance.format(value, 'USD');
			 
			$('#initialinvestment').html(finance.format(dollars, 'USD'));
			$('#interestrate').html(percent);
			$('#term').html(term);
			
			$('#calcanswer').val(formattedValue);
			
			var valueArray = [0, value];
			var data = {
					labels: ['', term],
					datasets : [
								{
									fillColor : "rgba(220,220,220,0.5)",
									strokeColor : "rgba(220,220,220,1)",
									pointColor : "rgba(220,220,220,1)",
									pointStrokeColor : "#fff",
									data : valueArray
								}
					]								
					/*labels : ["","1","2","3","4","5","6"],
					 datasets : [
						{
							fillColor : "rgba(220,220,220,0.5)",
							strokeColor : "rgba(220,220,220,1)",
							pointColor : "rgba(220,220,220,1)",
							pointStrokeColor : "#fff",
							data : [0,1,2,4,6,9,12]
						},
						{
							fillColor : "rgba(151,187,205,0.5)",
							strokeColor : "rgba(151,187,205,1)",
							pointColor : "rgba(151,187,205,1)",
							pointStrokeColor : "#fff",
							data : [0, 1, 2, 3, 4, 5, 6]
						}
					]*/
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
			
		});
	};
	
	var getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};
		
	return {
		initialize: initialize
	}
	
});