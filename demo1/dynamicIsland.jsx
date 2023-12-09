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

function tiltEffect() {
	if (isMouseOver) {
		console.log(centerX, centerY);
		console.log(mouseX, mouseY);
        const deltaScale = 15
        var transformPhrase = `translate(${ ( mouseX - centerX ) / deltaScale }px, ${ ( mouseY - centerY ) / deltaScale }px)`;
        console.log(transformPhrase);
        nav.style.transform = transformPhrase; 
		requestAnimationFrame(tiltEffect);
	}
}

function sizeControl() {
	computedContent = getComputedStyle(content);
	contentLen = content.clientWidth;
	nav.style.width = `${contentLen}px`;
	window.requestAnimationFrame(sizeControl);
}
window.requestAnimationFrame(sizeControl);

nav.addEventListener("mouseenter", () => {
	isMouseOver = true;
    nav.style.height = "150px";
	var rect = nav.getBoundingClientRect();
	centerX = Math.round(rect.left + rect.width / 2);
    centerY = Math.round(rect.top + rect.height / 2);
	requestAnimationFrame(tiltEffect);
});

nav.addEventListener("mouseleave", () => {
	isMouseOver = false;
    nav.style.height = "0px";
    nav.style.transform = ""; 
});

document.addEventListener("mousemove", function(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
});
