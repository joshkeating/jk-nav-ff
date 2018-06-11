import * as $ from "jquery";

let color: string;

// retrieve current link highlight color 
// chrome.storage.sync.get("currentColor", function (obj) {
//     color = obj.currentColor;
// });

function sendURL() {

    
    function handleResponse(pattern: string) {
        if (pattern) {

            $(document).ready(function() {

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
          
        } 

        return;
      }
      
    let pattern: string;
    let url: string = window.location.href;

    browser.runtime.sendMessage({
        url: window.location.href
    }).then(handleResponse)

}

sendURL();