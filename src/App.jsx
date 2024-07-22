import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [socket, setSocket] = useState(null);
  const [newmessage, setnewMessage] = useState("");
  const [message, setMessage] = useState([]);

  useEffect(() => {
    // URL del servidor WebSocket en Django Channels
    // const WS_SERVER_URL = 'ws://localhost:8000/ws/chat/';
    // const WS_SERVER_URL = 'ws://f1df-190-174-248-218.ngrok-free.app/ws/chat/?token=fkdsahjkfshiadjkfhoasdfk';
    const WS_SERVER_URL = 'ws://0d46-190-174-245-109.ngrok-free.app/ws/chat/?token=fkdsahjkfshiadjkfhoasdfk';
    // Crear una instancia de WebSocket y establecer la conexión
    const newSocket = new WebSocket(WS_SERVER_URL);

    // Manejar eventos de WebSocket
    newSocket.onopen = () => {
      console.log('Conexión establecida con el servidor WebSocket');
      // Asignar el objeto WebSocket a nuestro estado después de que se haya establecido la conexión
      setSocket(newSocket);

      console.log(`newSocket: ${newSocket}`);

    };

    newSocket.onmessage = (event) => {
      console.log('Mensaje recibido del servidor:', event.data);
      setMessage(prevMessages => [...prevMessages, event.data]);
      console.log(`Mensaje: ${event}`);

    };
    
    newSocket.onclose = () => {
      console.log('Conexión cerrada con el servidor WebSocket');
    };

    // Devolver una función de limpieza para cerrar la conexión cuando el componente se desmonte
    return () => {
      newSocket.close();
    };
  }, []); // Solo se ejecuta una vez al montar el componente

  const handleSend = (mensaje) => {
    // Verificar que el objeto WebSocket esté definido y que la conexión esté establecida
    if (socket && socket.readyState === WebSocket.OPEN) {
      // Enviar mensajes al servidor WebSocket
      socket.send(mensaje);
    } else {
      console.error('No se puede enviar el mensaje: WebSocket no está listo');
    }
  };

  return (
    <>
      <div>
        <h1>Welcome to the chat</h1>
        <h2>Chat: Insert chat name</h2>
        <h2>welcome Usuario</h2>
        <div className='chat'>
        <div className="chat-box">            
          {message.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
          <div className="chat-input">
            <input type="text" onChange={(e) => setnewMessage(e.target.value)} />
            <button onClick={() => handleSend(newmessage)}>Send</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
