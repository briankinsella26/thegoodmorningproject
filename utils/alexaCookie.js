/* jshint -W097 */
/* jshint -W030 */
/* jshint strict: false */
/* jslint node: true */
/* jslint esversion: 6 */

const alexaCookie = require("alexa-cookie2")

const config = {
    logger: console.log,
    amazonPage: 'amazon.co.uk',  // optional: possible to use with different countries, default is 'amazon.de'
    acceptLanguage: 'en-UK',   // optional: webpage language, should match to amazon-Page, default is 'de-DE'
    userAgent: '...',          // optional: own userAgent to use for all request, overwrites default one, should not be needed
    proxyOnly: true,           // optional: should only the proxy method be used? When no email/password are provided this will set to true automatically, default: false
    setupProxy: true,          // optional: should the library setup a proxy to get cookie when automatic way did not worked? Default false!
    proxyOwnIp: '...',         // required if proxy enabled: provide own IP or hostname to later access the proxy. needed to setup all rewriting and proxy stuff internally
    proxyPort: 3456,           // optional: use this port for the proxy, default is 0 means random port is selected
    proxyListenBind: '0.0.0.0',// optional: set this to bind the proxy to a special IP, default is '0.0.0.0'
    proxyLogLevel: 'info',      // optional: Loglevel of Proxy, default 'warn'
    baseAmazonPage: 'amazon.co.uk', // optional: Change the Proxy Amazon Page - all "western countries" directly use amazon.com! Change to amazon.co.jp for Japan
    amazonPageProxyLanguage: 'en_UK', // optional: language to be used for the Amazon Sign-in page the proxy calls. default is "de_DE")
    formerDataStorePath: '...', // optional: overwrite path where some of the formerRegistrationData are persisted to optimize against Amazon security measures
};


alexaCookie.generateAlexaCookie('kinsella.gill@gmail.com', 'ARiver2510',config, (err, result) => {
    console.log('RESULT: ' + err + ' / ' + JSON.stringify(result));
    if (result && result.csrf) {
        alexaCookie.stopProxyServer();
    }
});
