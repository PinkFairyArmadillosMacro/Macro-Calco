const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const MONGO_URI = 'mongodb+srv://davidtoyoukim:l8x7HpAUzswq3zCC@macro-calco.xqdajm4.mongodb.net/retryWrites=true&w=majority'

// mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   dbName: 'Macro-Calco'
// })
//   .then(() => console.log('Connected to Mongo DB.'));

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  collections: [{ type: Schema.Types.ObjectId, ref: 'collection' }],
  calorieGoal: Number,
  fatGoal: Number,
  carbsGoal: Number,
  proteinGoal: Number,
});

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt');

userSchema.pre('save', function (next) {
  // Reference: https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
  if (!this.isModified('password')) return next();
  bcrypt
    .hash(this.password, SALT_WORK_FACTOR)
    .then((hash) => (this.password = hash))
    .then(() => next())
    .catch((error) => next(error));
});
// userSchema.pre('save', async function (next) {
//   // Reference: https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
//   const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
// });

// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// userSchema.method('comparePassword', function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// });

const User = mongoose.model('user', userSchema);

const recipeSchema = new Schema({
  label: { type: String, required: true },
  relevance: {},
  image: { type: String, required: true },
  shareAs: { type: String, required: true },
  yield: { type: Number, required: true },
  dietLabels: { type: Array, required: true },
  healthLabels: { type: Array, required: true },
  cautions: { type: Array, required: true },
  calories: { type: Number, required: true },
  fat: { type: Number, required: true },
  carbs: { type: Number, required: true },
  protein: { type: Number, required: true },

  //users: [{relevance: Number, userID: {}}]
});
const Recipe = mongoose.model('recipe', recipeSchema);

const collectionSchema = new Schema({
  name: { type: String, required: true },
  totalCarbs: { type: Number, required: true },
  totalProtein: { type: Number, required: true },
  totalFat: { type: Number, required: true },
  totalCalories: { type: Number, required: true },
  recipes: [{ servings: Number, recipeId: { type: Schema.Types.ObjectId, ref: 'recipe' }}],
});

const Collection = mongoose.model('collection', collectionSchema);

module.exports = { User, Recipe, Collection };
