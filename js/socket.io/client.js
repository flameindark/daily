import io from 'socket.io-client'
import Vue from 'vue/dist/vue'



var socket = io('http://localhost:3000');

new Vue({
  el: '#app',
  template: `
    <div>
      <button @click="createRoom">创建房间</button>
      <ul>
        <li v-for="(item, i) in rooms" :key="item.id">
          <span>{{item.id}}</span>
          <button @click="leave(item.id)" v-if="isJoin(item)">退出</button>
          <button @click="join(item.id)" v-else>加入</button><br/>
          <ul>
            <li v-for="resMsg in item.receiveMsg">{{resMsg}}</li>
          </ul>
          <template  v-if="isJoin(item)" >
            <input v-model="item.sendMsg"/>
            <button @click="sendMsg(item)">send</button>
          </template>
        </li>
      </ul>
    </div>
  `,
  data: {
    rooms: [],
    joinRooms: []
  },
  created() {
    // 初始化房间列表
    socket.on('rooms', (rooms) => {
      this.rooms = rooms.map(item => {
        return {
          ...item, 
          sendMsg: '',
          receiveMsg: []
        }
      })
    })
    
    // 接收房间信息并渲染
    socket.on('room msg', (data) => {
      this.rooms.forEach(item => {
        if(item.id === data.roomId) {
          item.receiveMsg.push(data.msg)
        }
      })
    })

    // 将该用户当前加入的房间存入joinRooms
    socket.on('join_rooms', (rooms) => {
      this.joinRooms = rooms.slice(1);
    })

    // 新增房间成功回调
    socket.on('add room', (room) => {
      this.rooms.push({
        ...room,
        sendMsg: '',
        receiveMsg: []
      })
    })
  },
  methods: {
    createRoom() {
      socket.emit('create room')
    },
    isJoin(item) {
      return this.joinRooms.indexOf(item.id) > -1;
    },
    sendMsg(item) {
      socket.emit('broadcast room', {roomId: item.id, msg: item.sendMsg})
      item.sendMsg = ''
    },
    join(roomId) {
      socket.emit('join room', roomId)
    },
    leave(roomId) {
      socket.emit('leave room', roomId)
    }
  }
})