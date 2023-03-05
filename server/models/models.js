const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // collection : [{recipe1, recipe2, recipe3}, {recipe1,recipe2,recipe3}]
  collections: [{ type: Schema.Types.ObjectId, ref: "collection" }],
  proteinGoal: { type: Number, required: true },
  carbGoal: { type: Number, required: true },
  fatGoal: { type: Number, required: true },
});

const User = mongoose.model("user", userSchema);
const recipeSchema = new Schema({
  label: String,
  image: String,
  shareAs: String,
  yield: Number,
  dietLabels: Array,
  healthLabels: Array,
  cautions: Array,
  calories: Number,
  carbs: Number,
  protein: Number,
  fat: Number,
  cuisineType: Array,
  totalTime: Number,
});
const Recipe = mongoose.model("recipe", recipeSchema);

const collectionSchema = new Schema({
  name: { type: String, required: true },
  totalCarbs: Number,
  totalProtein: Number,
  totalFat: Number,
  totalCalories: Number,
  recipeIds: [{ type: Schema.Types.ObjectId, ref: "recipe" }],
});

const Collection = mongoose.model("collection", collectionSchema);

module.exports = { User, Recipe, Collection };

/**
 * Hint: Why is bcrypt required here?
 */
// const SALT_WORK_FACTOR = 10;
// const bcrypt = require('bcryptjs');

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
