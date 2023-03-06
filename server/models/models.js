const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MONGO_URI = 'mongodb+srv://backend:<iq4eJA8jSxukbiI4>@macrocluster.0gmu3hj.mongodb.net/?retryWrites=true&w=majority' 

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  usuUnifiedTopology: true,
  dbName: 'Macro-Calco'
})
  .then(() => console.log('Connected to Mongo DB.'));

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  collections: [{ type: Schema.Types.ObjectId, ref: "collection" }],
  calorieGoal: { type: Number, required: true},
  proteinGoal: { type: Number, required: true },
  carbGoal: { type: Number, required: true },
  fatGoal: { type: Number, required: true },
});

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt');

userSchema.pre('save', function (next) {
  // Reference: https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
  if (!this.isModified('password')) return next();
  bcrypt.hash(this.password, SALT_WORK_FACTOR)
    .then(hash => this.password = hash)
    .then(() => next())
    .catch(error => next(error));
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
}

userSchema.method('comparePassword', function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
})

const User = mongoose.model("user", userSchema);


const recipeSchema = new Schema({
  label: { type: String, required: true},
  servings: { type: Number, required: true},
  image: { type: String, required: true},
  shareAs: { type: String, required: true},
  yield: { type: Number, required: true},
  dietLabels: { type: Array, required: true},
  healthLabels: { type: Array, required: true},
  cautions: { type: Array, required: true},
  calories: { type: Number, required: true},
  carbs: { type: Number, required: true},
  protein: { type: Number, required: true},
  fat: { type: Number, required: true}
});
const Recipe = mongoose.model("recipe", recipeSchema);

const collectionSchema = new Schema({
  name: { type: String, required: true },
  totalCarbs: { type: Number, required: true},
  totalProtein: { type: Number, required: true},
  totalFat: { type: Number, required: true},
  totalCalories: { type: Number, required: true},
  recipeIds: [{ type: Schema.Types.ObjectId, ref: "recipe" }],
});


const Collection = mongoose.model("collection", collectionSchema);

module.exports = { User, Recipe, Collection };
