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
        'I need to refill my drink.',
        'Get off my ice!'
    ].join('\n'), function (err, file) {
        console.log(report(file));
    });