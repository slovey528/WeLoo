var weatherapi = require('../../utils/weatherapi');
var utils = require('../../utils/utils');
var moment_timezone = require('moment-timezone');
var celsius = '°C';
var fahrenheit = '°F';

module.exports = function(webot) {
	webot.set('current weather',{
  	description:'Use \'weather\' command to get waterloo weather infomation',
  	pattern: /^(weather)\s*/i,
  	handler: function(info, next){
  		info = utils.sanitizeInfo(info);
  		weatherapi.getjson('N2L3G1', function(data) {
        var data = data['data'];
        var current = data['current_condition'][0];
        var cur_temp = current['temp_C']+celsius+' / '+current['temp_F']+fahrenheit;
        var cur_desc = current['weatherDesc'][0]['value'];
        var cur_icon = current['weatherIconUrl'][0]['value'].replace('\\', '');
        var wearther_list = data['weather'];
        var res = new Array();
        for (var i = 1; i < wearther_list.length; i++) {
          (function(i){
            var today = wearther_list[i]
            var date = today['date']+':';
            var max = today['tempMaxC']+celsius+' / '+today['tempMaxF']+fahrenheit;
            var min = today['tempMinC']+celsius+' / '+today['tempMinF']+fahrenheit;
            var desc = today['weatherDesc'][0]['value'];
            var reply = [date+'\t'+desc, 'High: '+max+', '+'Low: '+min].join('\n');
            res.push(reply);
          })(i);
        };
        var ret = {
          title: [moment_timezone().tz('America/Toronto').format('MMMM Do YYYY, H:mm:ss'),
                  'Now: '+cur_temp].join('\n'),
          pic: cur_icon,
          url: 'http://www.theweathernetwork.com/weather/canada/ontario/waterloo',
          description: res.join('\n')
        };
		    next(null, ret);
  		});	
  	}
  });
}