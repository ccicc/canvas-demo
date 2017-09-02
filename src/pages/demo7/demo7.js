/*
    global
    window: false
    document: false
    Image: false
*/ 

import Ball from './ball';
import utils from './utils';

let canvasWidth = null;
let canvasHeight = null;
const balls = [
    {
        x: 100,
        y: 80,
        size: 50,
        sv: null,
        st: 0,
        isControlled: false,
        imgUrl: './images/demo7/arbre.svg',
    },
    {
        x: 200,
        y: 100,
        size: 50,
        sv: null,
        st: 0,
        isControlled: false,
        imgUrl: './images/demo7/boat.svg',
    },
    {
        x: 300,
        y: 50,
        size: 50,
        sv: null,
        st: 0,
        isControlled: false,
        imgUrl: './images/demo7/chapeau.svg',
    },
    {
        x: 400,
        y: 120,
        size: 50,
        sv: null,
        st: 0,
        isControlled: false,
        imgUrl: './images/demo7/voiture.svg',
    },
    {
        x: 500,
        y: 70,
        size: 50,
        sv: null,
        st: 0,
        isControlled: false,
        imgUrl: './images/demo7/pomme.svg',
    },
];

function createPromise(ballProps) {
    return new Promise((resolve, reject) => {
        try {
            const img = new Image();
            img.src = ballProps.imgUrl;
            img.onload = function imgLoad() {
                ballProps.img = img;
                resolve(new Ball(ballProps));
            };
        } catch (err) {
            reject(err);
        }
    });
}

function createStep(ctx, ballsInstance) {
    return function step(timestap) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        let isAllDone = true;
        ballsInstance.forEach((ball) => {
            // 获取球坐标
            const coor = ball.getStatus(timestap / 1000);
            ctx.drawImage(ball.img, coor.x, coor.y, ball.size, ball.size);
            if (coor.y !== 470 || coor.sv !== 0)isAllDone = false;
        });
        if (isAllDone) return false;
        window.requestAnimationFrame(createStep(ctx, ballsInstance));
        return true;
    };
}

function watchClickedBall(mouse, ballsInstance) {
    for (let i = 0, l = ballsInstance.length; i < l; i += 1) {
        const ball = ballsInstance[i];
        // 计算球中心点
        const ballOriginX = ball.x + ball.size / 2;
        const ballOriginY = ball.y + ball.size / 2;
        // 鼠标点击距离球中心的距离
        const ballDistance = Math.sqrt(
            Math.pow(mouse.x - ballOriginX, 2) + Math.pow(mouse.y - ballOriginY, 2));
        if (ballDistance <= ball.size / 2) return ball;
    }
    return false;
}

function drawCanvas(id) {
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext('2d');
    const mouse = utils.captureMouse(canvas);

    canvasWidth = canvas.width;
    canvasHeight = canvas.height;

    const ballPromises = Promise.all(balls.map(ballProps => createPromise(ballProps)));
    ballPromises.then((ballsInstance) => {
        window.requestAnimationFrame(createStep(ctx, ballsInstance));

        canvas.addEventListener('mousedown', () => {
            const watchClicked = watchClickedBall(mouse, ballsInstance);
            if (!watchClicked) return;
            watchClicked.control(canvas, mouse);
        });
    });
}

drawCanvas('canvas');
