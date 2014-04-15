var utils = require('../../utils/utils');
// TODO: put all the key and token into secret_env_setting
var yelp = require("yelp").createClient({
  consumer_key: 'b4rGNZW_pS3pG2YsTiwrQA', 
  consumer_secret: 'zsiQKkyycyUAwz7q4W0WUCBG14E',
  token: 'c6kC2YFLE19BTy8PYMn8TGDAY80ck2A8',
  token_secret: '-lShccaeZ0QdfiWeTPejt6GuskM'
});

module.exports = function (webot) {
	webot.set('yelp command', {
		pattern: /^(yelp)\s*/i,
		handler: function(info) {
			info = utils.sanitizeInfo(info);
			info.wait('search_nearby_food');
			return utils.localizedText(webot,
    		{
     			'en_us' : 'Please send your location',
   				'zh_cn' : '请发送你的地理位置'
				});
		}
	});

	webot.waitRule('search_nearby_food', function(info, next){
    if (info.is('text') && utils.findCommand(info.text)) {
			console.log('Next Command is: '+info.text);
      next();
		} else if (info.is('location')) {
			var lat = info.param.lat;
			var lng = info.param.lng;
			yelp.search({term: 'food', ll: info.param.lat+','+info.param.lng, limit: '5'}, function(error, data) {
  			var data = data['businesses'];
  			var res = new Array();
  			for (var i = 0; i < data.length; i++) {
  				(function(i) {
  					var name = data[i]['name'];
  					var rating = data[i]['rating'];
  					var mobile_url = data[i]['mobile_url'];
  					var image_url = data[i]['image_url'];
  					var display_phone = data[i]['display_phone'];
  					var is_closed;
  					if (data[i]['is_closed']) is_closed = 'Closed';
  					else is_closed = 'Open';
  					var reply = {
  						title: name+' '+rating+'/5'+'\n'+display_phone+' '+is_closed,
  						pic: image_url,
  						url: mobile_url
  					};
  					res.push(reply);
  				})(i);
  			};
  			next(null, res);
			});
		} else {

		}	
	});
}
