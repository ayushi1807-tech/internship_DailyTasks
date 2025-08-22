const dotenv = require("dotenv");
const User = require("../Models/User");
const Module = require("../Models/Module");
const Role = require("../Models/Role");
const bcrypt = require("bcrypt");
dotenv.config();

const SeederFunc = async (req, res) => {
  try {
    const superadmin = await User.find({});
    if (superadmin) {
      const modulesArr = [
        "user Management",
        "Patients Records",
        "appointments",
        "reports & Analytics",
      ];
      const moduleDocs = await Module.insertMany(
        modulesArr.map((modulesnames) => ({ modulesnames }))
      );
      const moduleId = moduleDocs.map((doc) => doc._id);

      const role = await Role.create({
        name: "Super Admin",
        modules: moduleId,
      });

      const newSuperAdmin = await User.create({
        name: "Super Admin",
        email: process.env.SUPER_ADMIN_EMAIL,
        password: process.env.SUPER_ADMIN_PASSWORD,
        role: role._id,
      });

      const usercreate = await User.findById(newSuperAdmin._id)
        .select("-password")
        .populate({ path: "role", select: "name" });

      console.log(usercreate);
      return res.status(201).json({
        message: usercreate,
      });
    } else {
      return res.status(200).json({ message: "Super Admin already exists." });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const CreateUser = async (req, res) => {
  try {
    const existsuperadmin = await User.findOne({
      name: "Super Admin",
    });
    if (!existsuperadmin) {
      return res.json({ messege: "Super admin not found" });
    }
    const { name, email, password, role } = req.body;

    if (role == "Doctor") {
      const patientRecord = await Module.findOne({
        modulesnames: "Patients Records",
      });
      const appointment = await Module.findOne({
        modulesnames: "appointments",
      });

      const roleid = await Role.create({
        name: "Doctor",
        modules: [patientRecord._id, appointment._id],
      });
      const doctor = User.insertOne({
        name,
        email,
        password,
        role: roleid,
      });
      return res.json({
        message: doctor,
      });
    } else if (role == "admin") {
      const userRecord = await Module.findOne({
        modulesnames: "user Management",
      });
      const patientRecord = await Module.findOne({
        modulesnames: "Patients Records",
      });
      const appointment = await Module.findOne({
        modulesnames: "appointments",
      });
      const reportsRecord = await Module.findOne({
        modulesnames: "reports & Analytics",
      });

      const roleid = await Role.create({
        name: "admin",
        modules: [
          patientRecord._id,
          appointment._id,
          userRecord._id,
          reportsRecord._id,
        ],
      });
      const Admin = User.insertOne({
        name,
        email,
        password,
        role: roleid,
      });
      return res.json({
        message: Admin,
      });
    } else if (role == "patient") {
      const patientRecord = await Module.findOne({
        modulesnames: "appointments",
      });
      const roleid = await Role.create({
        name: "Patient",
        modules: [patientRecord._id],
      });

      const createpatient = User.insertOne({
        name,
        email,
        password,
        role: roleid,
      });
      return res.json({
        messege: createpatient,
      });
    } else {
      return res.json({ messege: "hello" });
    }
  } catch (error) {
    return res.json({ messege: error });
  }
};

const login = async (req, res) => {
  try {
    const {name, password } = req.body;
    const finduser = await User.findOne({ name:name , password:password});

    if(!finduser){
        return res.status(400).json({ message: "Invalid Credentials!!" });
    }else{
        const user = await User.aggregate([
        {
                $match:{
                name:name}
        },
        {
                $lookup:{
                       from:"roles",
                       localField:"role" ,
                       foreignField:"_id",
                       as:"Role_Details",
                    pipeline:[
                       {
                        $lookup:{
                                from:"modules",
                                localField:" modules",
                                foreignField:"_id",
                                as:"Modules_Details"
                        }
                       },
                      {
                        $project:{
                                modulesnames:1,
                                modules:1,
                                modules_Details:{modulesnames:1}
                        }
                      }
                    ]
                },
                
        },
        {
                        $project:{
                            name:1,
                            Role_Details:1,
                            email:1,
                            password:1   
                        }
                }
    ])
        return res.json({message:user})
    }
    




  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};
module.exports = { SeederFunc, CreateUser, login };
