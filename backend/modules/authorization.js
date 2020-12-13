const jwt = require("jsonwebtoken");
const option = { expiresIn: "1h", issuer: "infertility", subject: "userInfo" };

module.exports = {
  createToken(payload) {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, process.env.SECRET_KEY, option, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },
  decodeToken(token) {
    return new Promise((resolve, reject) => {
      if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
          if (err) reject(err);
          else resolve(decoded);
        });
      } else {
        reject(new Error("Not signed in."));
      }
    });
  },
};
