const userModel = require("../models/user.model");

module.exports.createUser = async ({
  fullname: { firstname, lastname },
  email,
  password,
}) => {
  // console.log("Creating user with:", { firstname, lastname, email, password });
  try {
    if (!firstname || !lastname || !password || !email) {
      throw new Error("All fields are required");
    }

    // Use userModel.create correctly
    const user = await userModel.create({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
    });
    await user.save();
    return user;
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error;
  }
};
