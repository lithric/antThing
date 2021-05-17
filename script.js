var gridX = 100;
var gridY = 100;
var x = 0;
var y = 0;
var state = 0;
var posArr = new Set([]);

function UCond(x,y) {
    return String(x) + "," + String(y);
}

function turnRight() {
    y += (state - 1) % 2;
    x -= (state - 2) % 2;
    state++;
    state%=4;
}

function turnLeft() {
    y -= (state - 1) % 2;
    x += (state - 2) % 2;
    state--;
    if (state < 0) {
        state += 4;
    }
}

function advance(step = 1,stages = 2, directions = [1,0,0]) {
    let i = step;
    let dir = [turnLeft,turnRight];
    console.log(posArr);
    while (i--) {
        let boolArr = [];
        let k = stages;
        while (k--) {
            boolArr.push(!posArr.has(UCond(x,y)+","+String(k)));
        }
        k = stages;
        let actions = dir.getIndex(...directions.slice(0,-1)).reverse();
        while (k--) {
            if (boolArr.slice(0,k+1).every(item => item == true)) {
                posArr.add(UCond(x,y)+","+String(1-k))
                actions[k]();
                break;
            }
        }
        if ( !(k+1) ) {
            k = stages;
            while(k--) {
                posArr.delete(UCond(x,y)+","+String(k));
            }
            dir.getIndex(directions.slice(-1)-0)[0]();
        }
    }
}

Array.prototype.getIndex = function(...arg) {
    let temp = [];
    for (i of arg) {
        temp.push(this[i]);
    }
    return temp;
}

function setup() {
    createCanvas(windowWidth,windowHeight);
    x = Math.floor(gridX/2);
    y = Math.floor(gridY/2);
    angleMode(DEGREES)
}

function draw() {
    var tempY = height/gridY;
    var tempX = width/gridX;
    background(255);
    if (keyIsDown(84)) {
        advance(1000);
    }
    for (let i of posArr) {
        let n = i.split(",");
        fill(0,255*(n[2]-0),255);
        rect(tempX*n[0],tempY*n[1],tempX,tempY);
    }
    fill(255);
    ellipse(tempX*(x+1/2),tempY*(y+1/2),tempY);
        push();
        translate(tempX*(x+1/2),tempY*(y+1/2))
        rotate(state * 90);
        ellipse(-tempX/10,0,tempY/4);
        pop();
}

function keyPressed() {
    if (key==="q") {
        advance(50);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}