
 function handleClicks(): void {

    document.addEventListener("click", (e) => {

        // do this silly dance to tell TS that this will be an element
        let temp = (<Element>e.target).getAttribute("value");

        // set color based on clicked value
        browser.storage.local.set({currentColor: temp});
    
        // close the popup window
        window.close();
            
        // reloading is broken 
        // location.reload();
        // window.location.reload(true);
    
    });
 }

 handleClicks();



