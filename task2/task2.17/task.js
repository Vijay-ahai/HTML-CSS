/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);     //returnData为以日期为下标的键值对数组
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};
// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "北京",
    nowGraTime: "day"
}
/**
 * 渲染图表
 */
function renderChart() {
    initAqiChartData();
    var div=document.getElementById("div");
    var data="<div title='{message}' style='height: {height}px;width: 10px;border: 1px #C0C0C0 solid;background-color: {color};display: inline-block;'></div>";
    var html="";
    var color=new Array("#6495ED","#FF7F50","#FFD700","#5F9EA0","#B0C4DE","#9ACD32");
    for(e in chartData){
        html+=data.replace("{message}",("时间：" + e + " 空气质量:" + chartData[e])).replace("{height}",chartData[e]).replace("{color}",color[Math.ceil(Math.random()*5)]);
        console.log("渲染数据：" + e + " "+ chartData[e] + " "+ Math.ceil(Math.random()*2) + " " );


    }
    div.innerHTML="";
    div.innerHTML=html;

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化
    // 设置对应数据
    var time=document.getElementsByName("gra-time");
    for(var i=0;i<time.length;i++){
        if(time[i].checked){
            pageState.nowGraTime=time[i].value;
            console.log("选择的日期： " + pageState.nowGraTime);
        }
    }
    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    // 设置对应数据
    var select=document.getElementById("city-select");
    pageState.nowSelectCity=select.options[select.selectedIndex].value;
    console.log("选择的城市： " + pageState.nowSelectCity);
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
     var time=document.getElementsByName("gra-time");
     console.log("取到的radio：" + time);
     for(var i=0;i<time.length;i++)
         time[i].addEventListener("change",graTimeChange);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var select=document.getElementById("city-select");
    var html="";
   for(e in aqiSourceData){
       html+="<option>" + e+ "</option>";
       console.log("获取到的城市列表：" + e);
   }
   select.innerHTML=html;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    select.addEventListener("change",citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    var time=pageState.nowGraTime;
    var city=pageState.nowSelectCity;
    for(e in chartData){
        delete chartData[e];
    }
    if(time == "day"){
          for(e in aqiSourceData[city]){
              chartData[e]=aqiSourceData[city][e];
              console.log(e+ ":" +aqiSourceData[city][e] + " 星期：" + new Date(e).getDay());
          }
    }
    else if(time=="week"){
        var tweek=0,wdata=0;
         for(e in aqiSourceData[city]){
             wdata+=aqiSourceData[city][e];
             tweek++;
             if(new Date(e).getDay()==0){
                 wdata=wdata/tweek;
                 tweek=0;
                 chartData[e]=wdata;
             }

         }
    }
    else if(time=="month"){
           var mdata=0,monthday=0;
           var tm=aqiSourceData[city][0],nm=0;
           for(e in aqiSourceData[city]){

               mdata+=aqiSourceData[city][e];
               monthday++;
               nm=new Date(e).getMonth();
               if(tm!=nm){
                   tm=nm;
                   mdata=mdata/monthday;
                   monthday=0;
                   chartData[e]=mdata;
               }


           }
    }
}

/**
 * 初始化函数
 */
function init() {

    initGraTimeForm()
    initCitySelector();


}

window.onload = function() {
    init();
};