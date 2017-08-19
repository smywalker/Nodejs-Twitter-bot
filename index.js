//A twitter bot that tells Zlatan Ibrahimovic quotes jokes.
var request = require('request');
var twit = require('twit');
var config = require('./config');
var T = new twit(config);

getData();
setInterval(getData, 1000*60*60);

//Get the joke.
function getData(){
    request({
        url:'https://api.chucknorris.io/jokes/random',
        json: true
    },Joke);
};
//callback function from request(when the data has been collected)
function Joke(error, response, body){
    var joke = body.value;
    var firstNames = ['Chuck','chuck','chuck.','Chuck.','Chuck!','chuck!'];
    var lastNames = ['Norris','norris','norris.','Norris.','Norris!','norris!',"Noriss'","noriss","Noriss'",'Noris','noris'];  
    var altOne = wordInString(joke, firstNames,'Zlatan');
    var altTwo = wordInString(altOne, lastNames,'Ibrahimovic');
    var altThree = wordInString(altTwo,["Chucks's","chucks's"],"Zlatans's");
    var altFour = wordInString(altThree,["Norris'","norris's"],"Ibrahimovic's");
    if (error) {
        console.log("There was an Error: "+ error);
    }
    postTweet(altFour);
};
//tweet the joke.
function postTweet(txt){
    var tweet = { status:txt};
    T.post('statuses/update', tweet, (error, data, response)=>{
        if(error){
            console.log("There was an Error: "+ error);
        }
    });
}
//replace characters
function wordInString(str, words, replacement){ 
    var rex = new RegExp( '\\b' + words.join('|') + '\\b','gi');
    return str.replace(rex, replacement);
}

