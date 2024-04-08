const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const user = require("../../models/user");

module.exports = {
  createUser: async (args, req) => {
    const { email, password } = args.userInput;

    try {
      const findUser = await user.findOne({ email: email });

      if (findUser) {
        throw new Error("user already exist");
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const userCreated = await user.create({
          email: email,
          password: hashPassword,
        });

        return userCreated;
      }
    } catch (error) {
      throw error;
    }
  },

  login: async (args) => {
    const { email, password } = args;

    const foundUser = await user.findOne({ email: email });
    if (!foundUser) {
      throw new Error("user not found");
    }
    const isEqual = await bcrypt.compare(password, foundUser.password);

    console.log(isEqual);
    if (!isEqual) {
      throw new Error("password not valid");
    }
    const token = jwt.sign(
      { userId: foundUser.id, email: foundUser.email },
      process.env.TOKEN_SECRETE,
      {
        expiresIn: "1h",
      }
    );
    console.log(token);
    return { userId: foundUser.id, token, tokenExpiration: 1 };
  },
};
