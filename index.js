'use strict';

const Alexa = require('alexa-sdk');
const welcomePrompt = '倍返しへようこそ。話しかけると、それを倍にして返します。なにか話しかけてみてください。';
const reprompt = '話しかけると、それを倍にして返します。なにか話しかけてみてください。';

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
        this.emit(':ask', any.repeat(2) + '。次はなにを倍返ししましょうか？', '次はなにを倍返ししましょうか？');
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', welcomePrompt, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit('AMAZON.StopIntent');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'ばいばーい');
    },
    'Unhandled': function () {
        const speechOutput = 'すみません。うまく理解できませんでした。話しかけると、それを倍にして返します。なにか話しかけてみてください。';
        this.emit(':ask', speechOutput, reprompt);
    }
};
