// function OuterFunc(a) {
//     let b = 0;

//     function innerFunc(){
//         let sum = a+b;
//         console.log(sum)
//     }
//     innerFunc()
// }

// OuterFunc(3)



function Add(a){
let b =50;

return function(){
    let sum = a+b;
    return sum
}
}

const addtion = Add(5)
console.log(addtion())

