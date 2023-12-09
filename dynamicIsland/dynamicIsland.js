window.onload = function() {

    // HTML
    let navElement = document.getElementsByTagName("nav")[0];
    const oldInnerHtml = navElement.innerHTML;
    const newInnerHtml = `<div class=\"nav\"><div class=\"innerNav\"><div class=\"content\">${oldInnerHtml}</div></div></div>`;
    navElement.innerHTML = newInnerHtml;

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
        padding: 0px 10px;
        color: white;
        white-space: nowrap;
    }
    `;
    document.head.appendChild(styleElement);


    // JS

    var nav = document.getElementsByClassName("nav")[0];
    var content = nav.getElementsByClassName("content")[0];
    var computedContent;
    var contentLen;
    var isMouseOver = false;
    var centerX;
    var centerY;
    var mouseX;
    var mouseY;

    function resetStyle() {
        nav.style.transform = "";
        nav.style.height = "0px";
    }

    function sizeControl() {
        computedContent = getComputedStyle(content);
        contentLen = content.clientWidth;
        nav.style.width = `${contentLen}px`;
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
