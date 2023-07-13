// require the library
const mongoose = require('mongoose');

// creating Schema for Tasks
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

// create the mongoose model
const Task = mongoose.model('Task', taskSchema);

// exporting the Schema
module.exports = Task;