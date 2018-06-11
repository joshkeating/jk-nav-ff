
class Page {

    private urlRegex: string;
    private selector: string;
    private enabled: boolean;

    constructor(urlRegex: string, selectors: string, enabled: boolean) {
        this.urlRegex = urlRegex;
        this.selector = selectors;
        this.enabled = enabled;
    }

    getUrl() {
        return this.urlRegex;
    }

    getSelectors() {
        return this.selector;
    }

    getEnabled() {
        return this.enabled;
    }

    setEnabled(isEnabled: boolean) {
        this.enabled = isEnabled;
    }
}

// Future goals and notes
// ====================================================
// TODO: toggle activation of extension through popup
// TODO: allow editing of default sites through options page
// TODO: allow addition of new pages and rules through options page
// TODO: add Page array data into synced storage
// ====================================================

// chrome.runtime.onInstalled.addListener(function(obj) {
//     chrome.storage.sync.set({'currentColor': '#c6dafb'}, function() {});
// });


// create array of sites
let allSites: Page[] = [];
allSites.push(new Page('https?://news\.ycombinator\.com\/.*', '.storylink', true));
allSites.push(new Page('^https?://(www\.)?google\.([a-z\.]+)\/(?!reader\/).*$', 'h3.r > a', true));
allSites.push(new Page('https?://(www\.)?reddit\.com\/.*', '#siteTable div.entry a.title', true));
allSites.push(new Page('https?://arstechnica\.com\/.*', 'h2 > a', true));


// determines if given url should be acted on
function checkSiteValid(url: string): string {
    for (let index = 0; index < allSites.length; index++) {
        const element: Page = allSites[index];
        let regex: RegExp = new RegExp(element.getUrl(), 'i');
        if (regex.test(url)) {
            return element.getSelectors();
        }
    }
    return null;
}

function handleMessage(message, sender, response) {
    // return browser.bookmarks.search({
    //   url: message.url
    // }).then(function(results) {
    //   return results.length > 0;
    // });

    if (checkSiteValid(message.url)) {

        let responseString: string = checkSiteValid(message.url);
        response({pattern: responseString});
    }
    return true;
  }

browser.runtime.onMessage.addListener(handleMessage)


// Listener keeps the event page open until not needed
// browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    
//     if (checkSiteValid(request.url)) {

//         // show page icon if site is valid
//         // chrome.pageAction.show(sender.tab.id);

//         let responseString: string = checkSiteValid(request.url);
//         sendResponse({pattern: responseString});

//         // // TODO: handle toggle of the site
//         // send url over to popup
//         // chrome.runtime.sendMessage({thisSite: allSites[getSite(request.url)]});
//         // if (request.cmd == 'toggle') {
//         //     allSites[getSite(request.url)].setEnabled(request.enabled);
//         //     chrome.runtime.sendMessage({temp: allSites[getSite(request.url)].getEnabled()});
//         //     chrome.tabs.executeScript(request.url, {code: 'location.reload()'}, function() {});
//         // } else {
//         //     let responseString: string = checkSiteValid(request.url);
//         //     sendResponse({pattern: responseString});
//         // }
        
//     }
//     return true;
// });
