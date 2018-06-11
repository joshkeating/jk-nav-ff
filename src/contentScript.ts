import * as $ from "jquery";

let color: string;

// retrieve current link highlight color 
// chrome.storage.sync.get("currentColor", function (obj) {
//     color = obj.currentColor;
// });

function sendURL() {

    let pattern: string;
    browser.runtime.sendMessage({url: location.href}, function(response) {
        // the response that this recives should either be the data associated
        // with this site (it exists) or undefined/disabled.
        if (!response) {
            return;
        }
        
        // wait till DOM is fully loaded to execute
        $(document).ready(function() {
            pattern = response.pattern;
            let currentIndex: number = 0;
    
            let currentNode: HTMLElement;
    
            let allLinks = document.querySelectorAll(pattern) as NodeListOf<HTMLElement>;
            currentNode = allLinks[currentIndex];
            currentNode.style.backgroundColor = color;
            currentNode.focus();
    
            document.addEventListener("keypress", function onEvent(event) {
                let previousIndex: number = currentIndex;
                if (event.key === "j" && currentIndex < allLinks.length - 1) {

                    currentNode = allLinks[currentIndex+=1];
                    allLinks[previousIndex].style.backgroundColor = "inherit";
                    currentNode.style.backgroundColor = color;
                    currentNode.focus();
                }
                else if (event.key === "k" && currentIndex > 0) {
                    currentNode = allLinks[currentIndex-=1];
                    allLinks[previousIndex].style.backgroundColor = "inherit";
                    currentNode.style.backgroundColor = color;
                    currentNode.focus();
                }
            });

         });

      });
}

sendURL();