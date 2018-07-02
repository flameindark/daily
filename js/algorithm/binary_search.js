function binarySearch(arr, target) {
    if(!Array.isArray(arr)) {
        console.log('仅支持数组查找')
    }
    var low = 0,
    high = arr.length - 1;
    while(low <= high) {
        var mid = Math.floor((high + low)/2);
        if(arr[mid] === target) {
            return mid;
        } else if(arr[mid] > target) {
            // high = mid; //之前没有考虑既然mid已经不是那么mid也要跳过
            high = mid -1;  
        } else if(arr[mid] < target)  {
            // low = mid // 同上
            low = mid + 1;
        } else {
            return -1;
        }
    }
}

function binarySearch2(arr, low, high, key) {
    if(!Array.isArray(arr)) {
        console.log('仅支持数组查找')
    }
    if(low > high){
        return -1
    }
    let mid = Math.floor((high + low)/2);
    if(arr[mid] === key) {
        return mid;
    } else if (arr[mid] > key) {
        return binarySearch2(arr, low, mid - 1, key) // return 容易忘记写啦
    } else {
        return binarySearch2(arr, mid + 1, high, key)
    }
}

var arr=[1,2,3,4,5,6,7,8,9,10,11,23,44,86];
var result=binarySearch(arr,11);
var result2=binarySearch2(arr, 0, arr.length -1, 44);
console.log(result);
console.log(result2);
