var nav = document.getElementsByClassName("nav")[0];
var content = nav.getElementsByClassName("content")[0];
var computedContent;
var contentLen;
function frame() {
    computedContent = getComputedStyle(content);
    contentLen = content.clientWidth;
    nav.style.width = `${contentLen}px`;
    window.requestAnimationFrame(frame);
}
window.requestAnimationFrame(frame);
