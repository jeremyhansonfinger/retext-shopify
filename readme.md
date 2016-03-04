# retext-styleguide

Warn about Shopify style guide violations with [**retext**](https://github.com/wooorm/retext).

**retext-styleguide** is a ruleset for [**rory**](https://github.com/Shopify/rory), a command-line linter that can be added into your text editor with [**linter-rory**](https://github.com/Shopify/linter-rory).

## Installation

This package is automatically installed as a dependency of [**rory**](https://github.com/Shopify/rory).

## Contributing

Content rules are written in `script/content.yml`, which is processed by `extract.js` into a JSON object.

### Content rules

The rule set is a list of simple word matches (for now) written in YAML with the following format:

```
- type: simple
  note: [reason for the error]
  incorrect: [word(s) to flag as incorrect]
  correct: [word(s) to suggest as a correction]
```

For example:

```
- type: simple
  note: avoid unnecessarily wordy phrases
  incorrect: due to the fact that
  correct: because
```

For the `note`, use a short, imperative phrase explaining the error. Don't capitalize it and don't add punctuation at the end.

The `incorrect` or `correct` items can be arrays:

```
- type: simple
  note: use 'have', not 'of'
  incorrect:
    - could of
    - should of
    - would of
  correct:
    - could have
    - should have
    - would have
```

### Updating rules

1. Clone this repo to your local machine and `cd` into its folder.
2. Create a branch for your changes (`git checkout -b rule-list-update`).
2. Open `script/content.yml` in a text editor.
3. Make your changes to the rule list.
4. Save `content.yml`.
5. Run `npm run-script build-extract` from the repository root to regenerate the JSON word list.
6. Run `git push origin your-branch-name` to create a pull request with your changes.
