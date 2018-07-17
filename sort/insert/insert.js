function insertSort(arr,colors,callback) {
    let temp;
    let j;//j代表最终插入位置
    for(let i=1;i<arr.length;i++){
        temp=arr[i]; //待插入元素
        j=i;
        while(j>=1&&temp<arr[j-1]){
            j--
        }
        arr.splice(i,1);//删除对应的数
        arr.splice(j,0,temp);//插入对应的数
        //颜色数组也同样的操作
        let color=colors.splice(i,1);
        colors.splice(j,0,color);
        console.log('第' + i + '次插入排序结果：')
        console.log(arr);
        callback(arr,colors);
    }
    return 1;
}

