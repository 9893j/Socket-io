const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const path = require("path");

app.use(express.static(path.join(__dirname, "client")));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('mensagem', (texto) => {
    console.log('mensagem recebida:', texto);

    io.emit('mensagem', {
        id: socket.id,
        texto: texto
    })
  })

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });
});

server.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});