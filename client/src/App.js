import io from 'socket.io-client'
import { useEffect, useState } from 'react'

const socket = io.connect('http://localhost:3001')
const ROOM_COUNT = 5

function App() {
  
  const [room, setRoom] = useState(0)
  const [messageList, setMessageList] = useState([])
  const [message, setMessage] = useState('')

  const getRoomButtons = () => {
    const rooms = []
    for (let i = 0; i < ROOM_COUNT; i++) {

      const joinRoom = () => {
        socket.emit('join_room', i + 1)
        setRoom(i + 1)
        setMessageList([])
        document.getElementById('input').value = ''
      }

      rooms.push(
        <div onClick={joinRoom}>Room {i + 1}</div>
      )
    }
    return rooms
  }

  const sendMessage = () => {
    document.getElementById('input').value = ''
    socket.emit('message', {message, room})

    const newMessageList = [...messageList]
    newMessageList.push(<p style={{textAlign: 'right'}}>{message}</p>)
    setMessageList(newMessageList)
  }

  const onReceive = (data) => {
    const newMessageList = [...messageList]
    newMessageList.push(<p style={{textAlign: 'left'}}>{data}</p>)
    setMessageList(newMessageList)
  }

  useEffect(() => {
    socket.on('receive', onReceive)
  }, [socket, messageList])

  return (
    <div className='app'>
      <div className='container'>
        <div className='room-list'>
          {getRoomButtons()}
        </div>
        <div className='chat-ui'>
          {room === 0 ? <h1>Join a room to chat.</h1> : 
          <>
            <div className='chat-box'>
              {messageList}
            </div>
            <div className='message-inputs'>
              <input id='input' type='text' onChange={(e) => setMessage(e.target.value)}/>
              <div onClick={sendMessage} className='send-button'>SEND</div>
            </div>
          </>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
