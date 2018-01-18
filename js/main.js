const canvas = document.getElementById("bg"),
    ctx = canvas.getContext("2d");

var tickCounter = 0;

function Ball(x, y, radius, color) {
    //Ball Position
    this.x = x;
    this.y = y;

    //Speed vars
    this.dx = 0;
    this.dy = 0;

    //Properties
    this.radius = radius;
    this.color = color;

    //Temp - use tempcounter if need of counter
    this.counter = 0;

    this.render = function(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 360);
        ctx.fill();
        ctx.closePath();
    }

    this.update = function(){
        this.dy = 8 / this.radius + Math.abs(this.y / canvas.height);
        //this.dx = Math.sin((this.counter * this.radius) / 1000);

        this.x += this.dx;
        this.y += this.dy;

        this.counter++;
    }
}

//Returns a random integer, non-decimal number, from 0 to max
function getRndInt(max) {
    return Math.floor(max * Math.random());
}

//Clears the canvas and resets the canvas size to accommodate for resize changes
function clearCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

var balls = [],
    colors = ["rgba(151, 255, 113, 0.5)", "rgba(255, 54, 64, 0.5)", "rgba(201, 118, 255, 0.5)", "rgba(107, 188, 255, 0.5)"];

function init() {
    for(let i = 0; i < 150; i++)
        balls.push(new Ball(5 + i + getRndInt(1500), -getRndInt(700), (10 + getRndInt(i) + i) / 4, colors[getRndInt(colors.length)]));
}

function render(){
    clearCanvas();

    for(var b of balls)
        b.render(ctx);
}

function update(){
    render();

    for(var b of balls) {
        b.update();

        if(b.y >= canvas.height + b.radius + 5) {
            b.y = -b.radius - 10;
            //b.dy = 8 * Math.random() / getRndInt(b.radius);
            b.x = getRndInt(5 + b.radius + (canvas.width - b.radius - 5));
            b.color = colors[getRndInt(colors.length)];
        }
    }
    // sway = 50 * Math.cos(counter * (1/70));
    // counter++;

    //console.log(counter, (pos.y - (counter / 50)));

    tickCounter++;
}

//Driver method
function main() {
    init();
    setInterval(update, 3/100);
}
