//this is not a variable. It is a keyword. You cannot change the value of this.
//In JavaScript, the this keyword refers to an object.

//this in a Method
//When used in an object method, this refers to the object.
const person = {
    firstName: "John",
    lastName: "Doe",    
    id: 5566,
    fullName : function(){
        return this.firstName + " " + this.lastName; //this refers to the person object
    }
}
console.log(person.fullName());


// Using this in a Function
// In a JavaScript function, the behavior of the this keyword varies depending on how the function is invoked.

function greet() {
    console.log('Hello, my name is ' + this.name);
}
const person1 = {
    name: 'Amit',
    sayHello: greet
};
const anotherPerson = {
    name: 'Jatin'
};
person1.sayHello(); 
