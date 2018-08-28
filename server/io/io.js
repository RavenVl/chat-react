const IO = ()=>{
    const portIo = 3060;
    const io = require('socket.io')();
    io.on('connection', (client) => {
        client.on('setData', (data) => {
            console.log('client send data ', data);
            io.emit('getData', data);

        });
    });
    io.listen(portIo);
};
module.exports = IO;


