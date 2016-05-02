const $         = require('jquery')(require('jsdom').jsdom().defaultView);
const request   = require('request');
const encoding  = require("encoding");

const NUMBER_OF_FEEDBACK_PAGES = 123;
const SHOW_RATINGS_BELOW       = 3;
var rawFeedbackUrl = 'http://www.amazon.de/gp/aag/ajax/paginatedFeedback.html?seller=AIKYB26CRDYA1&isAmazonFulfilled=0&isCBA=&marketplaceID=A1PA6795UKMFR9&asin=&ref_=aag_m_fb&&currentPage=12';
rawFeedbackUrl = rawFeedbackUrl.split('currentPage')[0] + 'currentPage=%%PAGE%%';
var currentPage = 1;

const interval = setInterval(() => {
    if (currentPage >= NUMBER_OF_FEEDBACK_PAGES + 1) {
        clearInterval(interval);
        return false;
    }

    handleRequest(parseInt(currentPage));

    currentPage++;
}, 100);

function handleRequest(currentPage) {
    request.get({encoding: null, url: rawFeedbackUrl.replace('%%PAGE%%', currentPage)}, (err, resp, feedbackRows) => {
        if (err) return console.log(err);
        feedbackRows = encoding.convert(feedbackRows, 'UTF-8', 'ISO-8859-15').toString();

        $(feedbackRows).each((i, e) => {
            if (parseInt($(e).find('.feedback-num').text()[0]) < SHOW_RATINGS_BELOW) {
                console.log(
                    ($(e).find('.feedback-comment').text()) + $(e).find('.feedback-rater-date').text() + ' (on page #' + currentPage + ')'
                );
            }
        });
    });
}

