// const obj1 = new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         let roll_no = [1,2,4,54,87]
//         resolve(roll_no)
//         reject(roll_no)
//     },3000)
// })

// obj1.then((roll)=>{
//     console.log(roll)

// })


const obj1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        let roll_no = [1,2,4,54,87]
        reject('Error')
    },1000)
})

obj1.then((roll)=>{
    console.log(roll)
    
}).catch((error)=>{
    console.log(error)
})

