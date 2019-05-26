import { Graph,Polynomial,Calculus } from '../libraries/math.js';

const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext('2d');
const DPIscale = window.devicePixelRatio;

let w = canvas.clientWidth*DPIscale,
    h = canvas.clientHeight*DPIscale,
    xRange = [-6,6], yRange = [-2,2],
    taylor, degree = 2,
    x0 = 0, func = Math.exp;

canvas.width = w;
canvas.height = h;

window.onresize = function() {
    w = canvas.clientWidth*DPIscale;
    h = canvas.clientHeight*DPIscale;
    canvas.width = w;
    canvas.height = h;
    draw();
}

let makeTaylor = function(Fn,x,n) {
    if(typeof Fn != 'function') throw ''+Fn+' is not a function';
    let coefficient = [];
    let index = 1;
    coefficient[0] = Fn(x);
    for(let i=1; i<=n; i++) {
        index *= i;
        coefficient[i] = Calculus.diff(Fn,x,undefined,i) / index;
    }
    taylor = new Polynomial(coefficient);
}

let draw = function() {
    ctx.clearRect(0,0,w,h);
    makeTaylor(func,x0,degree);
    Graph.drawAxis(xRange,yRange,canvas);
    Graph.plotFn(function(x) { return taylor.eval(x-x0); },xRange,yRange,undefined,canvas,'blue');
    Graph.plotFn(func,xRange,yRange,undefined,canvas,'green');
}

window.update = function(type,value) {
    switch(type) {
        case 'degree':
        if(parseInt(value)>6) value='6';
        else if(parseInt(value)<0) value='0';
        degree = parseInt(value);
        break;
        case 'x0':
        x0 = parseFloat(value);
        break;
        case 'func':
        func = new Function('x','return '+value+';');
        break;
    }
    draw();
}
// Main program
draw();
