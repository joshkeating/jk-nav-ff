
 function handleClicks(): void {

    document.addEventListener("click", (e) => {

        // do this silly dance to tell TS that this will be an element
        let temp = (<Element>e.target).getAttribute("value");
    
        console.log(temp);
        // browser.storage.local.set({temp});
        browser.storage.local.set({currentColor: temp});
    
        window.close();
            
        // reloading is broken 
        // location.reload();
        // window.location.reload(true);
    
    });
 }

 handleClicks();



