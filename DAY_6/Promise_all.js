/* Methods of Promise */

// Promise.all

// Promise.all([
//     Promise.resolve("yeyyyy...."),
//     Promise.resolve("yeyyyy...."),
//     Promise.reject("Rejecteddd")
// ])
// .then((result)=>{console.log(result)})
// .catch((error)=>{console.log(error)})



// promise.allSettled

// Promise.allSettled([
//     Promise.resolve("Task 1 completed"),
//     Promise.resolve("Task 2 completed"),
//     Promise.reject("Rejectedddddddd........"),
// ])
// .then((result)=>{
//     console.log(result)
// })
// .catch((error)=>{
//     console.error(error)
// })


//Promise.race()

// Promise.race([
//     new Promise((resolve)=>{
//         setTimeout(()=>{
//             resolve("Task 1 finished..")
//         },2000)
//     }),
//     new Promise((resolve)=>{
//         setTimeout(()=>{
//             resolve("Task 2 finished..")
//         },1000)
//     }),

// ]).then((result)=>{
//     console.log(result)
// })



//Promise.any()

// Promise.any([
//     Promise.resolve("Task 1 sucess"),
//     Promise.reject("Task 1 failed"),
//     Promise.resolve("Task 2 sucess")
//     // if all are rejected it gives an aggregate error
// ])
// .then((result)=>{
//     console.log(result)
// })



// Promise.finally
Promise.resolve("Task Completed")
        .then((result)=>console.log(result))
        .catch((result)=>console.log(result))
        .finally(()=>console.log("Cleanup Completed"))