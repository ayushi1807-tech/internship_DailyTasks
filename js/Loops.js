// For Loop
// for(let i=0; i<=10; i++){
//     console.log(i)
// }


// While Loop
// let a=1;
// while(a<=10){
//     console.log(a)
//     a++;
// }


// Do while Loop
// let test=1;
// do{
//     console.log(test);
//     test++;
// }while(test<=10)


// For Loop
// for(let i=0; i<=10; i++){
//         if(i%2==0){
//             console.log(i + " is even");          
//         }else{
//             console.log(i + " is odd");
//         }
// }



// For Of Loop
// Use for...of loop for iterating through iterable objects.
// It lets you loop over iterable data structures such as Arrays, Strings, Maps, NodeLists, and more:
//  const fruits = ["apple", "banana", "cherry"];
//  for(const fruit of fruits){
//      console.log(fruit);
// }


// const set = new Set([1,2,3]);
// for(const value of set){
//     console.log(value);
// }


// const map = new Map([["a", 1], ["b", 2]]);
// for(const [key, value] of map){
//     console.log(`${key}: ${value}`);
// }

// let person = {
//     name: "Akash",
//     age: 25,
//     city: "Noida"
// };

// for (let key of Object.keys(person)) {
//     console.log(`${key}: ${person[key]}`);
// }




// For In Loop
// Use for...in loop to iterate over the properties of an object.
let object={
    name: "Akash",
    age: 25,
    city: "Noida"
}
for(let key in object){
    console.log(`${key}: ${object[key]}`);
}

// Nested Loops 
// Use nested loops to iterate through multi-dimensional arrays or perform complex iterations.

for (let i = 0; i <= 3; i++) {
  for (let j = 0; j <= 3; j++) {
    if (i === j) {
      console.log(`Diagonal element: ${i}, ${j}`);
    }
  }
}
