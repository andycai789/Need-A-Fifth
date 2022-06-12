import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';  

@Injectable({
	providedIn: 'root'
})
export class SocketService {
	constructor(private socket: Socket) { }

	emitOnline() {
    console.log("HERE");

		this.socket.emit('online');
	} 

	onFetchOnlinePlayers() {
		return this.socket.fromEvent('onlinePlayers');
	}

}