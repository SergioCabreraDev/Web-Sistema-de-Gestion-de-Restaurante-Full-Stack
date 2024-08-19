import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {
  
  constructor(private socket: Socket) {}

  // Método para escuchar cambios en el estado del pedido
  onOrderStateChange() {
    return this.socket.fromEvent<string>('/topic/estadoPedido');
  }
  

}
