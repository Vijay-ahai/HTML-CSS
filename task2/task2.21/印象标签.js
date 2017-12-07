var karray=new Array();
var habbits=new Array();
var gap=/[,，/、 \s]/;
var addhabit=new Array();
function other_add() {
    var key=document.getElementById("key").value;
    var flag=gap.exec(key);
    if(flag == null || key == ""  ){
        return;
    }
    else{
        key=key.substring(0,key.indexOf(flag));
        console.log(flag);
        insert(key);
    }
}          //输入事件调用的函数，处理字符串后调用插入函数
function enter_add() {
    var key=document.getElementById("key").value;
   if(event.keyCode == 13){
       key=key.trim();
       insert(key);
   }
}         //回车事件调用的函数
function insert(key) {
    for(var i=0;i<karray.length;i++){
        if(key==karray[i]){
            console.log("找到了！ " + key);
            document.getElementById("key").value="";
            return false;
        }

    }
    if(karray.length>=10)
        karray.shift();
    var right=new Array(key);
    karray=karray.concat(right);
    show();
    document.getElementById("key").value="";
}           //插入并调用tag渲染
function show() {
    var content="<div class='item' onclick='del(this)' onmouseover='over(this)' onmouseleave='leave(this)'>{key}</div>";
    var html="";
    var wrap=document.getElementById("wrap-red");
    for(var i=0;i<karray.length;i++){
        html+=content.replace("{key}",karray[i])
        console.log("数组元素" + karray[i]);
    }
    wrap.innerHTML=html;
}             //tag渲染
function del(item) {
    var k=item.innerText;
    k=k.substring(k.indexOf("：")+1);
    for(var i=0;i<karray.length;i++){
        if(k==karray[i]){
            karray.splice(i,1);
            break;
        }
    }
    show();
}              //点击删除函数
function over(item) {
    var cont=item.innerText;
    item.innerText="点击删除：" + cont;
    item.className="over";
}                    //鼠标事件
function leave(item) {
    var cont=item.innerText;
    item.innerText=cont.substring(cont.indexOf("：")+1);
    item.className="item";

}
function single(string) {
    console.log("the string is " + string);
    if(!gap.test(string)){
        addhabit.push(string);
        return ;
    }
    else{
        var a=string.split(gap.exec(string));
        for(var i=0;i<a.length;i++){
            single(a[i]);
        }
    }
}
function add() {
    var ha=document.getElementById("find").value;
    ha=ha.trim();
    single(ha);
    if(addhabit.length!=0 && ha!=""){
        habbits=habbits.concat(addhabit);
        console.log(habbits.length);
        var i,j;
        var flag;
        for(i=0;i<habbits.length;){                  //去掉重复元素
            flag=false;
            for(j=0;j<habbits.length-i-1;j++){
                if(habbits[i] == habbits[i+j+1]){
                    habbits.splice((i+j+1),1);
                    flag=true;
                }
            }
         if(flag)
             i=0;
         else
             i++;
        }
        while(habbits.length>10){
            habbits.shift();
        }
        for(i=0;i<habbits.length;i++){     //删除值为空的项目
            if(habbits[i]=="")
                habbits.splice(i,1);
        }
        showhabbits();

    }
}                                                  //兴趣爱好调用的插入函数
function showhabbits() {                                              //兴趣爱好的渲染函数
    var div=document.getElementById("wrap-habbits");
    var content="<div class='habit'>{h}</div>";
    var html="";
    for(var i=0;i<habbits.length;i++){
        html+=content.replace("{h}",habbits[i]);
        console.log("正在渲染兴趣：" + habbits[i]);
    }
    div.innerHTML=html;

}
function check() {
    var find=document.getElementById('find').value;
    document.getElementById('find').value="";
    if(find==null || find ==""){
        alert("请输入查找内容");
        return;
    }
    var exist=new RegExp(find);
    for(var i=0;i<karray.length;i++){
        var item=exist.exec(karray[i]);
        if(item){
            console.log("找到了"+ item);
            show(i);
            return;
        }

    }
}