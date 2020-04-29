import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 4000 });

//wait client data
wss.on('connection', function connection(ws) {
  ws.on('message',function(message) {
    var chat = JSON.parse(message)
    if (chat.type == 'username')  {
      ws.username = chat.data
    }

    if (chat.type == 'message') {
      message = `${ws.username} : ${chat.data}`
      wss.clients.forEach(element => {
        element.send(message)
      });
    }

    
    //console.log(ws)
    //console.log("----------------------------------------")
    //console.log(wss.clients)
  
    //storee
  })



  ws.on('close', function () {
    console.log("lost"+ws.username)
  })
  
});
