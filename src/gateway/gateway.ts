import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import * as console from "node:console";
import {Server, Socket} from "socket.io";

@WebSocketGateway({
    cors: {
        origins : ['http://localhost:3000', 'https://fishka-pr-5.onrender.com', 'https://fishka.onrender.com']
    },
    namespace: '/comment',
})
export class Gateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() io: Server;


    @SubscribeMessage('addComment')
    handleAddComment(client: Socket, formData: any): void {
        console.log("Добавлен комментарий" + formData)
        const parse = JSON.parse(formData);
        this.io.in(parse.postId).fetchSockets().then(v => console.log(v))
        console.log("Parse form data " + parse.postId)
        console.log("TYPE" + typeof parse.postId.toString())
        this.io.to(parse.postId.toString()).emit("newComment", formData)
    }

    @SubscribeMessage('joinRoom')
    handleJoinRoom(client: Socket, postId: any) {
        const parse = JSON.parse(postId);
        console.log("parse" + parse.postId)
        client.join(parse.postId);
        console.log("TYPE" + typeof parse.postId)
        console.log(`Клиент ${client.id} присоединился к комнате ${parse.postId}`);
    }

    afterInit(server: any): any {
        console.log("INIT");
    }

    handleConnection(client: any, ...args: any[]): any {
        console.log("Connect")

        console.log(`Client id: ${client.id} connected`);
    }

    handleDisconnect(client: any): any {
        console.log("Disconnect");
    }
}