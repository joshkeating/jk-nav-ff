
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
allSites.push(new Page('https?://news\.ycombinator\.com\/.*', 'a.storylink', true));
allSites.push(new Page('^https?://(www\.)?google\.([a-z\.]+)\/(?!reader\/).*$', 'h3.r > a', true));
allSites.push(new Page('https?://(www\.)?reddit\.com\/.*', '#siteTable div.entry a.title', true));
allSites.push(new Page('https?://arstechnica\.com\/.*', 'h2 > a', true));


// determines if given url should be acted on
function checkSiteValid(url: string): string {
    console.log('entered chk site valid');  // DEBUG
    for (let index = 0; index < allSites.length; index++) {
        const element: Page = allSites[index];
        let regex: RegExp = new RegExp(element.getUrl(), 'i');
        if (regex.test(url)) {

            console.log(element.getSelectors());  // DEBUG

            return element.getSelectors();
        }
    }
    return null;
}

function handleMessage(request, sender, sendResponse) {

    if (checkSiteValid(request.url)) {
        let responseString: string = checkSiteValid(request.url);
        sendResponse({response: responseString});
    }
    return true;
  }
browser.runtime.onMessage.addListener(handleMessage)
