/* 
    global
    window: false,
    document: false,
    Image: false
*/

function load() {
    function promiseImg(url) {
        return new Promise((resolve, reject) => {
            try {
                const img = new Image();
                img.src = url;
                img.onload = function imgLoad() {
                    resolve(img);
                };
            } catch (err) {
                reject(err);
            }
        });
    }

    function drawCanvas(id, imgs) {
        const canvas = document.getElementById(id);
        const ctx = canvas.getContext('2d');
        const [birdImg, frameImg] = imgs;

        const birdW = 230;
        const birdH = 320;
        const frameW = 270;
        const frameH = 380;

        ctx.drawImage(birdImg, 141, 335, 400, 600, 50, 50, birdW, birdH);
        ctx.drawImage(frameImg, 30, 20, frameW, frameH);

        ctx.drawImage(birdImg, 141, 335, 400, 600, 200 + frameW, 100, birdW * 3 / 4, birdH * 3 / 4);
        ctx.drawImage(frameImg, 180 + frameW, 80, frameW * 3 / 4, frameH * 3 / 4);

        ctx.drawImage(
            birdImg, 1470, 560, 270, 350, frameW * 2 + 260, 120, birdW * 2 / 3, birdH * 2 / 3,
        );
        ctx.drawImage(frameImg, frameW * 2 + 240, 100, frameW * 2 / 3, frameH * 2 / 3);
    }

    async function drawPicture(url1, url2) {
        const imgs = await Promise.all([
            promiseImg(url1),
            promiseImg(url2),
        ]);

        drawCanvas('canvas', imgs);
    }

    drawPicture('./images/picture-bird.jpg', './images/picture-frame.png');
}

window.onload = load;
