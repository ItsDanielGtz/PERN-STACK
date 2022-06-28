
import React, { useEffect, useState} from 'react'
import { Button, Card, Text} from '@nextui-org/react';
import '../css/tasklist.css'
import { useNavigate } from 'react-router-dom';


export default function tasklist() 
{
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const loadTasks  = async () =>{
    const response = await fetch('http://localhost:3000/tasks');
    const data = await response.json();
    setTasks(data);
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/tasks/${id}`,{
      method: "DELETE",
    })
    // const data = await res.json();
    // console.log(res);

    setTasks(tasks.filter(task => task.id !== id))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() =>{
    loadTasks();
  }, [])


  return (
    <>
      <Text h1>Lista de Tareas</Text>
      {
        tasks.map(task => (
          <Card style={{
            marginBottom: ".7rem",
            backgroundColor: "#1e272e"
          }}
          key={task.id}>
            <Card.Body  >
              <div className="content-card">
                <div>
                  <Text h4>{task.title}</Text>
                  <Text>{task.description}</Text>
                </div>
                <div style={{
                  display: "flex"
                }}>
                  <Button ghost auto color="primary" onClick={() => navigate(`/tasks/${task.id}/edit`)}>
                    Editar
                  </Button>
                  <Button ghost auto  color='error' style={{ marginLeft: ".5rem"}} onClick={() => handleDelete(task.id)} >
                    Eliminar
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))
      }
    </>
  )
  
}
