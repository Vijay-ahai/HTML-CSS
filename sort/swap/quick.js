function quickSort(arr,left,right,colors,callback) {
    let i=left,j=right;
    if(left<right){
        let center=arr[left];
        while(right!=left){   //一趟快排的结束标志是ij重合
            //从右往前扫描
            while(right>left && arr[right]<center){
                right--;
            }
            if(right>left){
                arr[left]=arr[right];
                left++;
            }
            //从左往后扫描
            while(right>left && arr[left]>center){
                left++;
            }
            if(right>left){
                arr[right]=arr[left];
                right--;
            }
        }
        arr[right]=center;
        console.log('完成一趟快速排序');
        console.log(arr);
        quickSort(arr,i,right-1,colors,callback);
        quickSort(arr,right+1,j,colors,callback);
    }
}
