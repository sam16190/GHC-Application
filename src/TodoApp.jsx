import {React,useState,useEffect} from 'react'
import Todolist from './Todolist';
const TodoApp=()=> {
    const [todos,setTodos] = useState([]);
    const [title,setTitle] = useState('');

    const handleSubmit= async (e)=>{
        e.preventDefault();
        await addTodo();
        
        
    
      }
      const addTodo=async()=>{
        try{
        const response = await fetch('https://ghc-applications-api.vercel.app/todos',{
          method:'POST',
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify({
            title: title,
          })
        })
        if (!response.ok) {
          throw new Error('Failed to add todo');
        }
        const data =  await response.json();
        setTodos([...todos,data]);
        setTitle('');
      
        // setNewTodo('');
      }
      catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
  <input placeholder='title' type='text' value={title} onChange={(e)=>setTitle(e.target.value)}/>
  
  
  <button type='submit'>Add</button>
  </form>
  <Todolist />
    </div>
  )
}

export default TodoApp
