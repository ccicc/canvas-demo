/*  
    global
    window: false,
    Path2D: false,
    document: false
*/

import './demo1.scss';

window.onload = function load() {
    const margin = 50;
    const padding = 30;
    const width = 400;
    const height = width;
    const circleRadius = width * 1 / 3 / 2 - padding;

    function drawChessboard(ctx) {
        ctx.strokeRect(margin, margin, width, height);
        ctx.beginPath();
        ctx.moveTo(margin, margin + height * 1 / 3);
        ctx.lineTo(margin + width, margin + height * 1 / 3);
        ctx.moveTo(margin, margin + height * 2 / 3);
        ctx.lineTo(margin + width, margin + height * 2 / 3);
        ctx.moveTo(margin + width * 1 / 3, margin);
        ctx.lineTo(margin + width * 1 / 3, margin + height);
        ctx.moveTo(margin + width * 2 / 3, margin);
        ctx.lineTo(margin + width * 2 / 3, margin + height);
        ctx.stroke();
    }

    function createCircle() {
        const circle = new Path2D();
        circle.arc(margin + width / 6, margin + height / 6, circleRadius, 0, Math.PI * 2, true);
        return circle;
    }

    function createCross() {
        const cross = new Path2D();
        cross.moveTo(margin + padding, margin + padding);
        cross.lineTo(width * 1 / 3 + margin - padding, height * 1 / 3 + margin - padding);
        cross.moveTo(margin + padding, height * 1 / 3 + margin - padding);
        cross.lineTo(width * 1 / 3 + margin - padding, margin + padding);
        return cross;
    }

    function resetStatus(ctx) {
        ctx.restore();
        ctx.save();
    }

    function drawPieces(ctx) {
        const circle = createCircle();
        const cross = createCross();

        ctx.save();
        ctx.translate(width / 3, height / 3);
        ctx.stroke(cross);
        resetStatus(ctx);
        ctx.stroke(circle);
        resetStatus(ctx);

        ctx.translate(0, height / 3);
        ctx.stroke(circle);
        resetStatus(ctx);

        ctx.translate(0, height * 2 / 3);
        ctx.stroke(cross);
        resetStatus(ctx);

        ctx.translate(width / 3, 0);
        ctx.stroke(circle);
        resetStatus(ctx);

        ctx.translate(width * 2 / 3, 0);
        ctx.stroke(cross);
        resetStatus(ctx);

        ctx.translate(width * 2 / 3, height / 3);
        ctx.stroke(circle);
        resetStatus(ctx);

        ctx.translate(width / 3, height * 2 / 3);
        ctx.stroke(circle);
    }

    function drawCanvas(id) {
        const ctx = document.querySelector(id).getContext('2d');
        drawChessboard(ctx);
        drawPieces(ctx);
    }

    drawCanvas('canvas');
};
