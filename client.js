


    if (!window.WebSocket) {
        alert("Не поддерживаются веб-сокеты!!!");
    }


    let Socket = new WebSocket("ws://localhost:8081");

    document.getElementById("message").addEventListener('submit', function (event) {
        Socket.send(this.message_text.value);
        event.preventDefault();
        return false;
    });

    Socket.onmessage = function (event) {
        let data = event.data;
        let containerMessage = document.createElement('div');
        let textNode = document.createTextNode(data);
        containerMessage.appendChild(textNode);
        document.getElementById('chat').appendChild(containerMessage);
    };

