/*
    global
    window: false
    document: false
*/ 

function load() {
    let canvasWidth;
    let canvasHeight;
    const circleX = 200;
    const circleY = 200;
    const circleRadius = 150;
    const progressColor = '#066';
    const fontColor = '#666';

    function drawFrame(ctx) {
        ctx.strokeStyle = progressColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.closePath();
    }

    function drawProgress(ctx, percent) {
        const incrementArc = Math.PI * 2 * percent / 100;
        ctx.strokeStyle = progressColor;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(circleX, circleY, circleRadius, 0, incrementArc, false);
        ctx.stroke();
        ctx.closePath();
    }

    function drawFont(ctx, percent) {
        ctx.fillStyle = fontColor;
        ctx.textAlign = 'center';
        ctx.font = '40px serif';
        ctx.fillText(`${Math.floor(percent)}%`, circleX, circleY);
    }

    function cleanCanvas(ctx) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    function calculatePercent(timestap) {
        const percent = timestap / 100;
        if (percent >= 100) return 100;
        return percent;
    }

    function createStep(ctx) {
        return function step(timestap) {
            const percent = calculatePercent(timestap);
            cleanCanvas(ctx);
            drawFrame(ctx);
            drawProgress(ctx, percent);
            drawFont(ctx, percent);
            if (percent >= 100) return;
            window.requestAnimationFrame(createStep(ctx));
        };
    }

    function drawCanvas(id) {
        const canvas = document.getElementById(id);
        const ctx = canvas.getContext('2d');

        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        window.requestAnimationFrame(createStep(ctx));
    }

    drawCanvas('canvas');
}

window.onload = load;
