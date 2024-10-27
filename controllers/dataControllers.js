const User = require("../Models/userSchema");
// const ValidateUser = require("../validation/userValidation");

const AddUser = async (req, res) => {
    const { errors, isValid } = ValidateUser(req.body);
    try {
      if (!isValid) {
        res.status(404).json(errors);
      } else {
        await User.findOne({ Email: req.body.Email }).then(async (exist) => {
          if (exist) {
            errors.Email = "User Exist";
            res.status(404).json(errors);
          } else {
            await User.create(req.body);
            res.status(201).json({ message: "User added with success" });
          }
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const FindAllUser = async (req, res) => {
    try {
      const data = await User.find();
      res.status(201).json(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const FindSinglUser = async (req, res) => {
    try {
      const data = await User.findOne({ _id: req.params.id });
      res.status(201).json(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const UpdateUser = async (req, res) => {
    const { errors, isValid } = ValidateUser(req.body);
    try {
      if (!isValid) {
        res.status(404).json(errors);
      } else {
        const data = await User.findOneAndUpdate(
          { _id: req.params.id },
          req.body,
          { new: true }
        );
        res.status(201).json(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const DeleteUser = async (req, res) => {
    try {
      await User.deleteOne({ _id: req.params.id });
      res.status(201).json({ message: "User deleted with success" });
    } catch (error) {
      console.log(error.message);
    }
  };
  
  module.exports = {
    AddUser,
    FindAllUser,
    FindSinglUser,
    UpdateUser,
    DeleteUser,
  };