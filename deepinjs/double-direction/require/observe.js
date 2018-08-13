function Observe(data) {
    Object.keys(data).forEach(key=>{
        defineReact(data,key,data[key])
    })
}
function defineReact(data,key,value) {
    let dep=new Dep();
    Object.defineProperty(data,key,{
        get:function () {
            if(Dep.target){
                dep.addSub(Dep.target);
            }
            return value
        },
        set:function (nvalue) {
            if(value!==nvalue){
                value=nvalue;
                console.log('value changed',value + "," + nvalue);
                dep.notify();
            }
        }
    })
}

function Dep() {
    this.subs=[];
}
Dep.prototype.addSub=function (sub) {
    this.subs.push(sub);
}
Dep.prototype.notify=function () {
    //console.log(this.subs)
    this.subs.forEach(sub=>{
        sub.update();
    })
}
