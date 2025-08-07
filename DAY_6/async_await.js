function simpleFunc(){
    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve("resolved")
        }, 2000);
    })
}
async function asyncFunc(){
    console.log("Helloooo")
    const result = await simpleFunc();
    console.log(result)
}
asyncFunc()



async function run(){
    try{
        const response =  await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const json = await response.json()
        console.log(json)
    }catch(error){
        console.log(error)
    }
}

run()