const express = require('express');
const { PrismaClient } = require('../generated/prisma');
const router = express.Router();

const prisma = new PrismaClient();

// Validation 
const validateTask = (req, res, next) => {
  const { title, color } = req.body;
  
  if (!title || title.trim().length === 0) {
    return res.status(400).json({ error: 'Title is required' });
  }
  
  if (!color || !color.match(/^#[0-9A-Fa-f]{6}$/)) {
    return res.status(400).json({ error: 'Valid color hex code is required' });
  }
  
  next();
};

//  Get all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Create new task
router.post('/tasks', validateTask, async (req, res) => {
  try {
    const { title, color } = req.body;
    
    const newTask = await prisma.task.create({
      data: {
        title: title.trim(),
        color,
      }
    });
    
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Update task
router.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, color, completed } = req.body;
    
    // Check if task exists
    const existingTask = await prisma.task.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    
    if (title !== undefined && title.trim().length === 0) {
      return res.status(400).json({ error: 'Title cannot be empty' });
    }
    
    if (color !== undefined && !color.match(/^#[0-9A-Fa-f]{6}$/)) {
      return res.status(400).json({ error: 'Valid color hex code is required' });
    }
    
    
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        ...(title !== undefined && { title: title.trim() }),
        ...(color !== undefined && { color }),
        ...(completed !== undefined && { completed }),
      }
    });
    
    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete task
router.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    
    const existingTask = await prisma.task.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    const deletedTask = await prisma.task.delete({
      where: { id: parseInt(id) }
    });
    
    res.json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});


process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

module.exports = router;
