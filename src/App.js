
import './App.css';
import React,{useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { addTodo,deleteTodo,completeTodo, updateTodo } from './actions/todoActions';
import {Modal,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [task, setTask] = useState("")
  const [editTask, setEditTask] = useState("")
  const [filter, setFilter] = useState("all")
  const todos=useSelector(state=>state.todoReducer)
  const dispatch=useDispatch()
  return (
    <div className="App">
      <div className='container'>
      <input type='text' placeholder='add task...' onChange={(e)=>setTask(e.target.value)}/>
<Button onClick={()=>dispatch(addTodo(task))}>add task</Button>
      <Button onClick={()=>setFilter('all')}>all</Button>
      <Button onClick={()=>setFilter('done')}>done</Button>
      <Button onClick={()=>setFilter('undone')}>undone</Button>
       { filter==='all' ?
        todos.map(el=><div>
       
        <h2>{el.title}</h2>
 
        <Button variant="primary" onClick={handleShow}>
        edit task 
      </Button>
      <Modal show={show} onHide={handleClose}>
       
        <Modal.Body>
          <input type='text' placeholder='edit task...'value={editTask} onChange={(e)=>setEditTask(e.target.value)}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
  variant="primary"
  onClick={() => {
    dispatch(updateTodo(editTask, el.id));
    handleClose();
  }}
>
  Save Changes
</Button>
        </Modal.Footer>
      </Modal>
      <Button onClick={()=>dispatch(deleteTodo(el.id))}>delete</Button>
        <Button onClick={()=>dispatch(completeTodo(el.id))}>{el.complete ?"done":"undone"}</Button>
       </div>):
       filter==='done'? todos.filter(el=>el.complete===true)
      .map(el=><div>
       
        <h2>{el.title}</h2>
        <Button onClick={()=>dispatch(deleteTodo(el.id))}>delete</Button>
        <Button onClick={()=>dispatch(completeTodo(el.id))}>{el.complete ?"done":"undone"}</Button>
       </div>) :todos.filter(el=>el.complete===false)
      .map(el=><div>
       
        <h2>{el.title}</h2>
        <Button onClick={()=>dispatch(deleteTodo(el.id))}>delete</Button>
        <Button onClick={()=>dispatch(completeTodo(el.id))}>{el.complete ?"done":"undone"}</Button>
       </div>)
      
      }
      </div>
 
      
    </div>
  );
}

export default App;
