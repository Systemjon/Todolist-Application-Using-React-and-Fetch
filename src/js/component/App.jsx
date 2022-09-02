//import React from "react";
import React, { useEffect, useState } from 'react';

//create your first component
export function App () {
	const [list, setList]= useState([]);
	const [input, setInput]= useState("");
    const API_URL="https://assets.breatheco.de/apis/fake/todos/user/" 

    const createUser = () => {  
        fetch(API_URL+'jflores02', {
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

    const createTask = () => {
        const newTasks = [...list,{ "label": input, "done": false }]
        fetch (API_URL+'jflores02', {
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
    }
    console.log()

    const addTodo = (todo) => {
        const newTodo = {
            id: Math.random(),
            todo: todo,
        };
        
        createTask()
        //agregar todo a la lista 
        setList([...list, newTodo])

            
        //clear input box
        setInput("")
    };

    const deleteTodo = (id) => {
        const newList = list.filter((todo) => todo.id !== id);
        setList(newList);
    }
    useEffect(()=> {
        //createUser()
        //createTask()
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
                        addTodo(input)
                    }
                }}
			/>
			
            <ul className="list-group-item">
                {list.map((todo) => (
                    <li className="separar list-group-item" key={todo.id}>
                        <span>{todo.todo}</span>
                        <button className='boton btn btn-light me-0' onClick={() => deleteTodo(todo.id)}>&times;</button>
                    </li>
                ))}
            </ul>
			</div>
		</div>

	);
};
export default App;