import * as $ from "jquery";

let color: string = '#c6dafb';

// retrieve current link highlight color 
// chrome.storage.sync.get("currentColor", function (obj) {
//     color = obj.currentColor;
// });

function sendURL() {

    browser.runtime.sendMessage({
        url: window.location.href
    }).then(handleResponse)

    
    function handleResponse(pattern) {
        if (pattern) {
            let queryReadablePattern: string = pattern.response;
            $(document).ready(function() {


                let currentIndex: number = 0;
                let currentNode: HTMLElement;
                // console.log(document.querySelector('a.storylink'));
                
                let allLinks: NodeListOf<HTMLElement>;
                allLinks = document.querySelectorAll(queryReadablePattern);

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


}

sendURL();