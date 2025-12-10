const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// KULLANICI LİSTESİ (Hafıza)
let onlineUsers = {}; 

app.get('/', (req, res) => res.send('Netflix Party: Sync & Chat Sunucusu Aktif! 🚀'));

io.on('connection', (socket) => {
  console.log(`🔌 Bağlantı: ${socket.id}`);

  // --- 1. KULLANICI GİRİŞ/ÇIKIŞ YÖNETİMİ ---
  socket.on('join', (username) => {
    onlineUsers[socket.id] = username;
    // Herkese duyur (Sistem Mesajı)
    io.emit('systemMessage', { text: `👋 ${username} odaya katıldı.` });
    console.log(`${username} katıldı.`);
  });

  socket.on('disconnect', () => {
    const user = onlineUsers[socket.id];
    if (user) {
      io.emit('systemMessage', { text: `🚪 ${user} ayrıldı.` });
      delete onlineUsers[socket.id];
    }
  });

  // --- 2. CHAT ÖZELLİKLERİ ---
  socket.on('chatMessage', (data) => {
    // Mesajı herkese gönder
    io.emit('chatMessage', data);
  });

  socket.on('typing', () => {
    const user = onlineUsers[socket.id];
    if (user) {
      // Gönderen hariç herkese "Yazıyor..." bilgisini at
      socket.broadcast.emit('displayTyping', { user: user });
    }
  });

  // --- 3. VİDEO SENKRONİZASYON (Yankı Yapmadan Dağıt) ---
  socket.on('play', (data) => {
    console.log(`▶️ Play: ${data.time}`);
    socket.broadcast.emit('play', data);
  });

  socket.on('pause', (data) => {
    console.log(`⏸️ Pause: ${data.time}`);
    socket.broadcast.emit('pause', data);
  });

  socket.on('seek', (data) => {
    console.log(`⏩ Seek: ${data.time}`);
    socket.broadcast.emit('seek', data);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});
