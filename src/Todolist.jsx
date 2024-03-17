import {React,useState,useEffect} from 'react'

const Todolist=() => {
    const [todos,setTodos] = useState([]);
    const [editingTodoId, setEditingTodoId] = useState(null);
    useEffect(() => {
        fetchTodos();
      }, []);
      const fetchTodos = () => {
        fetch('https://ghc-applications-api.vercel.app/todos')
          .then((res) => res.json())
          .then((data) => {
            setTodos(data);
          })
          .catch((err) => {
            console.log(err.message);
          });
      };
    useEffect(()=>{
        fetch('https://ghc-applications-api.vercel.app/todos')
        .then(res=>{
          return res.json();
        })
        .then(data=>{
          setTodos(data);
        })
        .catch(err=>{
          console.log(err.message);
        })
      },[])
      const handleDelete = async (id)=>{
        try{
            await fetch(`https://ghc-applications-api.vercel.app/todos/${id}`,{
                method:'DELETE',
            });
            setTodos(todos.filter(todo => todo.id !== id));
        }
        catch(err){
            console.error('Error deleting:',err);
        }
      };
      const handleDone = async (id) => {
            try {
              const response = await fetch(`https://ghc-applications-api.vercel.app/updatetodos`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  id:id,
                  completed:true,
                }),
              });
              if (!response.ok) {
                throw new Error('Failed to update todo title');
              }
              // Since the API response doesn't include the entire updated todo object,
              // directly update the state based on the id and new title. 
              setTodos(todos.map(todo => todo.id === id ? { ...todo, completed:true } : todo));
            } catch (error) {
              console.error('Error updating todo title:', error);
            }
          };
        


      

  return (
    <div>
      <ul>
      {todos.map((todo) => (
          <div key={todo.id}>
            <li>
              {editingTodoId === todo.id ? (
                <input
                  type="text"
                  value={todo.title}
                  autoFocus
                />
              ) : (
                <>
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}></span>
                  {todo.title}
                  <button onClick={() => handleDone(todo.id)}>Done</button>
                  <button onClick={() => handleDelete(todo.id)}>Delete</button>
                </>
              )}
            </li>
          </div>
        ))}
    </ul>
    </div>
  )
}

export default Todolist
