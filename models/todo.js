const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model('Todo', todoSchema);

// when update a todo item, we want to update the updatedAt field to the current date and time.
todoSchema.pre('findOneAndUpdate', function (next) {
  this._update.updatedAt = new Date();
  next();
});

module.exports = Todo;
