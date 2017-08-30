/* 
    global
    window: false
    document: false
*/ 

function load() {
    let canvasWidth;
    let canvasHeight;
    const margin = 50;
    const width = 500;
    const height = 50;
    const barColor = '#066';
    const fontColor = '#666';

    function drawFrame(ctx) {
        ctx.strokeStyle = barColor;
        ctx.strokeRect(margin, margin, width, height);
    }

    function drawProgressBar(ctx, percent) {
        const incrementWidth = width * percent / 100;
        ctx.fillStyle = barColor;
        ctx.fillRect(margin, margin, incrementWidth, height);
    }

    function calculatePercent(timestap) {
        const percent = timestap / 100;
        if (percent >= 100) return 100;
        return percent;
    }

    function drawFont(ctx, percent) {
        ctx.fillStyle = fontColor;
        ctx.font = '30px serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${Math.floor(percent)}%`, 300, 150);
    }

    function cleanCanvas(ctx) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    function createStep(ctx) {
        return function step(timestap) {
            const percent = calculatePercent(timestap);
            cleanCanvas(ctx);
            drawFrame(ctx);
            drawProgressBar(ctx, percent);
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
