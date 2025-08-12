const fs = require("fs");
const { resolve } = require("path");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function AskQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function Menu() {
  console.log(`
        ** Choose Operation 
        1.add,
        2.view,
        3.Search,
        4.Delete,
        5.Update,
        6.Sort,
        7.Count
        `);

  const choice = await AskQuestion("Enter Your Choice: ");

  switch (choice) {
    case "1":
      await AddStudent();
      break;
    case "2":
      await ViewStudent();
      break;
    case "3":
      await SearchStudent();
      break;
    case "4":
      await DeleteStudent();
      break;
    case "5":
      await UpdateStudent();
      break;
    case "6":
      await SortStudent();
      break;
    case "7":
      await CountStudent();
      break;
    default:
      console.log("Invalid Operation");
      rl.close();
      return;
  }
}

async function AddStudent() {
  let Sname = await AskQuestion("Enter Student Name.. ");

  if (Sname == "") {
    console.log("Name Cannot be Empty !! Enter Again");
    AddStudent();
  }

  let age;
  while (isNaN(age) || age <= 0) {
    age = await AskQuestion("Please enter a valid age (a positive number):");
    if (age !== null) {
      age = Number(age);
    } else {
      alert("Input canceled.");
      break;
    }
  }

  let Scourse = await AskQuestion("Enter Student Course : ");

  let StuDetail = {
    Sname,
    age,
    Scourse,
  };

  const jsonData = JSON.stringify(StuDetail, null, 2);
  jsonData.split(",");

  fs.appendFile("Students.json", jsonData, "utf-8", (err, data) => {
    console.log("Data Added Successfully");
    return Menu();
  });
}

async function ViewStudent() {
  fs.readFile("Students.json", "utf-8", (err, data) => {
    console.log(`Data of all Students is...\n${data}`);
  });
}

async function SearchStudent() {
    let name = await AskQuestion("Enter Student Name to Search");
    try{
        const fileContent = fs.readFileSync('Students.json','utf-8')
        const userData = JSON.parse(fileContent);

        const user = userData.find(u => u.name === name);
        return user;
    }catch(error){
        console.log("Error reading or Parsing JSON File",error)
        return null;

    }
}

async function DeleteStudent() {
    let name = await AskQuestion("Enter Student Name to delete")

}

async function UpdateStudent() {}

async function SortStudent() {}

async function CountStudent() {}

Menu();