<<<<<<< HEAD
const Readline = require("readline");
const rl = Readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let tasks = [];
let taskIdCounter = 1;

function AskQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

function GetTodayDate() {
  return new Date().toISOString().split("T")[0];
}

function GetTommorowDate() {
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

async function showMenu() {
  console.log(
    ` choose Operation:
        1.create Task
        2.view Task
        3.update Task
        4.Delete Task \n`
  );

  const choice = await AskQuestion("Enter your choice: ");

  switch (choice.trim()) {
    case "1":
      await CreateTask();
      break;
    case "2":
      await readTask();
      break;
    case "3":
      await UpdateTask();
      break;
    case "4":
      await DeleteTask();
      break;
    default:
      console.log("Invalid Operation");
      rl.close();
      return;
  }

  showMenu();
}

async function CreateTask() {
  var TaskName = await AskQuestion("Enter Task Name: ");
  var TaskDescription = await AskQuestion("Enter Task Description: ");
  var StartDate = await AskQuestion("Enter Task Start Date :");
  var EndDate = await AskQuestion("Enter Task End Date :");

  if (!StartDate) StartDate = GetTodayDate();
  if (!EndDate) EndDate = GetTommorowDate();
  const task = {
    id: taskIdCounter++,
    TaskName,
    TaskDescription,
    StartDate,
    EndDate,
  };

  tasks.push(task);
  // alert(`Task Created ! Id: ${task.id}`);
}

async function readTask() {
  const id = parseInt(await AskQuestion("Enter Task Id: "));
  const task = tasks.find((e) => e.id === id);

  if (task) {
    console.log(
      `id:${task.id}\n`,
      `name:${task.TaskName}\n`,
      `description:${task.TaskDescription}\n`,
      `StartDate : ${task.StartDate}\n`,
      `EndDate : ${task.EndDate}\n`
    );
  } else {
    console.log("Id is not found");
  }
}

async function DeleteTask() {
  const id = parseInt(await AskQuestion("Enter Task Id: "));
  const index = tasks.findIndex((e) => e.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    console.log("Task delete Successfully");
  } else {
    console.log("Id not found");
  }
}

async function UpdateTask() {
  const id = parseInt(await AskQuestion("Enter Task Id: "));
  const task = tasks.find((e) => e.id === id);
  if (task) {
    const newTaskName = await AskQuestion("Enter New TaskName :");
    const newTasDesc = await AskQuestion("Enter New Task Description :");
    const newTaskStartDate = await AskQuestion("Enter New Task StartDate :");
    const newTaskEndDate = await AskQuestion("Enter New Task EndDate :");

    task.TaskName = newTaskName.trim() || task.TaskName;
    task.TaskDescription = newTasDesc.trim() || task.TasTaskDescription;
    task.StartDate = newTaskStartDate.trim() || task.StartDate;
    task.EndDate = newTaskEndDate.trim() || task.EndDate;
  }
}
showMenu();
=======
let tasks = [];
let taskIdCounter = 1;

function GetTodayDate() {
  return new Date().toISOString().split("T")[0];
}

function GetTommorowDate() {
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

function showMenu() {
  return prompt(
    ` choose Operation:
        1.create Task
        2.view Task
        3.update Task
        4.Delete Task \n`
  );
}

function CreateTask() {
  var TaskName = prompt("Enter Task Name: ");
  var TaskDescription = prompt("Enter Task Description: ");
  var StartDate = prompt("Enter Task Start Date :");
  var EndDate = prompt("Enter Task End Date :");

  if (!StartDate) StartDate = GetTodayDate();
  if (!EndDate) EndDate = GetTommorowDate();
  const task = {
    id: taskIdCounter++,
    TaskName,
    TaskDescription,
    StartDate,
    EndDate,
  };

  tasks.push(task);
  alert(`Task Created ! Id: ${task.id}`);
}

function UpdateUser() {}

function readTask() {
  const id = parseInt(prompt("Enter Task Id: "));
  const task = tasks.find((e) => e.id === id);

  if (task) {
    console.log(
      `id:${task.id}\n`,
      `name:${task.TaskName}\n`,
      `description:${task.TaskDescription}\n`,
      `StartDate : ${task.StartDate}\n`,
      `EndDate : ${task.EndDate}\n`
    );
  } else {
    console.log("Id is not found");
  }
}

function DeleteTask() {
  const id = parseInt(prompt("Enter Task Id: "));
  const index = tasks.findIndex((e) => e.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    console.log("Task delete Successfully");
  } else {
    console.log("Id not found");
  }
}

function UpdateTask() {
  const id = parseInt(prompt("Enter Task Id: "));
  const task = tasks.find((e) => e.id === id);
  if (task) {
    const newTaskName = prompt("Enter New TaskName :" + task.TaskName);
    const newTasDesc = prompt(
      "Enter New Task Description :" + task.TaskDescription
    );
    const newTaskStartDate = prompt(
      "Enter New Task StartDate :" + task.StartDate
    );
    const newTaskEndDate = prompt("Enter New Task EndDate :" + task.EndDate);

    task.TaskName = newTaskName || task.TaskName;
    task.TaskDescription = newTasDesc || task.TasTaskDescription;
    task.StartDate = newTaskStartDate || task.StartDate;
    task.EndDate = newTaskEndDate || task.EndDate;
  }
}

function runTaskManager() {
  let choice;
  do {
    choice = showMenu();
    switch (choice) {
      case "1":
        CreateTask();
        break;
      case "2":
        readTask();
        break;
      case "3":
        UpdateTask();
        break;
      case "4":
        DeleteTask();
        break;
      default:
        console.log("Invalid Operation");
        break;
    }
  } while (["1", "2", "3", "4"].includes(choice));
}
runTaskManager();
>>>>>>> 530b2c5f7a52b10563d30a7eac0f4dfe70d3d3d2
