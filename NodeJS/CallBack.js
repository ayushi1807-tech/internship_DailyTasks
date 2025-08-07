// function sum(a,b){
//     console.log(a+b)
// }

// function calculator (a,b , sumCall){
//     sumCall(a,b)
// }

// calculator(1,2,(a,b) =>{
//     console.log
// })

function add(a,addCall){ 
    let result = a+4;
    addCall(result)
}
add(2 , addition => console.log(addition))



function hello(functionCall){
    console.log("This Function name is hello")
    functionCall()
}

function SayHello(){
    console.log("This is SayHello Function...")
}

hello(SayHello)