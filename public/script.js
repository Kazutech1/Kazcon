const socket = io();

    const form = document.getElementById('chat-form');
    const usernameInput = document.getElementById('username');
    const messageInput = document.getElementById('message');
    const messages = document.getElementById('messages');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (usernameInput.value && messageInput.value) {
        const messageData = {
          username: usernameInput.value,
          message: messageInput.value,
          timestamp: new Date().toLocaleTimeString()
        };
        socket.emit('chat message', messageData);
        messageInput.value = '';
      }
    });

    socket.on('chat message', (msg) => {
      const item = document.createElement('div');
      item.classList.add('message');
      if (msg.username === usernameInput.value) {
        item.classList.add('sent');
      }
      item.innerHTML = `<strong>${msg.username}</strong> <span class="timestamp">${msg.timestamp}</span><br>${msg.message}`;
      messages.appendChild(item);
      messages.scrollTop = messages.scrollHeight;
    });