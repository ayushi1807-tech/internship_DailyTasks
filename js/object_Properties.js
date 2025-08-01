const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue"
};
let x = person.firstName = "Jane";
console.log(person.firstName);
console.log(person.lastName);

