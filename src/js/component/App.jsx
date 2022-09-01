//import React from "react";
import React, { useState } from 'react';
//include images into your bundle

//fetch inicio

/*fetch('http://assets.breatheco.de/apis/fake/todos/user', {
    method: "POST",
    .then(response => response.json())  // convertir a json
    .then(json => console.log(json))   //imprimir los datos en la consola
    .catch(err => console.log('Solicitud fallida', err)) // Capturar errores
}*/

//create your first component
export function App () {
	const [list, setList]= useState([]);
	const [input, setInput]= useState("");

    const addTodo = (todo) => {
        const newTodo = {
            id: Math.random(),
            todo: todo,
        };

        //agregar todo a la lista 
        setList([...list, newTodo])

        //clear input box
        setInput("")
    };

    const deleteTodo = (id) => {
        const newList = list.filter((todo) => todo.id !== id);
        setList(newList);
    }

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