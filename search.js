/*
MIT License

Copyright (c) 2022 Luke Richardville, Sabin Tudor, Thomas Krakow

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/* inspired and forked by
https://codepen.io/lukerichardville/pen/KdVqjv
and https://codepen.io/NyX/pen/OydVzp

original pen https://codepen.io/thomaskrakow/pen/zYWqezM
*/

// Line model
var Line = function(x, y) {
    this.location = { x: x, y: y };
    this.width = Math.random() * 1 + 0.25;
    this.color = '#8395c1';
};

// Signalz
var Signalz = function(element) {
    this.canvas = null;
    this.ctx = null;
    this.center = { x: null, y: null };
    this.drawNo = 0;
    this.linesNo = 50;
    this.linesSize = 20;
    this.lines = [];

    // init
    this.init(element);
};

Signalz.prototype.init = function(element) {
    // setup & attach to canvas
    this.setup(element);

    // create lines
    for (var i = 0; i < this.linesNo; i++) {
        this.lines.push(new Line(this.center.x, this.center.y));
    }

    // animate
    this.animate();
};

Signalz.prototype.setup = function(element) {
    var cvs = document.querySelector(element);

    // set canvas to full window size
    cvs.width = window.innerWidth;
    cvs.height = cvs.width * 9 / 16;

    // set pointers
    this.canvas = cvs;
    this.ctx = cvs.getContext('2d');

    // calc center of stage/window
    this.center.x = Math.round(this.canvas.width / 2);
    this.center.y = Math.round(this.canvas.height / 2);

    // handle window resize
    window.addEventListener('resize', this.onScreenResize.bind(this));
};

Signalz.prototype.onScreenResize = function() {
    // reset canvas to full window size
    this.canvas.width = window.innerWidth;
    this.canvas.height = this.canvas.width * 9 / 16;

    // recalc center of stage/window
    this.center.x = Math.round(this.canvas.width / 2);
    this.center.y = Math.round(this.canvas.height / 2);

    // recenter lines
    this.lines.forEach(function(line) {
        line.location.x = this.center.x;
        line.location.y = this.center.y;
    }.bind(this));
};

Signalz.prototype.animate = function() {
    // request new frame
    requestAnimationFrame(this.animate.bind(this));
    this.draw();
};

Signalz.prototype.draw = function() {
    // clear canvas
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // update draw number
    this.drawNo++;
    if (this.drawNo % 2 === 1) return;

    // draw & update lines
    for (var idx = 0; idx < this.lines.length; idx++) {
        var line = this.lines[idx];
        var lineSize = this.linesSize;

        // random direction
        var dir = ~~(Math.random() * 3) * 90;
        if (idx % 4 === dir / 90) dir = 270;

        // begin line path
        this.ctx.lineWidth = line.width;
        this.ctx.strokeStyle = line.color;
        this.ctx.beginPath();
        this.ctx.moveTo(line.location.x, line.location.y);

        // switch direction
        switch (dir) {
            case 0:
                line.location.y -= lineSize;
                break;
            case 90:
                line.location.x += lineSize;
                break;
            case 180:
                line.location.y += lineSize;
                break;
            case 270:
                line.location.x -= lineSize;
                break;
        }

        // move line to
        this.ctx.lineTo(line.location.x, line.location.y);

        // reset line location if offscreen
        if (line.location.x < 0 || line.location.x > this.canvas.width ||
            line.location.y < 0 || line.location.y > this.canvas.height) {
            line.location.x = this.center.x;
            line.location.y = this.center.y;
        }

        // stroke line
        this.ctx.stroke();
    }
};

// Initialize Signalz
var signalz = new Signalz('#tk-animation-electronic');