// let arr = [1, 1, 1, 2, 2, 3, 4, 3]
// //  Output => { 1: 1; 2 : 0; 3: 0, 4: 1 }
// //  Even => 0, odd => 1
// //  1 is repeated 3 times. 3 is odd, so 1: 1

// function find_count (arr) {
//     let obj = {}
//     let obj2 = {}
//     for (let i = 0; i < arr.length; i++) {
//         if (obj.hasOwnProperty(arr[i])) {
//             obj[arr[i]] =  obj[arr[i]] + 1;
//         }
//         else {
//             obj[arr[i]] = 1
//         }
//     }

//     for (let key in obj) {
//         console.log(key, obj[key])
//         if (obj[key] % 2 == 0){
//             obj2[key] = 0
//         }
//         else {
//             obj2[key] = 1
//         }
//     }

//     return obj2
// }


// console.log(find_count(arr))



// ------ *** ------ Another way ------ *** ------
arr = [1, 1, 1, 2, 2, 3, 4, 3,1]
arr.sort();
var count = 1;
var results = "";
for (var i = 0; i < arr.length; i++)
{
    // console.log("arr[i]", arr[i]),
    // console.log("arr[i + 1]", arr[i + 1])

    if (arr[i] == arr[i+1])
    {
      count +=1;
    }
    else
    {
      if(count %2== 0){
        results += arr[i] + " -->  0 \n" ;
      }else{
        results += arr[i] + " -->  1 \n" ;
      }
        
        count=1;
    }
}
// console.log(results)