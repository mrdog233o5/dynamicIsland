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
