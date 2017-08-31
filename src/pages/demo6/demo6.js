/*
    global
    window: false
    document: false
*/

const ball = {
    x: 250,
    y: 20,
    vx: 5,
    vy: 2,
    radius: 20,
    color: '#066',
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    },
};

function load() {
    let canvasWidth = 0;
    let canvasHeight = 0;
    let raf = null;
    let running = false;

    function ballAnimation(ctx) {
        ball.draw(ctx);
        ball.x += ball.vx;
        ball.y += ball.vy;
        ball.vy *= 0.99;
        ball.vy += 0.2;
        if (ball.x + ball.vx + ball.radius >= canvasWidth || ball.x + ball.vx <= ball.radius) {
            ball.vx = -ball.vx;
        }
        if (ball.y + ball.vy + ball.radius >= canvasHeight || ball.y + ball.vy <= ball.radius) {
            ball.vy = -ball.vy;
        }
    }

    function cleanCanvas(ctx) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    function createStep(ctx) {
        return function step() {
            cleanCanvas(ctx);
            ballAnimation(ctx);
            raf = window.requestAnimationFrame(createStep(ctx));
        };
    }


    function drawCanvas(id) {
        const canvas = document.getElementById(id);
        const ctx = canvas.getContext('2d');
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;

        canvas.addEventListener('mousemove', (e) => {
            if (!running) {
                cleanCanvas(ctx);
                ball.x = e.clientX;
                ball.y = e.clientY;
                ball.draw(ctx);
            }
        });

        canvas.addEventListener('click', () => {
            if (!running) {
                raf = window.requestAnimationFrame(createStep(ctx));
                running = true;
            }
        });

        canvas.addEventListener('mouseout', () => {
            window.cancelAnimationFrame(raf);
            running = false;
        });

        ball.draw(ctx);
    }

    drawCanvas('canvas');
}

window.onload = load;
