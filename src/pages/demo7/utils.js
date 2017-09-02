/*
    global
    document: false
*/

/* eslint-disable */ 
// 计算鼠标在某元素内的坐标值
function calculateCoorInElement(originCoor, element) {
    // 页面坐标系
    let x;
    let y;

    if (originCoor.pageX || originCoor.pageY) {
        x = originCoor.pageX;
        y = originCoor.pageY;
    } else {
        x = originCoor.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = originCoor.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    // 元素坐标系
    return {
        x: x - element.offsetLeft,
        y: y - element.offsetTop,
    };
}

// 封装获取元素内鼠标坐标值
const utils = {
    mouseInited: false,
    touchInited: false,
    mouse: {
        x: null,
        y: null,
        isPressed: false,
    },
    touch: {
        x: null,
        y: null,
        isPressed: false,
    },

    captureMouse(element) {
        if (this.mouseInted) return this.mouse;

        element.addEventListener('mousedown', () => {
            this.mouse.isPressed = true;
            return null;
        });

        element.addEventListener('mouseup', () => {
            this.mouse.isPressed = false;
            return null;
        });

        element.addEventListener('mousemove', (event) => {
            const elementCoor = calculateCoorInElement(event, event.target);
            this.mouse.x = elementCoor.x;
            this.mouse.y = elementCoor.y;
        });

        this.mouseInited = true;
        return this.mouse;
    },

    captureTouch(element) {
        if (this.touchInited) return this.touch;

        element.addEventListener('touchstart', () => {
            this.touch.isPressed = true;
            return null;
        });

        element.addEventListener('touchend', () => {
            this.touch.isPressed = false;
            return null;
        });

        element.addEventListener('touchmove', (touchEvent) => {
            const touch = touchEvent.touches[0];
            const elementCoor = calculateCoorInElement(touch, touch.target);

            this.touch.x = elementCoor.x;
            this.touch.y = elementCoor.y;
        });

        this.touchInited = true;
        return this.touch;
    },
};

export default utils;
