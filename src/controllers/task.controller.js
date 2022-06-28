const pool = require('../db')

const getAllTalks
= async (req, res, next) => {
    try {
        const result = await  pool.query('SELECT * FROM task')
    console.log(result);
    res.json(result.rows) 
    } catch (error) {
        next(error)
    }
 };

 const getTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`SELECT * FROM task WHERE id = ${id}`);
    
         if(result.rows.length === 0)
             return res.status(404).json({
             message: "Task not found",
             });
        res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }
    // res.send('Obtener tarea')
    // console.log(result);

};


const createTask = async (req, res, next) => {
    const {title, description} = req.body;

   try {
        const result = await pool.query('INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *', [title, description]);
    res.json(result.rows[0]);
    console.log(result)
   } catch (error) {
        next(error)
   }
}

const deleteTask = async (req, res, next) => {
    
    try {
        const { id } = req.params;
        const result = await pool.query((`DELETE FROM task WHERE id = ${id}`));

        if(result.rowCount === 0) 
        return res.status(404).json({
            message: "Task not found"
        });

        return res.sendStatus(204) 
    } catch (error) {
        next(error)
    }

}

const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description} = req.body;
        const result = await pool.query(`UPDATE task SET title = '${title}', description = '${description}' WHERE id = ${id}`)
        console.log(result)

        if(result.rowCount === 0) 
        return res.status(404).json({
            message: "Task not found"
        });

        return res.json(result.rows[0]);
        

    } catch (error) {
        next(error)
    }
}


 module.exports = {
    getAllTalks,
    getTask,
    createTask,
    deleteTask,
    updateTask


 }