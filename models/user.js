import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },

  details: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ['yes', 'no', 'maybe'],
    default: 'maybe',
    required: true,
  }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  email:
    { type: String},

  events: [eventSchema],

});

const User = mongoose.model("User", userSchema)

export default User;





