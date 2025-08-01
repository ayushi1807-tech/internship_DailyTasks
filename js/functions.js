// normal function without arguments
function Check(){
    let age=25;
    if(age>18){
        console.log("You are an adult.");
    } else {
        console.log("You are a minor.");
    }   
}
Check();


// Arrow Function
// Arrow functions in JavaScript provide a concise syntax for writing functions.
// They are especially useful for simplifying code and maintaining cleaner syntax.
check =  () =>{
    if(5 > 3){
        console.log("5 is greater than 3");
    }   else {
        console.log("3 is greater than 5");
    }            
}
check();

// Arrow function with parameters
const square = (num) =>{
    console.log("Square of 2 is: " + num * num);
}
square(2);

// Function with default parameters
function greet(name = "Guest") {    
    console.log("Hello, " + name + "!");
}
greet();
greet("Alice"); 


// return Statement in function
// The return statement is used to return a value from a function.
//
const add= (a,b) =>{
    return a+b;
}
add(5, 10);

