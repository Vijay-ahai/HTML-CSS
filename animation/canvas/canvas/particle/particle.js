class Particle{
    constructor(type){
        this.type=type;
        this.colors=['#8d6449','#d0af4c','#00a497','#44617b','#b55233','#84a2d4','#d3cbc6','#c53d43','#dccb18','#82ae46']
        this.sizes=[1,5,7,6,10]
        this._colors=[];
        this._size=[];
        this._dataarr=[];
        this._isAdd=[];
    }
    draw(dataarr,ctx){
        this._dataarr=dataarr;
      //  console.log(dataarr)
        dataarr.forEach((item,index)=>{
            let randomColor=Math.floor((Math.random()*10));
            let randomSize=Math.floor((Math.random()*10)/2);
            this._colors.push(this.colors[randomColor]);
            this._size.push(this.sizes[randomSize]);
            if(this.sizes[randomSize]<7){
                this._isAdd[index]=true;
            }
            else{
                this._isAdd[index]=false;
            }
            //console.log(randomColor)
                ctx.fillStyle=this.colors[randomColor];
            if(this.type=='circle'){
                ctx.beginPath();
                ctx.arc(item[0],item[1],this.sizes[randomSize],0,Math.PI*2,true);
            }
            else if(this.type=='square'){
                ctx.fillRect(item[0],item[1],this.sizes[randomSize]+2,this.sizes[randomSize]+2);
            }
                ctx.fill();

        });
        console.log(this._size)
    }
    breath(ctx){
        ctx.save();
        this._dataarr.forEach((item,index)=>{
          //  console.log(index)
            let color=this._colors[index];
            let size=this._size[index];
            let isadd=this._isAdd[index]
            if(this._isAdd[index]==true){
                size=size+0.1
            }
            else{
                size=size-0.1
            }
            if(size>=10){
                this._isAdd[index]=false
            }
            else if(size<=1){
                this._isAdd[index]=true
            }
            size=size<0?0:size;
            this._size[index]=size;
            ctx.fillStyle=color;
            if(this.type=='circle'){
                ctx.beginPath();
                ctx.arc(item[0],item[1],size,0,Math.PI*2,true);
            }
            else if(this.type=='square'){
                ctx.fillRect(item[0]-size/2,item[1]-size/2,size+2,size+2);//实现方块以中心缩放
            }

            ctx.fill();
        })
        ctx.restore();
    }
}
