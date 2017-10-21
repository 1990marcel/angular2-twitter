const request = require('request');
const config = require('./config');

functions = {
    authorize: function(req, res) {
        const header = config.consumerkey + ':' +config.consumersecret;
        const encheader = new Buffer(header).toString('base64');
        const finalheader = 'Basic ' + encheader;
        
        request.post('https://api.twitter.com/oauth2/token', {form: {'grant_type': 'client_credentials'}, 
        headers: {Authorization: finalheader}}, function(error, response, body) {
            if(error)
            console.log(error);
            else {
                config.bearertoken = JSON.parse(body).access_token;
                
                res.json({success: true, data:config.bearertoken});
            }
            
        })
    },

    search: function(req, res) {
        const searchquery = req.body.query;
        const encsearchquery = encodeURIComponent(searchquery);
        const bearerheader = 'Bearer ' + config.bearertoken;
        request.get('https://api.twitter.com/1.1/search/tweets.json?q=' + encsearchquery +
         '&result_type=recent', {headers: {Authorization: bearerheader}}, function(error, body, response) {
             if(error)
             console.log(error);
             else {
                 res.json({success: true, data:JSON.parse(body.body)});
             }
         })
    }
}
module.exports = functions;