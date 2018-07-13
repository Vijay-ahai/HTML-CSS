class Shape{
    constructor(x,y,text){
        this.x=x;
        this.y=y;
        this.text=text;
        this.size=200;
        this.placement=[];
    }
    getValue(ctx,width,height){
        let stepX=9,stepY=11;
        ctx.textAlign="center";
        ctx.font=this.size + 'px arial';
        ctx.fillText(this.text,this.x,this.y);
        let canvasData=ctx.getImageData(0,0,width,height);
        let data=canvasData.data;
        let hasdata=[]
        //console.log(data)
        /*for(let i in data){
            if(data[i]!=0 &&i%3==0){
                let order=Math.floor(i/4) + 1;
                hasdata.push([data[i],order])
            }
        }
        console.log(hasdata);*/
        //遍历整张画布中有数据的地方，记录下来
        let check=[]
        for(let i=0;i<height;i+=stepX){
            for(let j=0;j<width;j+=stepY){
                //因为数组从0开始，a通道为3的倍数
                let index=i*width+j;
                let a=4*index-1;
                if(data[a]!=0){ //RGBA通道，文字是黑色rgba（255,255,255,255）所以只用查找到R通道即可
                    //console.log('a')
                    check.push(a);
                    this.placement.push([j,i])//placement数组存储了相应的i,j位置
                }
            }
        }
        console.log(check)
        ctx.clearRect(0,0,width,height);
    }
}
