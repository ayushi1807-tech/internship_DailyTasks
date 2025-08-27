const path = require("path");
const fs = require("fs");
const CsvStudent = require("csv-stringify");
const csv = require("csv-parser");
const student = require("../Model/stdNodel");
const Country = require("../Model/Country");
const State = require("../Model/State");
const City = require("../Model/City");
const multer = require('multer')
const CsvToJson = require('csvtojson')
const Course_name = require('../Model/Course')

const Create = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      country_name,
      state_name,
      city_name,
      age,
      course,
    } = req.body;


    let country = await Country.findOne({ name: country_name });
    if (!country) {
      country = await Country.create({ name: country_name });
    }

    let state = await State.findOne({ name: state_name, country: country._id });
    if (!state) {
      state = await State.create({ name: state_name, country: country._id });
    }

    let city = await City.findOne({ name: city_name, state: state._id });
    if (!city) {
      city = await City.create({ name: city_name, state: state._id });
    }

    let courseName = await Course_name.findOne({ name: course, state: course._id });
    if (!courseName) {
      courseName = await Course_name.create({ name: course, state: course._id });
    }



    const Student = await student.create({
      name,
      email,
      phone,
      country: country._id,
      state: state._id,
      city: city._id,
      age,
      course,
    });
    res.status(201).json(Student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




const Get = async (req, res) => {
  try {
    const docs = await student
      .find()
      .populate("country")
      .populate("state")
      .populate("city");

    res.json(docs);
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
  const Student = await student.find({
    name: { $regex: req.params.name, $options: "i" },
  });
  res.json(Student);
};

const Sort = async (req, res) => {
  const sorted = await student.find({}).sort({ createdAt: -1 });
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
    const alldata = await student.find({}).populate("country").populate('state').populate('city');
    let datatext = CsvStudent.stringify(
      alldata,
      {
        header: true,
        columns: {
          name: "Student_name",
          age: "Student_age",
          course: "Student_course",
          country: "Student_Country",
          state: "Student_State",
          city: "Student_City",
          phone: "Student_Phone",
          email: "Student_email"

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

// const imported = async (req, res) => {
//   try {
//     const filepath = req.file.path;
//         console.log(filepath)
//         const students = await CsvToJson().fromFile(filepath)
 
//         for(const student of students){
//             const { name, email, phone, country, state, city, course } = student;
//             const countrydata =   await Country.create({ country : country?.toLowerCase()});
//             const citydata = await City.create({ city : city.toLowerCase()});
//             const statedata = await State.create({ state : state.toLowerCase()})

//             let courseArr = [];
//         if (Array.isArray(course)) {
//             courseArr = course;
//         } else if (typeof course === "string" && course.trim() !== "") {
//             courseArr = course.split(",").map(c => c.trim());
//         }
 
//         let courseIds = [];
//         if(courseArr.length > 0){
//             courseIds = await Promise.all(
//             courseArr.map(async (coursename) => {
//                     let coursedata = await course.findOne({name : coursename.toLowerCase()})
//                     if(!coursedata){
//                         coursedata = await course.create({ name : coursename.toLowerCase() })
//                     }
//                     return coursedata?._id
//                 })
//             )
//         }
//       await student.findOneAndUpdate({phone },{
//                 name : name.toLowerCase(),
//                 email: email.toLowerCase(),
//                 country : countrydata._id,
//                 state : statedata._id,
//                 city : city._id,
//                 course : courseIds },{
//                 upsert : true, new : true , setDefaultsOnInsert : true
//         })
//  }
 
//  return res.json({
//     message : "user saved successfully",
//  })
//   } catch (error) {
//     console.error('Error during import', error)
//   }
// }

const imported = async (req, res) => {
  try {
    const filepath = req.file.path;
    console.log("File path:", filepath);

   
    const csvStudents = await CsvToJson().fromFile(filepath);

    for (const row of csvStudents) {
      const { name, email, phone, country, state, city, course } = row;

      
      let countrydata = await Country.findOne({ name: country.toLowerCase() });
      if (!countrydata) {
        countrydata = await Country.create({ name: country.toLowerCase() });
      }

      
      let statedata = await State.findOne({ name: state.toLowerCase(), country: countrydata._id });
      if (!statedata) {
        statedata = await State.create({ name: state.toLowerCase(), country: countrydata._id });
      }

     
      let citydata = await City.findOne({ name: city.toLowerCase(), state: statedata._id });
      if (!citydata) {
        citydata = await City.create({ name: city.toLowerCase(), state: statedata._id });
      }

                                                                                                                
      let courseArr = [];
      if (Array.isArray(course)) {
        courseArr = course;
      } else if (typeof course === "string" && course.trim() !== "") {
        courseArr = course.split(",").map((c) => c.trim());
      }

      let courseIds = [];
      if (courseArr.length > 0) {
        courseIds = await Promise.all(
          courseArr.map(async (coursename) => {
            let coursedata = await Course_name.findOne({ coursename: coursename.toLowerCase() });
            if (!coursedata) {
              coursedata = await Course_name.create({ coursename: coursename.toLowerCase() });
            }
            return coursedata._id;
          })
        );
      }

     
      await student.findOneAndUpdate(
        { phone }, 
        {
          name: name.toLowerCase(),
          email: email.toLowerCase(),
          phone,
          country: countrydata._id,
          state: statedata._id,
          city: citydata._id,
          course: courseIds.length > 0 ? courseIds[0] : null, 
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    return res.json({ message: "Users imported successfully" });
  } catch (error) {
    console.error("Error during import", error);
    return res.status(500).json({ message: "Import failed", error: error.message });
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
  imported

};
       