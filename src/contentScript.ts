const color: string = '#c6dafb';
const potentialNumbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function sendURL() {

    browser.runtime.sendMessage({
        url: window.location.href
    }).then(handleResponse)

    // function that fires if this script receives a response from the background script
    function handleResponse(pattern) {
        if (pattern) {

            // grab url from passed response object
            let queryReadablePattern: string = pattern.response;

            // fires on load of all the DOM content
            document.addEventListener("DOMContentLoaded", function() {

                let currentIndex: number = 0;
                let currentNode: HTMLElement;
                let allLinks: NodeListOf<HTMLElement>;
                allLinks = document.querySelectorAll(queryReadablePattern);

                // focus first element in the list, apply color highlight
                currentNode = allLinks[currentIndex];
                currentNode.style.backgroundColor = color;
                currentNode.focus();
        
                let bufferFlag: boolean = false;

                document.addEventListener("keypress", function onEvent(event) {
                    let previousIndex: number = currentIndex;
                    let jumpAmount: number = 0;

                    function processSelection(): void {
                        allLinks[previousIndex].style.backgroundColor = "inherit";
                        currentNode.style.backgroundColor = color;
                        currentNode.focus();
                    }

                    // advanced navigation 
                    if (potentialNumbers.indexOf(parseInt(event.key)) > -1) {
                        bufferFlag = true;
                        jumpAmount = parseInt(event.key);

                        // create an listener for the second chord of the command
                        document.addEventListener("keypress", function onEvent(secondEvent) {

                            if (secondEvent.key === "j" && currentIndex < allLinks.length - jumpAmount) {
                                currentNode = allLinks[currentIndex+=jumpAmount];
                                processSelection();
                                bufferFlag = false;
                            }
                            else if (secondEvent.key === "k" && currentIndex > jumpAmount - 1) {
                                currentNode = allLinks[currentIndex-=jumpAmount];
                                processSelection();
                                bufferFlag = false;
                            }
                            // reset jump amount for next keypress
                            jumpAmount = 0;

                        });
                    }

                    // run only when j or k is not followed by a number to jump
                    if (bufferFlag == false) {

                        if (event.key === "j" && currentIndex < allLinks.length - 1) {
                            currentNode = allLinks[currentIndex+=1];
                            processSelection();
                        }
                        else if (event.key === "k" && currentIndex > 0) {
                            currentNode = allLinks[currentIndex-=1];
                            processSelection();
                        }
                    }

                });
    
             });
          
        } 
        return;
      }
}

sendURL();