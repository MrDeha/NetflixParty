// server.js
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" } // Tüm bağlantılara izin ver (geliştirme aşaması için)
});

io.on('connection', (socket) => {
  console.log('Bir kullanıcı bağlandı:', socket.id);

  // Birisi videoyu oynattığında
  socket.on('play', (data) => {
    console.log('Oynatılıyor', data);
    socket.broadcast.emit('play', data); // Mesajı gönderen hariç herkese ilet
  });

  // Birisi videoyu durdurduğunda
  socket.on('pause', (data) => {
    console.log('Durduruldu', data);
    socket.broadcast.emit('pause', data);
  });

  // Birisi süreyi değiştirdiğinde (ileri/geri sarma)
  socket.on('seek', (data) => {
    console.log('Süre değişti', data);
    socket.broadcast.emit('seek', data);
  });
});

server.listen(3000, () => {
  console.log('Sunucu 3000 portunda çalışıyor');
});