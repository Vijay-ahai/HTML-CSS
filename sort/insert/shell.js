function shellSort(arr,colors,callback) {
    let gap=[5,3,1];
    for(let i in gap){
        let res=groupby(arr,gap[i]);
        console.log('=======准备第' + i + '次希尔排序：')
        for (let j in res){
            insertSort(res[j],colors,callback)
        }
        console.log('=======第' + i + '次希尔排序结果：')
        res=[].concat(...res)
        console.log(res);

    }

}
function groupby(arr,gap) {
    let res=[];
    let flag=[];
    for(let i in arr){ //表示所有元素未分组
        flag[i]=false;
    }
    for(let i in arr){
        let temp=[];
        for(let j=i;j<arr.length;j=parseInt(j)+parseInt(gap)){
            if(flag[j]==false){
                temp.push(arr[j]);
                flag[j]=true;
            }

        }
        if(temp.length!=0){
            res.push(temp);
        }

    }
    //console.log(res)
   return res;
}
