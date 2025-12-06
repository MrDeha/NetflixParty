const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Socket.io Ayarları - CORS SORUNUNU ÇÖZEN KISIM BURASI
const io = new Server(server, {
  cors: {
    origin: "*",  // Yıldız (*) demek: "Kim gelirse gelsin kabul et" demektir.
    methods: ["GET", "POST"],
    credentials: false // Bu ayar önemli, * kullanırken false olmalı.
  }
});

app.get('/', (req, res) => {
  res.send('Netflix Party Sunucusu Çalışıyor! (CORS Aktif)');
});

io.on('connection', (socket) => {
  console.log('✅ Biri bağlandı! ID:', socket.id);

  socket.on('play', (data) => {
    console.log('Oynat komutu dağıtılıyor');
    socket.broadcast.emit('play', data);
  });

  socket.on('pause', (data) => {
    console.log('Durdur komutu dağıtılıyor');
    socket.broadcast.emit('pause', data);
  });

  socket.on('seek', (data) => {
    console.log('Süre değiştirme komutu dağıtılıyor');
    socket.broadcast.emit('seek', data);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda dinleniyor...`);
});
