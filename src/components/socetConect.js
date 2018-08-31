import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:3060');
function socetConect(cb) {
    socket.on('getData', data => {
        console.log('getData:-', data);
        cb(null, data);
    });

}
function sendData(data){
    socket.emit('setData', data);
}
export {socetConect, sendData } ;