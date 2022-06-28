import React from 'react';

import {  Container } from '@nextui-org/react';
import './App.css';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NavBar from './components/navbar';
import TaskList from './components/tasklist';
import TaskForm from './components/taskform';

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
        <Container>
          <Routes>
            <Route path='/' element={ <TaskList/> } />
            <Route path='/tasks/new' element={ <TaskForm/> } />
            <Route path='/tasks/:id/edit' element={<TaskForm />}/>
        </Routes>
        </Container>
     </BrowserRouter>
  )
    

}

export default App;
