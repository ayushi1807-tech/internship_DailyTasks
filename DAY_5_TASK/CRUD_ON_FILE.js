const fs = require("fs");
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
    console.log(
        `Choose Operation :
        1.Create File
        2.Read File
        3.Update File
        4.Delete File \n`
    );

    let choice = await AskQuestion("Enter Your Choice :");

    switch (choice) {
        case "1":
            await CreateFile();
            break;
        case "2":
            await ReadFile();
            break;
        case "3":
            await UpdateFile();
            break;
        case "4":
            await DeleteFile();
            break;
        default:
            console.log("Invalid Operation");
            rl.close();
            return;
    }
}
Menu();

async function CreateFile() {
    let fname = await AskQuestion("Enter FileName: ");
    let extension = await AskQuestion(
        "Enter Extension You want give this file(.txt, .html, .css , .js, .json , .jsx ) :"
    );
    let valid = ['.txt',' .html', '.css' , '.js', '.json' , '.jsx'];

    if (!valid.includes(extension)) {
        console.error("Invalid Extension");
        let newExt = await AskQuestion("Enter Extension again:");
        extension = newExt;

        let fileName = fname + extension;
        let fData = await AskQuestion("Enter File Data: ");

        fs.writeFile(fileName, fData, "utf-8", (err, data) => {
            console.log("File Created sucessFuly!!");

            return Menu();
        });
    } else if(valid.includes(extension)) {
       
        let fileName = fname + extension;
        let fData = await AskQuestion("Enter File Data: ");

        fs.writeFile(fileName, fData, "utf-8", (err, data) => {
            console.log("File Created suncessFuly!!");

            return Menu();
        });
    }
}

async function ReadFile() {
    let fread = await AskQuestion("Enter Filename You want to read ");

    fs.readFile(fread, "utf-8", (err, data) => {
        console.log(`data in ${fread} is: ${data}`);
        return Menu();
    });
}

async function UpdateFile() {
    let updateFile = await AskQuestion("Enter FileName You Want to Update it:");
    let updateData = await AskQuestion("Enter Data to update in this file");

    fs.appendFile(updateFile, updateData, "utf-8", (err, data) => {
        console.log("File Updated Successfully");
        return Menu();
    });
}

async function DeleteFile() {
    let deleteF = await AskQuestion("Enter Filename You want to Delete : ");

    fs.unlink(deleteF, (err) => {
        if (err) {
            console.log("File doesn't exist");
        } else {
            console.log("file deleted Successfully!!");
        }
        return Menu();
    });
}
