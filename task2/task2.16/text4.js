/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var isInteger=/^[0-9]*[1-9][0-9]*$/;                 //正整数
var isStr=/^[\u4e00-\u9fa5a-zA-Z]+$/;             //中文和字母
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
     var c_str=document.getElementById("aqi-city-input").value;
     var a_str=document.getElementById("aqi-value-input").value;
     if(!isStr.test(c_str))
            alert("城市必须为中文/英文，请重新输入！" + c_str);
     if(!isInteger.test(a_str))
         alert("空气质量必须为正数，请重新输入！" + a_str);
     else{
         aqiData[c_str]=a_str;
     }
     //alert(aqiData.city + aqiData.air);
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var table = document.getElementById("aqi-table");
    var Html = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    var contextHtml = " <tr><td>{city}</td><td>{data}</td><td><button>删除</button></td></tr>"

    for ( e in aqiData) {
        Html += contextHtml.replace("{city}", e).replace("{data}", aqiData[e]);
    }

    table.innerHTML = Html;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(e) {
    // do sth.
    var city = e.target.parentNode.parentNode.firstChild.innerHTML;
    delete aqiData[city];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var btn = document.getElementById("add-btn");
    btn.addEventListener("click", addBtnHandle);

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var table = document.getElementById("aqi-table");
    table.addEventListener("click",delBtnHandle);
}

window.onload = function() {
    init()
};