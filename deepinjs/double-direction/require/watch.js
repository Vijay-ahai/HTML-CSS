function Watcher(data,name,node) {
    Dep.target=this;
    this.data=data;
    this.name=name;
    this.node=node;
    this.value=this.node.textContent
    this.update();
    Dep.target=null;
}
Watcher.prototype.update=function () {
    this.get();
    //console.log(this.value)
    this.node.nodeValue=this.value
}
Watcher.prototype.get=function () {
    this.value=this.data[this.name];
}
