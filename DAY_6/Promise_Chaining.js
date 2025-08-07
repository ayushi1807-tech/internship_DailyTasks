let Promise1 = new Promise((resolve,reject)=>{
    setTimeout(() => {
        console.log("Resolved After 2 seconds")
        resolve(56)
    }, 500);
})
 
Promise1.then((value)=>{
        console.log(value)
        let promise2 = new Promise((resolve,reject)=>{
            resolve("Promise 2 is resolved...")
        })
        return promise2
}).then((value)=>{
    console.log(value)

    let promise3 = new Promise((resolve,reject)=>{
        reject("Promise 3 is rejected")
    })
    return promise3
}).catch((err)=>{
    console.log(err)
})

