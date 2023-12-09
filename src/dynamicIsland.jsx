import React, { useState, useEffect } from "react";

function fixIsland() {
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [centerX, setCenterX] = useState(0);
    const [centerY, setCenterY] = useState(0);
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);

    useEffect(() => {
        const nav = document.getElementsByClassName("nav")[0];
        const content = nav.getElementsByClassName("content")[0];
        let computedContent;
        let contentLen;

        function resetStyle() {
            nav.style.transform = "";
            nav.style.height = "0px";
        }

        function tiltEffect() {
            if (isMouseOver) {
                const deltaScale = 15;
                const transformPhrase = `translate(${
                    (mouseX - centerX) / deltaScale
                }px, ${(mouseY - centerY) / deltaScale}px)`;
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

        const handleMouseEnter = () => {
            setIsMouseOver(true);
            nav.style.height = "150px";
            const rect = nav.getBoundingClientRect();
            const newCenterX = Math.round(rect.left + rect.width / 2);
            const newCenterY = Math.round(rect.top + rect.height / 2);
            setCenterX(newCenterX);
            setCenterY(newCenterY);
            requestAnimationFrame(tiltEffect);
        };

        const handleMouseLeave = () => {
            setIsMouseOver(false);
            nav.style.height = "0px";
            nav.style.transform = "";
        };

        const handleMouseMove = (event) => {
            setMouseX(event.clientX);
            setMouseY(event.clientY);
        };

        nav.addEventListener("mouseenter", handleMouseEnter);
        nav.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mousemove", handleMouseMove);

        return () => {
            nav.removeEventListener("mouseenter", handleMouseEnter);
            nav.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, [isMouseOver, centerX, centerY, mouseX, mouseY]);

    return <div className="nav">{/* JSX content here */}</div>;
}


export default fixIsland;
