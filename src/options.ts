
 
document.addEventListener("click", (e) => {

    // do this silly dance to tell TS that this will be an element
    let temp = (<Element>e.target).getAttribute("value");

    console.log(temp);
    // browser.storage.local.set({temp});
    browser.storage.local.set({currentColor: temp}); 

    // let url = beastNameToURL(e.target.textContent);
    // let activatedColor = e.target.value;

    // let option: Element = document.querySelector(temp);
    // console.log(option);

});

function getColor() {
    let selectedColor = document.getElementById("popup-content").getAttribute("value");
    return selectedColor;
}

function setColor() {
    let currentColor: string = getColor();
    browser.storage.local.set({currentColor})
}


