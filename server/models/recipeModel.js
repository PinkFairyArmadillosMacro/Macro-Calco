const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
* Hint: Why is bcrypt required here?
*/
// const SALT_WORK_FACTOR = 10;
// const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// userSchema.pre('save', function (next) {
//   // Reference: https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
//   if (!this.isModified('password')) return next();
//   bcrypt.hash(this.password, SALT_WORK_FACTOR)
//     .then(hash => this.password = hash)
//     .then(() => next())
//     .catch(error => next(error));
// });

// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// }

// userSchema.method('comparePassword', function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// })

module.exports = mongoose.model('User', userSchema);
