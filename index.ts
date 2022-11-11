import express from 'express'
import { Server as SocketServer } from 'socket.io'
import { createAdapter } from 'socket.io-amqp0'
import { connect } from 'amqplib'
import { createServer } from 'http'

const app = express()
const httpServer = createServer(app);

app.use(express.static('public'))
app.set('view engine', 'ejs')

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.render('index', { port })
})

;(async () => {
  const rabbitMQSettings = {
    user: 'username',
    password: 'password',
    host: 'localhost:5672',
  }

  const io = new SocketServer(httpServer)
  io.adapter(createAdapter({ amqpConnection: () =>  connect(`amqp://${rabbitMQSettings.user}:${rabbitMQSettings.password}@${rabbitMQSettings.host}`) }));

  io.on('connection', socket => {
    const { port } = socket.handshake.auth

    console.log('new connection', port)

    socket.on('send', ({ message, username }) => {
        const user = username || `unknown-from-${port}`
        console.log('message event', message, user)
        io.emit('send', { message, username: user })
    })
  })

  httpServer.listen(port, () => {
    console.log(`Server Running on ${port}`)
  })
})()
