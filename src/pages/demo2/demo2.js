/* 
    global
    window: false,
    document: false
*/

function load() {
    const unitLength = 20;
    const colorR = 100;
    const colorG = 0;
    const colorB = 0;

    function createColor(r, g, b) {
        return `rgb(${r}, ${g}, ${b})`;
    }

    function drawHorizontalRow(ctx, nowW, nowH, pointX, pointY, limitW, limitH, startX) {
        while (nowW <= limitH && nowH <= limitH) {
            ctx.fillStyle = createColor(colorR, colorG + pointX / 2, colorB + pointY / 2);
            ctx.fillRect(pointX, pointY, unitLength * 2, unitLength);
            nowW = (nowW === startX) ? nowW + unitLength * 2 : nowW + unitLength;
            nowH += unitLength;
            pointX = nowW - unitLength;
            pointY = nowH;
        }
    }

    function drawHorizontal(ctx, totalW, totalH) {
        let startX = 0;
        let startY = 0;
        let nowW = startX;
        let nowH = startY;
        let pointX = startX;
        let pointY = startY;
        const limitW = totalW - unitLength;
        const limitH = totalH - unitLength;

        while (startY <= limitH) {
            nowW = 0;
            nowH = startY;
            pointX = 0;
            pointY = startY;
            drawHorizontalRow(ctx, nowW, nowH, pointX, pointY, limitW, limitH, startX);
            startY += unitLength * 4;
        }

        startX = unitLength * 4;
        while (startX <= limitW) {
            nowW = startX;
            nowH = 0;
            pointX = startX;
            pointY = 0;
            drawHorizontalRow(ctx, nowW, nowH, pointX, pointY, limitW, limitH, startX);
            startX += unitLength * 4;
        }
    }

    function drawVerticalRow(ctx, nowW, nowH, pointX, pointY, limitW, limitH, startY) {
        while (nowW <= limitW && nowH <= limitH) {
            ctx.fillStyle = createColor(colorR, colorG + pointX / 2, colorB + pointY / 2);
            ctx.fillRect(pointX, pointY, unitLength, unitLength * 2);
            nowW += unitLength;
            nowH = (nowH === startY) ? nowH + unitLength * 2 : nowH + unitLength;
            pointX = nowW;
            pointY = nowH - unitLength;
        }
    }

    function drawVertical(ctx, totalW, totalH) {
        let startX = 0;
        let startY = unitLength;
        let nowW = startX;
        let nowH = startY;
        let pointX = startX;
        let pointY = startY;
        const limitW = totalW - unitLength;
        const limitH = totalH - unitLength;

        while (startY <= limitH) {
            nowW = 0;
            nowH = startY;
            pointX = 0;
            pointY = startY;
            drawVerticalRow(ctx, nowW, nowH, pointX, pointY, limitW, limitH, startY);
            startY += unitLength * 4;
        }

        startX = unitLength * 3;
        startY = 0;
        while (startX <= limitH) {
            nowW = startX;
            nowH = 0;
            pointX = startX;
            pointY = 0;
            drawVerticalRow(ctx, nowW, nowH, pointX, pointY, limitW, limitH, startY);
            startX += unitLength * 4;
        }
    }

    function drawCanvas(id) {
        const canvas = document.getElementById(id);
        const ctx = canvas.getContext('2d');

        drawHorizontal(ctx, canvas.width, canvas.height);
        drawVertical(ctx, canvas.width, canvas.height);
    }

    drawCanvas('canvas');
}

window.onload = load;
