'use strict';

const Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        const speechOutput = 'リピーターへようこそ。何回繰り返しますか？';
        const reprompt = '何回繰り返しますか？';
        this.emit(':ask', speechOutput, reprompt);
    },
    'SentenceIntent': function () {
  var intent = this.event.request.intent;
        var times = intent && intent.slots && intent.slots.times && intent.slots.times.value;
        var any = intent && intent.slots && intent.slots.any && intent.slots.any.value
        var times_int = Number(times)
        if (times == null){
            this.emit(':tell', '何回かわかりませんでした。');
        } else {
            this.emit(':tell', any + 'を' + times + '回ですね。わかりました。' + any.repeat(times_int));
        }
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = 'リピーターへようこそ。何回繰り返しますか？';
        this.emit(':ask', speechOutput, speechOutput);
    },
    'AMAZON.CancelIntent': function () {
        this.emit('AMAZON.StopIntent');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'ばいばーい');
    },
    'Unhandled': function () {
        const speechOutput = 'すみません。うまく理解できませんでした。';
        const reprompt = 'もう一度おっしゃってください。';
        this.emit(':ask', speechOutput, reprompt);
    }
};


