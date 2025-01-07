const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const { createResponse } = require("../utils/response.util");

module.exports.create = async (req, res) => {
  try {
    const { fullname: { firstname, lastname }, email, password } = req.body;

    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return createResponse(res, 400, false, "Validation failed", null, errors.array());
    }

    // Check if user already exists
    const existUser = await userModel.findOne({ email });
    if (existUser) {
        return createResponse(res, 409, false, "User already exists");
    }

    // Hash password and create new user
    const hashPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
      fullname: { firstname, lastname },
      email,
      password: hashPassword,
    });

    // Generate auth token and return response
    const token = user.generateAuthToken();
    console.log("token", token);
    return createResponse(res, 200, true, "User created successfully", { user, token });

  } catch (error) {
    console.error("Error in registerUser:", error.message);
    return createResponse(res,500, false, "Internal Server Error", error.message);
  }
};
