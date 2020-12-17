const mongoose = require("mongoose"),
  bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  rule: { type: String, default: "user" },
  like: { type: Array },
  history: { type: Array },
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
// hash password
userSchema.pre("updateOne", function (next) {
  const user = this;
  bcrypt
    .genSalt()
    .then((salt) => {
      bcrypt
        .hash(user._update.password, salt)
        .then((hashed) => {
          user._update.password = hashed;
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
