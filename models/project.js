const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  starting_date: {
    type: String,
    required: true
  },

  ending_date: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    required: true
  },
  importance: {
    type: String,
    enum: ['important', 'medium', 'high'],
    required: true
  }
});

const projects = mongoose.model('project', projectSchema);

module.exports = projects;