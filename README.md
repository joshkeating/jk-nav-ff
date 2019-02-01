# jk-nav-ff

## What Does This Do?

#### _Because who likes moving the mouse anyway?_
For those fond of vim keybindings, this allows you to navigate select links using the `j` and `k` keys. This is intended to be used primarily on sites that feature lists of links. This means that it works particularly well on content aggregator sites like [Hacker News](https://news.ycombinator.com) or [Reddit](https://www.reddit.com/).

In the future I'd like to extend the functionality to include more keys on the homerow.


## Installation

#### Dependencies

 - Node
 - npm

#### Setup

 - Clone repository
 - Navigate to directory
 - Run the following commands:
```
npm install
npm run build
```

To add to Firefox as a temporary add-on:

1. open Firefox
2. enter `about:debugging` in the URL bar
3. click "Load Temporary Add-on"
4. open the extension's directory and select any file inside the extension.

The extension will be installed, and will stay installed until you restart Firefox. 

## How To Use It
 
 - Use the `j` and `k` keys to traverse through lists of links on selected sites.
 - Change the color of the selector in the options page.
 - Enable / disable on a site by site basis _(broken at the moment)_.
 
#### Currently Supported Sites

 These domains and their subdomains should all work.

 - Google: any search result.
 - [Hacker News](https://news.ycombinator.com)
 - [Reddit](https://www.reddit.com/)
 - [Ars Technica](https://arstechnica.com/)