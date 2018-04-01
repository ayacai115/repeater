'use strict';

const Alexa = require('alexa-sdk');
const welcomePrompt = '倍返しへようこそ。なにか話しかけてくれたら、それを倍にして返します。';
const reprompt = 'なにか話しかけてくれたら、それを倍にして返します。';

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', welcomePrompt, reprompt);
    },
    'SentenceIntent': function () {
        var intent = this.event.request.intent;
        var any = intent && intent.slots && intent.slots.any && intent.slots.any.value
        this.emit(':ask', any.repeat(2), reprompt);
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', welcomePrompt, welcomePrompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit('AMAZON.StopIntent');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'ばいばーい');
    },
    'Unhandled': function () {
        const speechOutput = 'すみません。うまく理解できませんでした。なにか話しかけてくれたら、それを倍にして返します。';
        this.emit(':ask', speechOutput, reprompt);
    }
};
