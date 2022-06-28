const { Router } = require ('express');
const { getAllTalks,
    getTask,
    createTask,
    deleteTask,
    updateTask
 } = require('../controllers/task.controller');
const router = Router();

router.get('/tasks', getAllTalks)

router.get('/tasks/:id', getTask)

router.post('/tasks', createTask)

router.delete('/tasks/:id', deleteTask)

router.put('/tasks/:id', updateTask )

module.exports = router;