var utils = require('../../utils/utils');
// TODO: put all the key and token into secret_env_setting
var yelp = require("yelp").createClient({
  consumer_key: 'b4rGNZW_pS3pG2YsTiwrQA', 
  consumer_secret: 'zsiQKkyycyUAwz7q4W0WUCBG14E',
  token: 'c6kC2YFLE19BTy8PYMn8TGDAY80ck2A8',
  token_secret: '-lShccaeZ0QdfiWeTPejt6GuskM'
});

var rearrangePhoneNum = function(phone) {
  var phone_list = phone.split('-');
  var new_phone = '('+phone_list[1]+')'+phone_list[2]+'-'+phone_list[3];
  return new_phone;
};

module.exports = function (webot) {
	webot.set('yelp command', {
		pattern: /^(yelp)\s*/i,
		handler: function(info) {
			info = utils.sanitizeInfo(info);
			info.wait('search_nearby_food');
      var reply =  {
        title: utils.localizedText(webot,
          {
            'en_us' : 'Please Send Your Location',
            'zh_cn' : '请发送你的地理位置'
          }),
        pic: utils.localizedText(webot,
          {
            'en_us' : 'http://i.imgur.com/s8h5Bu8.jpg?2',
            'zh_cn' : 'http://i.imgur.com/Dv7zpbq.jpg?1'
          })
      }
			return reply;
		}
	});

	webot.waitRule('search_nearby_food', function(info, next){
    if (info.is('text')) {
      info = utils.sanitizeInfo(info);
      if (utils.findCommand(info.text)) {
        console.log('Next Command is: '+info.text);
        next();
      }
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
  					var display_phone = rearrangePhoneNum(data[i]['display_phone']);
  					var reply = {
  						title: name+'\nRating: '+rating+' / 5'+'\nCell: '+display_phone,
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
