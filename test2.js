var retext = require('retext');
var styleguide = require('./index');
var report = require('vfile-reporter');

retext()
    .use(styleguide)
    .process([
        'I love using Liquid.',
        'I love using liquid.',
        'I\'m on the Shopify unlimited Plan',
        'I\'m on the Shopify Unlimited plan',
        'I\'m on the Shopify UnLimited plan',
        'I love Shopify point of sale',
        'I love shopify point of sale',
        'Unfortunately, I need to e.g. customise my drink',
        'Oops, I need to Customise my drink with the shopify manual',
        '!'
    ].join('\n'), function (err, file) {
        console.log(report(file));
    });