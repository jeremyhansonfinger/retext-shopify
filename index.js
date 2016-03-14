/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module retext:styleguide
 * @fileoverview Check phrases for simpler alternatives.
 */

'use strict';

/* eslint-env commonjs */

/*
 * Dependencies.
 */

var keys = require('object-keys');
var difference = require('array-differ');
var nlcstToString = require('nlcst-to-string');
var quotation = require('quotation');
var search = require('nlcst-search');
var patterns = require('./data/index.json');

/*
 * List of all phrases.
 */

var list = keys(patterns);

/**
 * Attacher.
 *
 * @param {Retext} processor
 *   - Instance.
 * @param {Object?} [options]
 *   - Configuration.
 * @param {Array.<string>?} [options.ignore]
 *   - List of phrases to *not* warn about.
 * @return {Function} - `transformer`.
 */
    function attacher(processor, options) {
    var ignore = (options || {}).ignore || [];
    var phrases = difference(list, ignore);

    /**
     * Search `tree` for validations.
     *
     * @param {Node} tree - NLCST node.
     * @param {VFile} file - Virtual file.
     */
    function transformer(tree, file) {
        search(tree, phrases, function (match, position, parent, phrase) {
            var pattern = patterns[phrase];
            var replace = pattern.replace;
            var matchedString = nlcstToString(match);
            var value = quotation(nlcstToString(match), '“', '”');
            var message = undefined;

            if (!replace.length) {
                message = 'Remove ' + value;
           }
            
            else if (pattern.cased && matchedString == replace){
                message = "Matched " + value + ", but that is wrong because it is exactly the same as \"" + replace + ".\"";
            }
            
            else if (pattern.cased && matchedString !== replace){
                message = "Matched " + value + ". Write as \"" + replace + ".\"";
            }

            else if (!pattern.cased && matchedString !== replace){
                message = "Matched " + value + ". Write as \"" + replace + ".\"";
            }         
         
           if (message)
            message = file.warn(message, {
                'start': match[0].position.start,
                'end': match[match.length - 1].position.end
            });

            message.ruleId = phrase;
            message.source = 'retext-simplify';
        });
            }


    return transformer;
}

/*
 * Expose.
 */

module.exports = attacher;

console.log(list);
