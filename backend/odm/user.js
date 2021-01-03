const mongoose = require("mongoose"),
  bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  rule: { type: String, default: "user" },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
  history: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
});

// hash password
userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
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
            throw err;
          });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }
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
