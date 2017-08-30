
var cheerio = require('cheerio');
var Horseman = require('node-horseman');
var horseman = new Horseman();
var vicroads_url = 'https://www.vicroads.vic.gov.au/registration/buy-sell-or-transfer-a-vehicle/buy-a-vehicle/check-vehicle-registration/vehicle-registration-enquiry'
// Open form and submit enquire for `rego`
function getInfo(rego) {
    horseman
      .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
      .open(vicroads_url)
      .type('#registration-number-ctrl input[type=text]', rego)
      .click('.btn-holder input')
      .waitForSelector('.ctrl-holder.ctrl-readonly')
      .html()
      .then(function(body) {
        console.log(body);
        console.log(processInfo(body, rego));
        return horseman.close();
      });
}

// Scrape the results for key info
function processInfo(html, rego) {
    var $ = cheerio.load(html);
    var vehicle = $('label.label').filter(function() {
      return $(this).text().trim() === 'Vehicle:';
    }).next().text().trim();

    var stolen = $('label.label').filter(function() {
      return $(this).text().trim() === 'Stolen status:';
    }).next().text().trim();

    var registration = $('label.label').filter(function() {
      return $(this).text().trim() === 'Registration status & expiry date:';
    }).next().text().trim();

    var engine = $('label.label').filter(function() {
      return $(this).text().trim() === 'Engine number:';
    }).next().text().trim();

    var reg_serial_number = $('label.label').filter(function() {
      return $(this).text().trim() === 'Registration serial number:';
    }).next().text().trim();

    return {
        rego,
        vehicle,
        stolen,
        registration,
        engine,
        reg_serial_number
    };
}


module.exports = {
  getInfo,
}