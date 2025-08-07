function AsyncFunction1(CallBack){
    setTimeout(()=>{
        console.log("This is function ")
        CallBack()
    },2000)
}

function AsyncFunction2(CallBack){
    setTimeout(()=>{
        console.log("This is function 2")
        CallBack()
    },2000)
}
function AsyncFunction3(CallBack){
    setTimeout(()=>{
        console.log("This is function 3")
        CallBack()
    },2000)
}

AsyncFunction1(()=>{
    AsyncFunction2(()=>{
        AsyncFunction3(()=>{
            console.log("excecution of code....")
        })
    })
}
)