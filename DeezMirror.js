(function() {
  angular.module('mirror', ['ngAnimate'])

  .controller('weather', function($http, $scope, $interval) {

      var weatherURL,
        lat,
        lon,
        city,
        state;
   
  function weatherUpdate(){ 
    var currentDate = new Date(),
   n = currentDate.getDay(),
          days = ["Sun", "Mon", "Tu", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tu", "Wed", "Thu", "Fri", "Sat"];

        $scope.day1 = days[n+1];
        $scope.day2 = days[n+2];
        $scope.day3 = days[n+3];
        $scope.day4 = days[n+4];
        $scope.day5 = days[n+5];
    $http.get('http://api.ipinfodb.com/v3/ip-city/?key=86be52d35c2a9476eae382805a6161756a0b2fd47514dcb31121e889bf4c53b5&format=json').success(function(data) {
      $scope.city = data.cityName;
        lat = data.latitude;
        lon = data.longitude;
        weatherURL = 'https://api.forecast.io/forecast/c760978036a761dc66bf1a05e6958a09/' + lat + "," + lon + '?callback=JSON_CALLBACK';
        $http.jsonp(weatherURL).success(function(forecast) {
          $scope.current = Math.round(forecast.currently.temperature) + '°';
          $scope.todayicon = {
            forecast: {
            icon: forecast.currently.icon,
            iconSize: 60,
            color: "white"
        }
          };
          $scope.icon1 = {
            forecast: {
            icon: forecast.daily.data[1].icon,
            iconSize: 30,
            color: "white"
        }
          };
          $scope.tempMax1 = Math.round(forecast.daily.data[1].temperatureMax)+'°';
          $scope.tempMin1 = Math.round(forecast.daily.data[1].temperatureMin)+'°';
          $scope.icon2 = {
            forecast: {
            icon: forecast.daily.data[2].icon,
            iconSize: 30,
            color: "azure"
        }
          };
          $scope.tempMax2 = Math.round(forecast.daily.data[2].temperatureMax)+'°';
          $scope.tempMin2 = Math.round(forecast.daily.data[2].temperatureMin)+'°';
          $scope.icon3 = {
            forecast: {
            icon: forecast.daily.data[3].icon,
            iconSize: 30,
            color: "azure"
        }
          };
          $scope.tempMax3 = Math.round(forecast.daily.data[3].temperatureMax)+'°';
          $scope.tempMin3 = Math.round(forecast.daily.data[3].temperatureMin)+'°';
          $scope.icon4 = {
            forecast: {
            icon: forecast.daily.data[4].icon,
            iconSize: 30,
            color: "gray"
        }
          };
          $scope.tempMax4 = Math.round(forecast.daily.data[4].temperatureMax)+'°';
          $scope.tempMin4 = Math.round(forecast.daily.data[4].temperatureMin)+'°';
          $scope.icon5 = {
            forecast: {
            icon: forecast.daily.data[5].icon,
            iconSize: 30,
            color: "gray"
        }
          };
          $scope.tempMax5 = Math.round(forecast.daily.data[5].temperatureMax)+'°';
          $scope.tempMin5 = Math.round(forecast.daily.data[5].temperatureMin)+'°';
          
        })
      });
                          }
    $interval(function() {
        weatherUpdate();
      console.log('weather updated');
      }, 120000);
      weatherUpdate();
    })
    .controller('compliments', function($http, $scope, $interval) {

      var d = new Date,
        morning = ['Do you see that bamboo? Aint nothing like bamboo. Bless Up.', 'Lion', 'They dont want you to have an amazing breakfast.', 'All the great ones jet ski.', 'The key is to be honest. Be honest but dont play yourself.', 'Some people cant handle winning. I can.', 'Bless up. Egg whites turkey bacon hashbrowns water.', 'They dont want you to wear the Saint Laurent fur.'],
        midday = ["Bless up. don't play yourself.", "Cocoa Butter is the key", "", "They wanna come stress me out. Bye.", "The key to more sucess is to have a lot of pillows.", "They never said winning was easy", "The key is never be afraid of being yourself.", "Lion", "They dont want you to have a Rolls Royce. I promise.", "The key to success is to have a hammock", "Egg whites chicken sausage water.They dont want you to eat."],
        afternoon = ['Be a star. Be a superstar.', 'To make it through the jungle youre gonna have to sweat.', "Its not an easy road but give thanks to the road.", "Bless Up.", "I love my bamboo trees. I love fruits. I love apples.", "Lion", "So pretty!", "I remember when I aint have a jacuzzi."],
        night = ["They dont want you to excercise.", "Another one.", "Lion.", "The key is never fold.", "They dont want you to be healthy.", "Its important to use cocoa butter."],
        lateNight = ["Bless up.", "The other day the grass was brown. Now its green cause I aint give up. Never surrender.", "I got a star fruit tree. Star fruit is one of my favorite fruits.", "Lion.", "Major key. Get a manicure and pedicure once a week.", "They dont want you to have lunch.", "Bless up. Dont play yourself.", "The key is to stay clean at all times."];

      function compliments() {
        function quoteGen(arr) {
          var random = arr[Math.floor(Math.random() * arr.length)];
          $scope.compliment = random;
        }
        if ((d.getHours() >= 4) && (d.getHours() < 10)) {
          quoteGen(morning);
        }
        if ((d.getHours() >= 10) && (d.getHours() < 18)) {
          quoteGen(midday);
        }
        if ((d.getHours() >= 18) && (d.getHours() < 20)) {
          quoteGen(afternoon);
        }
        if ((d.getHours() >= 20) && (d.getHours() < 22)) {
          quoteGen(night);
        } else if ((d.getHours() >= 22) || (d.getHours() < 4)) {
          quoteGen(lateNight);
        }
      }
      $interval(function() {
        compliments();
      }, 120000);
      compliments();
    })
    .controller('calendar', function($http, $scope, $interval) {
      function updateTime() {
        var currentDate = new Date(),
          realTime,
          currentSec = currentDate.getSeconds(),
          currentMillisec = currentDate.getMilliseconds(),
          currentMin = currentDate.getMinutes(),
          currentHr = currentDate.getHours(),
          n = currentDate.getDay(),
          days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        $scope.date = currentDate;

        $scope.day = days[n];
        if (currentHr == 00) { //if midnight (00 hours) hour = 12
          currentHr = 12;
        } else if (currentHr >= 13) { //convert military hours at and over 1300 (1pm) to regular hours by subtracting 12. 
          currentHr -= 12;
        }
        if (currentMin < 10) {
          currentMin = "0" + currentMin;
        }
        if (currentDate.getHours() < 12) {
          realTime = currentHr + ':' + currentMin + " am";
        } else {
          realTime = currentHr + ':' + currentMin + " pm";
        }
        return realTime;

      }
      $interval(function() {
        $scope.time = updateTime();
      }, 1000);

    })
    .controller('news', function($http, $scope, $interval, $animate) {

      function newsUpdate() {
        $http.get("https://www.reddit.com/r/news/.json").success(function(data) {

          var random = Math.floor(Math.random() * 25);

          $scope.headline = data.data.children[random].data.title;
        });
      }
      newsUpdate();
      var count = 0;
      $interval(function() {
        newsUpdate();
      }, 30000);

      $scope.$watch('headline', function(newValue, oldValue) {
        if (newValue !== oldValue) {

          count += 1;
          /*console.log("data changed " + count + " time(s)"); */

        }
      })
    })
    .directive("skycon", function() {
      return {
        restrict: "E",
        replace: true,
        scope: {
          icon: "=",
          size: "=",
          animated: "=",
          color: "="
        },
        link: function(scope, element, attrs) {

          // make a canvas for our icon
          var canvas = document.createElement("canvas");

          // set the CSS class from attribute
          if (!attrs.class) {
            canvas.className = "";
          } else {
            canvas.className = attrs.class;
          }

          // set default color if "color" attribute not present
          var config = {
            color: scope.color || "white"
          };

          var skycons = new Skycons(config);

          // watch the size property from the controller
          scope.$watch("size", function(newVal, oldVal) {
            if (newVal) {
              canvas.height = newVal;
              canvas.width = newVal;
            } else {
              canvas.height = scope.size || 64;
              canvas.width = scope.size || 64;
            }
          }, true);

          // add the animation
          skycons.add(canvas, scope.icon);

          // watch the icon property from the controller for changes
          scope.$watch("icon", function() {
            skycons.set(canvas, scope.icon);
          }, true);

          // watch the color property from the controller for changes
          scope.$watch("color", function() {
            skycons.color = scope.color;
          }, true);

          if (scope.animated === "false" || scope.animated === false) {
            skycons.pause();
          } else {
            skycons.play();
          }

          if (element[0].nodeType === 8) {
            element.replaceWith(canvas);
          } else {
            element[0].appendChild(canvas);
          }

          scope.$on("$destroy", function() {
            skycons.remove(canvas);
            if (skycons.list.length === 0) {
              skycons.pause(canvas);
            }
          });
        }
      };
    });

})();