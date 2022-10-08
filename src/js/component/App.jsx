//import React from "react";
import React, { useEffect, useState } from 'react';

//create your first component
export function App () {
	const [list, setList]= useState([]);
	const [input, setInput]= useState("");
    const [count, setCount] = useState(0);
    const API_URL="https://assets.breatheco.de/apis/fake/todos/user/" 

    const createUser = async () => {  
        const response = await fetch(API_URL+'jflores02', {
            method: "POST",
            body: JSON.stringify([]),
            headers: {"Content-type": "application/json"}
        })
        .then(response => {
            console.log(response)
            if (response.ok){
                return response.json()       
            }
            new Error("Ocurrio un error con la solicitud")
        }) 
        .then(json => console.log(json))
        .catch(err => console.log(err))
    }

    const deleteUser = async () => {  
        const reponse = await fetch(API_URL+'jflores02', {
            method: "DELETE",
            headers: {"Content-type": "application/json"}
        })
        .then(response => {
            console.log(response)
            if (response.ok){
                response.json()
                createUser()
                setList([])       
            }
            new Error("Ocurrio un error eliminando User")
        }) 
        .then(json => console.log(json))
        .catch(err => console.log(err))
    }

    const createTask = () => {
        const newTasks = [...list,{ "label": input, "done": false }]
        const request = fetch (API_URL+'jflores02', {
            method: "PUT",
            body: JSON.stringify(
                newTasks 
            ),
            headers: {"Content-type": "application/json"}
        })
        .then(response => {
            console.log(response)
            if (response.ok){
                
                return response.json()       
            }
            new Error("Ocurrio un error en la creacion de la tarea")
        }) 
        .then(json => console.log(json))
        .catch(err => console.log(err))
        return request
    }
    console.log()

    const getTask = () => {
            const request = fetch (API_URL+'jflores02')
            .then(response => {
                console.log(response)
                if (response.ok){
                    
                    return response.json()       
                }
                new Error("Ocurrio un error en la creacion de la tarea")
            }) 
            .then(json => {
                console.log(json)
                setList(json)
            return json
            }
            )
            .catch(err => console.log(err))
        return request    
    }

    const addTodo = async (todo) => {
        const newTodo = {
            done: false,
            label: todo,
            //id: Math.random(),
            //todo: todo,
        };
       
        const taskCreation = await createTask()
        //agregar todo a la lista 
         const update = await getTask()
            
        //clear input box
        setInput("")
    };

    

    const deleteTodo = async (i) => {
        const newList = list.filter((todo, index) => index !== i);
        if (newList.length == 0){
            await deleteUser()
            setList([])
        } 
        
        else {const response = await fetch(API_URL+'jflores02', {
            method: "PUT",
            body: JSON.stringify(
                newList 
            ),
            headers: {"Content-type": "application/json"}
        })
        .then(response => {
            console.log(response)
            if (response.ok){
                
                return response.json()       
            }
            new Error("Ocurrio un error en la creacion de la tarea")
        }) 
        .then(json => {
            console.log(json)
            getTask()
        })
        .catch(err => console.log(err))
    }}
        
    
    useEffect(()=> {
        //createUser()
        //createTask()
        getTask()
    },[])

	return (
		<div className="text-center">
			<h1 className="Todo">todos</h1>
			<div className="file-input">
			<input
				type="text"
            	className="text"
            	value={input}
            	onChange={e => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key == "Enter") {
                        addTodo(input, setCount(count + 1))
                    }
                }}
                
			/>
			
            <ul className="list-group-item">
                {list.map((todo,i) => (
                    <li className="separar list-group-item" key={i}>
                        <span>{todo.label}</span>
                        
                        <button className='boton btn btn-light me-0' onClick={() => deleteTodo(i, setCount(count - 1))}>&times;</button>
                    </li>
                ))}
                <span className="contador">{count +" item left"}</span>
            </ul>
            <div>
                <button className='btn btn-danger mt-3' onClick={(e) => {deleteUser(), setCount((num)=> {
                    return num = 0
                })}}>Eliminar todo</button>
            </div>
			</div>
		</div>

	);
};
export default App;