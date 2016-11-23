var app = angular.module('tvShowsApp', []);
		app.filter('dateFormat', function() {
		    return function(x) {
		    	if(typeof x != 'undefined'){
			        var length = x.length;
			        return x.substring(3, length-5);
		    	}else return "";
		    };
		});
		app.controller('tvShowsCtrl', function($scope, $http) {
			$scope.tvShowName = "Silicon Valley";
			$scope.updateTvShows = function() {
				var tvShowApiUrl = "http://www.omdbapi.com/?t="+$scope.tvShowName;
				$http.get(tvShowApiUrl+"&Season=1").then(function(response) {
					var urlCalls = [];
			          angular.forEach(response.data.Episodes, function(episodes) {
			            $http.get(tvShowApiUrl+"&Season=1&Episode="+episodes.Episode)
			            		.then(function(response) {
			            			urlCalls.push(response.data);
			            		});
			          });
			          $scope.allEpisodesData = urlCalls;
				});
			}
			$scope.updateTvShows();
			$scope.sortByColumn = function(x) {
				$scope.mySortByColumn = x;
			}
			$scope.deleteEpisode = function(episode){	
				var index = -1;		
				var allEpisodesDataArr = eval( $scope.allEpisodesData );
				for( var i = 0; i < allEpisodesDataArr.length; i++ ) {
					console.log(allEpisodesDataArr[i].Episode);
					if( allEpisodesDataArr[i].Episode === episode ) {
						index = i;
						break;
					}
				}
				if( index === -1 ) {
					//alert( "Something gone wrong" );
				}
				$scope.allEpisodesData.splice( index, 1 );		
			};
			$scope.setColor = function (episode) {
				if (episode.imdbRating >= 8.5) {
				    return { "background-color" : '#D0F9FA'};
				  }
			};
			$scope.calculateAverage = function(allEpisodesData){ 
				var avg = 0;
				if(typeof allEpisodesData != 'undefined'){
					var sum = 0;
					for(var i = 0; i < allEpisodesData.length; i++){
			    		sum += parseFloat(allEpisodesData[i].imdbRating);
			    	}
			    	avg = (sum/allEpisodesData.length).toFixed(2);
				}
			    return avg; 
			};
		});