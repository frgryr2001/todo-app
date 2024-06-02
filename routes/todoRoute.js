const express = require('express');
const router = express.Router();
const todoModel = require('../models/todo');
router.post('/', (req, res) => {
  // Implement logic to create a new todo item
  const newTodo = req.body; // Assuming the request body contains the new todo item data
  todoModel
    .create(newTodo)
    .then((todo) => {
      res.status(201).json(todo); // Return the created todo item as JSON response
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to create todo item' }); // Handle any error that occurred during creation
    });
});

router.get('/all', (req, res) => {
  todoModel
    .find()
    .select('-__v')
    .then((todos) => {
      res.status(200).json(todos); // Return all todo items as JSON response
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to retrieve todo items' }); // Handle any error that occurred during retrieval
    });
});

router.delete('/:id', (req, res) => {
  // Implement logic to delete a specific todo item based on its ID
  const todoId = req.params.id; // Assuming the request URL contains the ID of the todo item to delete
  todoModel
    .findByIdAndDelete(todoId)
    .then((todo) => {
      if (!todo) {
        return res.status(404).json({ error: 'Todo item not found' }); // Handle the case where the todo item was not found
      }
      res.status(200).json(todo); // Return the deleted todo item as JSON response
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to delete todo item' }); // Handle any error that occurred during deletion
    });
});
router.put('/:id', (req, res) => {
  // Implement logic to update a specific todo item based on its ID
  const todoId = req.params.id; // Assuming the request URL contains the ID of the todo item to update
  const updatedTodo = req.body; // Assuming the request body contains the updated todo item data
  todoModel
    .findByIdAndUpdate(todoId, updatedTodo, { new: true })
    .then((todo) => {
      if (!todo) {
        return res.status(404).json({ error: 'Todo item not found' }); // Handle the case where the todo item was not found
      }
      res.status(200).json(todo); // Return the updated todo item as JSON response
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to update todo item' }); // Handle any error that occurred during update
    });
});
module.exports = router;

module.exports = router;
