const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: false
  }
});

// KULLANICI LİSTESİ (Hafıza)
let onlineUsers = {}; 

app.get('/', (req, res) => {
  res.send('Netflix Party Chat Sunucusu Aktif! 💬');
});

io.on('connection', (socket) => {
  console.log('Yeni bağlantı:', socket.id);

  // 1. KULLANICI GİRİŞ YAPTIĞINDA
  socket.on('join', (username) => {
    onlineUsers[socket.id] = username;
    // Herkese duyur
    io.emit('systemMessage', { text: `👋 ${username} odaya katıldı.` });
    console.log(`${username} katıldı.`);
  });

  // 2. BİRİ YAZMAYA BAŞLADIĞINDA
  socket.on('typing', () => {
    const user = onlineUsers[socket.id];
    if (user) {
      // Gönderen hariç herkese "Yazıyor..." de
      socket.broadcast.emit('displayTyping', { user: user });
    }
  });

  // 3. NORMAL CHAT MESAJI
  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg);
  });

  // --- VİDEO SENKRONİZASYON ---
  socket.on('play', (data) => socket.broadcast.emit('play', data));
  socket.on('pause', (data) => socket.broadcast.emit('pause', data));
  socket.on('seek', (data) => socket.broadcast.emit('seek', data));

  // 4. KULLANICI ÇIKTIĞINDA (Sekmeyi kapattığında)
  socket.on('disconnect', () => {
    const user = onlineUsers[socket.id];
    if (user) {
      io.emit('systemMessage', { text: `🚪 ${user} ayrıldı.` });
      delete onlineUsers[socket.id];
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
