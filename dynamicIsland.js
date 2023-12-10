// CSS
const styleElement = document.createElement("style");
styleElement.textContent = `
* {
    margin: 0;
    padding: 0;
}

nav {
    --roundness: 26px;
    --padding: 10px;
    width: 100vw;
    height: 15px;
    display: flex;
    padding-top: 2vh;
    justify-content: center;
    position: fixed;
}

nav * {
    transition: all 0.5s ease;
}

.nav {
    background: black;
    overflow: hidden;
    border-radius: calc( var(--roundness) + var(--padding) );
    min-width: 170px;
    min-height: 50px;
    padding: var(--padding);
    transition: transform 0s none;
}

.nav:hover {
    scale: 1.03;
}

.nav .innerNav {
    width: 100%;
    height: 100%;
    border-radius: var(--roundness);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.nav .content {
    position: relative;
    display: inline-block;
    padding: 3px;
    color: white;
    white-space: nowrap;
}
`;
document.head.appendChild(styleElement);

window.onload = function() {

    // HTML
    let navElement = document.getElementsByTagName("nav")[0];
    const oldInnerHtml = navElement.innerHTML;
    const newInnerHtml = `<div class=\"nav\"><div class=\"innerNav\"><div class=\"content\">${oldInnerHtml}</div></div></div>`;
    navElement.innerHTML = newInnerHtml;

    // JS

    let nav = document.getElementsByClassName("nav")[0];
    let content = nav.getElementsByClassName("content")[0];
    let isMouseOver = false;
    let centerX;
    let centerY;
    let mouseX;
    let mouseY;

    function resetStyle() {
        nav.style.transform = "";
        nav.style.height = "0px";
    }

    function sizeControl() {
        var contentWidth = content.clientWidth;
        var contentHeight = content.clientHeight;
        nav.style.width = `${contentWidth}px`;
        nav.style.height = `${contentHeight}px`;
        window.requestAnimationFrame(sizeControl);
    }
    window.requestAnimationFrame(sizeControl);

    // tile effect

    function tiltEffect() {
        if (isMouseOver) {
            const deltaScale = 18.0;
            var transformPhrase = `translate(${ ( mouseX - centerX ) / deltaScale }px, ${ ( mouseY - centerY ) / deltaScale }px)`;
            nav.style.transform = transformPhrase; 
            requestAnimationFrame(tiltEffect);
        }
    }

    nav.addEventListener("mouseenter", () => {
        isMouseOver = true;
        var rect = nav.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
        requestAnimationFrame(tiltEffect);
    });

    nav.addEventListener("mouseleave", () => {
        isMouseOver = false;
        resetStyle();
    });

    document.addEventListener("mousemove", function(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

};

