//A JavaScript Method is a property of an object that contains a function definition. 
// Methods are functions stored as object properties.

const person = {
    firstName: "John",
    lastName: "Doe",
    age: 50,
}
const person2 = {
    firstName: "Jane",
    lastName: "Smith",
    age: 30,
}

Object.assign(person2, person); // (Source, Target) - Copies all properties from person to person2
console.log(person2);

//Object.entries() returns an array of the key/value pairs in an object
console.log(Object.entries(person));

//fromEntries() method creates an object from a list of key/value pairs
const fruits = [
  ["apples", 300],
  ["pears", 900],
  ["bananas", 500]
];

const myObj = Object.fromEntries(fruits);
console.log(myObj);

// Object.values() is similar to Object.entries(), but returns a single dimension array of the object values
console.log(Object.values(person));

