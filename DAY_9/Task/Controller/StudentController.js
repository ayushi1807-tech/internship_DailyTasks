const student = require("../Model/stdNodel");
const path = require("path");
const fs = require("fs");
const CsvStudent = require("csv-stringify");

const Create = async (req, res) => {
  try {
    const Student = await student.create(req.body);
    res.status(201).json(Student);
  } catch (error) {
    res.status(400).json({ error: "Invalid Input" });
  }
};

const Get = async (req, res) => {
  try {
    const Student = await student.find();
    res.json(Student);
  } catch (error) {
    res.status(404).json({ error: "No data Found" });
  }
};

const UpdateByName = async (req, res) => {
  const Student = await student.findOneAndUpdate(
    { name: req.params.name },
    req.body,
    { new: true }
  );
  res.json(Student);
};

const Delete = async (req, res) => {
  try {
    const deleteStudent = await student.findOneAndDelete({
      name: req.params.name,
    });
    if (!deleteStudent) {
      res.status(404).json({ messege: "Student Not Found!!!!" });
    }
    res.send("Student Deleted Sucessfullyy...!!!");
  } catch (error) {
    console.log("Error While Deleting Student", error);
    res.status(500).json({ messege: "Server Error" });
  }
};

const Search = async (req, res) => {
  const Student = await student.find({ name: req.params.name });
  res.json(Student);
};

const Sort = async (req, res) => {
  const sorted = await student.find({}).sort({ name: 1 });
  res.json(sorted);
};

const Count = async (req, res) => {
  const courseStu = await student
    .find({})
    .countDocuments({ course: req.params.course });
  res.send(`number of Students in ${req.params.course} are ${courseStu} `);
};

const CountAll = async (req, res) => {
  const courseStu = await student.find({}).countDocuments({});
  res.send(`Total number of Students ${courseStu}`);
};

const Export = async (req, res) => {
  try {
    const alldata = await student.find({});
    let datatext = CsvStudent.stringify(
      alldata,
      {
        header: true,
        columns: {
          name: "Student_name",
          age: "Student_age",
          course: "Student_course",
        },
      },
      (error, output) => {
        if (error) {
          console.log(error);
        }
        fs.writeFile("student.csv", output, (error, data) => {
          if (error) {
            console.log(error);
          }
          return res.json({
            message: "file created successfully",
          });
        });
      }
    );
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

module.exports = {
  Create,
  Get,
  UpdateByName,
  Delete,
  Search,
  Sort,
  Count,
  CountAll,
  Export,
};
