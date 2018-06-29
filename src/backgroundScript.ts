
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

// set default link highlight color
browser.runtime.onInstalled.addListener(function() {
    browser.storage.local.set({currentColor: '#c6dafb'});    
});

// create array of sites
let allSites: Page[] = [];

allSites.push(new Page('https?://news\.ycombinator\.com\/.*', 'a.storylink', true));
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

// receives message from content script, decides how to respond
function handleMessage(request, sender, sendResponse) {

    if (checkSiteValid(request.url)) {
        let responseString: string = checkSiteValid(request.url);
        sendResponse({response: responseString});
    }
    return true;
  }
browser.runtime.onMessage.addListener(handleMessage)
