const mongoose = require("mongoose"),
  bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  rule: { type: String, default: "user" },
});

// hash password
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt
    .genSalt()
    .then((salt) => {
      bcrypt
        .hash(user.password, salt)
        .then((hashed) => {
          user.password = hashed;
          next();
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
});

userSchema.methods.comparePassword = function (plainPassword, next) {
  bcrypt
    .compare(plainPassword, this.password)
    .then((isMatch) => {
      next(null, isMatch);
    })
    .catch((err) => next(err));
};

module.exports = mongoose.model("user", userSchema);
