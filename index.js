const express = require('express')
const port = 3000
const { WebSocketServer } = require('ws')
const wsserver = new WebSocketServer({ port: 443 })
const app = express()
var state = false;

app.use(express.static(__dirname + "/app"));

app.use((req,res) => {
    res.sendFile(__dirname + "/app/main.html")
})

app.listen(port,() => {
    console.log(`Server is running on http://localhost:${port}`);
});

wsserver.on('connection', ws => {
    console.log('1 more button')
    ws.send(state.toString())
    ws.on('close', () => console.log('1 less button'))
    ws.on('message', (data) => {
        data = data.toString();
        if(data == "true" || data == "false"){
            state = data
            console.log("Is the button pressed? " + state)
    wsserver.clients.forEach(client => {
        client.send(data)
    })
}
    })
    ws.onerror = function () {
        console.log('websocket error')
    }
})