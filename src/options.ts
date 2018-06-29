
document.addEventListener("click", (e) => {
    
    function getColor() {
        let selectedColor = document.getElementById("popup-content").getAttribute("value");
        return selectedColor;
    }
    
    function setColor() {
        let currentColor: string = getColor();
        browser.storage.local.set({currentColor})
    }
    
    setColor();
});


 
