var next = document.getElementsByClassName("next")[0];
var i = 0;
var tests = document.getElementsByClassName('test');
Array.from(tests).forEach(test => {
    test.style.display = "none";
});
tests[i].style.display = "block";

function testsDisplay() {
    var tests = document.getElementsByClassName('test');
    Array.from(tests).forEach(test => {
        test.style.display = "none";
    });
    tests[i].style.display = "block";
    window.requestAnimationFrame(testsDisplay);
}
window.requestAnimationFrame(testsDisplay);

next.addEventListener("click", () => {
    i++;
    if (i >= tests.length) {
        i = 0;
    }
});
