class Ripple{
    constructor(width,height,ctx,value){
        this.width=width;
        this.height=height;
        this.ctx=ctx;
        this.offset=0;
        this.speed=0.05;
        this.isDrawCircle=false;
        this.currentValue=0;
        this.value=value;
    }
    draw(waveWidth,waveHeight,xOffset,color){
        let points=[];
        let startX=0;
        let ctx=this.ctx;
        let hoffset=this.height/2-this.width/3;
        let height=(2*this.width)/3;
        ctx.lineWidth=1;
        ctx.fillStyle=color
        ctx.beginPath();
        for(let x=startX;x<this.width;x+=0.1){ //x的增幅代表了点的密度，增幅越大点越离散
            let y=waveHeight*Math.sin((startX+x)*waveWidth+xOffset);
            points.push([x,(1-this.currentValue)*height+hoffset +y]); //给点y一个向下的偏移
            ctx.lineTo(x,(1-this.currentValue)*height+hoffset +y);
        }
        ctx.lineTo(this.width,this.height);
        ctx.lineTo(startX,this.height);
        ctx.lineTo(points[0][0],points[0][1]);
        ctx.fill();
    }
    move(){
        //console.log(this)
        if(!this.isDrawCircle){
            this.drawCircle();
        }
        this.offset+=this.speed;
        this.ctx.clearRect(0,0,600,600)
        this.draw(0.03,20,this.offset-2,"#ebf6f7"); //浅色阴影打底
        this.draw(0.03,20,this.offset,"#83ccd2"); //数据显示

        if(this.currentValue<this.value){ //数据映射高度变化
            this.currentValue+=0.01;
        }
        window.requestAnimationFrame(this.move.bind(this))
    }
    drawCircle(){
        let ctx=this.ctx;
        ctx.lineWidth=4;
        ctx.strokeStyle='#e6eae3'
        ctx.beginPath();
        ctx.arc(this.width/2,this.height/2,this.width/3,0,2*Math.PI);
        ctx.stroke();
        ctx.clip(); //剪裁区域
        this.isDrawCircle=true;

    }

}
