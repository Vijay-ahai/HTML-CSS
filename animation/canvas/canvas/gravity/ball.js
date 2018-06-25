class Ball{
    constructor(radius){
        this.radius=radius;
        this.color="red";
        this.x=0;
        this.y=0;
    }
    draw(ctx){
        ctx.save();
       // ctx.translate(this.x,this.y);
        ctx.fillStyle=this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        ctx.fill();
        ctx.restore();
    }
}
