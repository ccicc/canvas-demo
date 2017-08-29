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
        const [frameImg, birdImg] = imgs;

        ctx.drawImage(frameImg, 300, 550);
        ctx.drawImage(birdImg, 180, 360, 300, 550, 50, 50, 300, 550);
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
