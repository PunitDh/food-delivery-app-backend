const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const AuthHelper = {
  hashPassword: async (password) => {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    return await bcrypt.hash(password, salt);
  },
  comparePassword: async (loginPassword, hashedPassword) => {
    return await bcrypt.compare(loginPassword, hashedPassword);
  },

  createJWT: (user) => {
    return JWT.sign(user, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
      algorithm: "HS256",
    });
  },
};

module.exports = AuthHelper;
