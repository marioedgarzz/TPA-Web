import { Pipe, PipeTransform } from '@angular/core';
import { ChatRooms } from '../models/chats';

@Pipe({
  name: 'chatPipe'
})
export class ChatPipePipe implements PipeTransform {

  transform(value: ChatRooms[],filters : string, currRole : string): any {
    if(filters == "All") return value
    if(currRole == "Admin") {
      return value.filter(res => res.ChatRoomUserStatus == filters)      
    }
    else {
      return value.filter(res => res.ChatRoomAdminStatus == filters);
    }
  }

}
