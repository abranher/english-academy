import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

import { PrismaService } from 'src/modules/prisma/providers/prisma.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly prisma: PrismaService) {}

  @SubscribeMessage('client:get_notifications')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data) {
    console.log('Client connected: ', data);
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    console.log('Client connected: ', client.id);

    /* this.prisma.$on('query', async (e) => {
      if (e.query.includes('INSERT INTO "Notification"')) {
        const notifications = await this.prisma.notification.findMany();

        this.server.emit('notifications', notifications);
      }
    }); */

    const notifications = await this.prisma.notification.findMany();

    this.server.emit('notifications', notifications);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('Client disconnected: ', client.id);
  }
}
