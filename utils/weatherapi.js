function WeatherApi() {
  // always initialize all instance properties
  this.host = 'http://api.worldweatheronline.com/free/v1/weather.ashx?q=';
  this.condition = '&format=json&extra=isDayTime&num_of_days=5&key=';
  // this.token = process.env.WEATHER_API_TOKEN;
  this.token = 'tnmbjf8txf7q52pf3bbq4fp8';
  this.rest = require('restler');
}

// class methods
WeatherApi.prototype.getjson = function(postcode, cb) {
	var url = this.host+postcode+this.condition+this.token;
	this.rest.get(url).on('complete', function(data) {
    cb(data);
  });
};

// export the class
module.exports = new WeatherApi();