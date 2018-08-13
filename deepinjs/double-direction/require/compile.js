function Compile(el,data) {
    this.node=document.querySelector(el);
    this.data=data;
    this.init();
}
Compile.prototype.init=function(){
    this.compile(this.node)
}
Compile.prototype.compile=function (node) {
    let nodes=node.childNodes;
    //console.log(nodes)
    nodes.forEach(node=>{
        if(node.nodeType==1) {//元素结点
            let attributes=Array.from(node.attributes);
            attributes.forEach(attr=>{
                let key=attr.name;
                if(key==='k-model'){
                    node.addEventListener('input',(e) =>{
                        let value=e.target.value;
                        console.log('inputting',value)
                        this.data[attr.value]=value;
                       // console.log(this.data)

                    })
                }
            })
            //对元素结点递归直到文本结点
            this.compile(node);
        }
        else if(node.nodeType==3){ //文字结点
            //console.log(node)
            let reg=/\{\{(.*)\}\}/;
            let str=node.textContent;
            if(reg.test(str)){
                let key=RegExp.$1;
                node.textContent=this.data[key];
                new Watcher(this.data,key,node)
            }

        }

    })
}
