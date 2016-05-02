# Amazon Seller Feedback by rating

Extract the Link Amazon uses to generated the sidebar with the seller feedback (network tab of your browser), copy it and run:

```
npm install
// node index.js #rating (0 - 5) threshold, only ratings below will be shown in results# # #number of feedback pages# #feedback url#
node index.js 3 10 'http://www.amazon.de/gp/aag/ajax/paginatedFeedback.html?seller=AIKYB26CRDYA1&isAmazonFulfilled=0&isCBA=&marketplaceID=A1PA6795UKMFR9&asin=&ref_=aag_m_fb&&currentPage=12' // currentPage will be replaced automatically
```
