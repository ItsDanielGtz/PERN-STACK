import React, {useState, useEffect} from 'react'
import { Button, Grid, Text, Input, Loading, Card, Spacer, Textarea } from '@nextui-org/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik'
import { initialValues, validationSchema} from '../helpers/helper.taskform';

export default function taskform() {
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() =>{
    if (params.id) {
      loadTask(params.id)
    } 
  }, [params.id])
  
  const formik = useFormik({
    initialValues ,
    validationSchema,
    onSubmit: async (values, {resetForm}) => {
        
      setLoading(true);
          try { 
          if (editing) {
              await fetch(`http://localhost:3000/tasks/${params.id}`, {
              method: 'PUT',
              body: JSON.stringify(values),
              headers: { 'Content-type' : 'application/json' },
              
              });
          } else {
            //FETCH para mandar los datos a la API por el metodo post
             await fetch('http://localhost:3000/tasks', {
              method: 'POST',
              body: JSON.stringify(values),
              headers: { 'content-type': 'application/json' },
              
            });
          }
          resetForm(values.title = "", values.description = "")
          setLoading(false);
          navigate('/')
          
          } catch (error) {
            console.log(error.message)
          }
    },
    
  })
  // Values obtiene los valores iniciales que tenemos en initialValues
  //HandelChange lo tiene formik
  //Agregaremos a cada input
  const {values, handleSubmit, handleChange, errors, touched, handleBlur, getFieldProps, dirty, isValid} = formik

  const loadTask = async (id) => {
    if (!editing) {
      const res = await fetch(`http://localhost:3000/tasks/${id}`)
      const data = await res.json();
      values.title= data.title;
      values.description = data.description;
      setEditing(true);
    } 
  }
  return (
    <Grid.Container gap={2} justify="center">
        <Grid xs={5} justify="center">
            <Card 
            css={{ mw: "360px" }} 
            style={{
            backgroundColor: "#1e272e",
            padding: "1rem",
            }}>
                <Text h2>
                    {editing ? 'Editar Tarea' : 'Crear Tarea'  }
                </Text>
                <Card.Body >
                    <form onSubmit={handleSubmit} >
                        <Spacer y={1.6}/>
                        <Input name= "title" labelPlaceholder="Titulo de la Tarea" width='300px'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title}
                            helperColor="error"
                            helperText = {errors.title && touched.title ? `${errors.title}` : null}
                            />
                        <Spacer y={2.2}/>
                        <Textarea rows={4} name="description" labelPlaceholder="Descripción" width='300px'
                            {...getFieldProps('description')}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                            helperColor="error"
                            helperText = {errors.description && touched.description ? `${errors.description}` : null}
                        />
                        <Spacer y={1.6}/>
                        <Button 
                            type='submit'
                             disabled ={!(isValid && dirty) && editing === false}>
                                {loading ? <Loading type="points" color="white" /> : 'Guardar'} 
                        </Button>
                    </form>
                </Card.Body>
            </Card>
        </Grid >
    </Grid.Container>
  )
}
