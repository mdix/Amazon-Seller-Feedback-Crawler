const $         = require('jquery')(require('jsdom').jsdom().defaultView);
const request   = require('request');
const encoding  = require("encoding");

const NUMBER_OF_FEEDBACK_PAGES = 123;
const SHOW_RATINGS_BELOW       = 3;
var rawFeedbackUrl = process.argv.slice(2)[0];
rawFeedbackUrl = rawFeedbackUrl.split('currentPage')[0] + 'currentPage=%%PAGE%%';
var currentPage = 1;

const interval = setInterval(() => {
    if (currentPage >= NUMBER_OF_FEEDBACK_PAGES + 1) {
        clearInterval(interval);
        return false;
    }

    handleRequest(parseInt(currentPage));

    currentPage++;
}, 200);

function handleRequest(currentPage) {
    request.get({encoding: null, url: rawFeedbackUrl.replace('%%PAGE%%', currentPage)}, (err, resp, markup) => {
        if (err) return console.log(err);
        markup = encoding.convert(markup, 'UTF-8', 'ISO-8859-15').toString();

        if ($(markup).find('title').html('Bot Check')) {
            return console.log('Caught by Amazons bot check. Quitting.');
        }

        $(markup).each((i, e) => {
            if (parseInt($(e).find('.feedback-num').text()[0]) < 3) {
                console.log(
                    ($(e).find('.feedback-comment').text()) + $(e).find('.feedback-rater-date').text() + ' (on page #' + currentPage + ')'
                );
            }
        });
    });
}

