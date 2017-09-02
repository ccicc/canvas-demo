/* eslint-disable */ 

// a = ∆v / ∆t 加速度公式
// h = gt² / 2;

class Ball {
    constructor(ballProps) {
        Object.assign(this, ballProps);
        this.G = 500;   // 重力加速度
        this.damping = 50;  // 衰减速度 
    }

    getStatus(et) {
        this.calculateCoor(et);
        return {
            x: this.x,
            y: this.y,
            sv: this.sv,
        };
    }

    calculateCoor(et) {
        // 单位间隔时间
        let intervalTime = et - this.st;
        this.st = et;
        if(this.isControlled)return;
        // 末速度
        let ev = this.sv + intervalTime * this.G;
        // 单位时间内的位移
        let s = this.sv * intervalTime + this.G * Math.pow(intervalTime, 2) / 2;
        // 距地面距离
        let distanceFloor = this.y + s;

        if(distanceFloor > 500 - this.size) {
            this.y = 500 - this.size;
            this.sv = ev > this.damping ? -1 * (ev - this.damping) : 0;
        } else {
            this.y = distanceFloor;
            this.sv = ev;       
        }
    }

    control(element, mouse) {
        this.isControlled = true,
        this.sv = 0;
        this.st = null;
        const ball = this;
        let mouseMoveCb = function() {
            ball.x = mouse.x - ball.size / 2;
            ball.y = mouse.y - ball.size / 2;
        };
        let mouseUpCb = function() {
            element.removeEventListener('mousemove', mouseMoveCb);
            element.removeEventListener('mouseup', mouseUpCb);
            ball.isControlled = false;
        };
        element.addEventListener('mousemove', mouseMoveCb);
        element.addEventListener('mouseup', mouseUpCb);
    }
}

export default Ball;
