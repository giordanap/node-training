const Server = require('./server');

const server = new Server();
server.listen();

// const { s3 } = require('./helpers/awsS3');
// const fs = require('fs');

// s3.listBuckets({}, (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });

// const parametros = {
//     Bucket: 'demo-s3-node'
// }

// s3.listObjectsV2( parametros, (err, data) => {
    //     if (err) throw err;
    //     console.log(data);
    // });
    
// const paramGetObject = {
//     Bucket: 'demo-s3-node',
//     Key: 'PatyYNico.jpg'
// }
// s3.getObject( paramGetObject, (err, data) => {
//     if (err) throw err;
//     console.log(data);
//     fs.writeFile('PatyYNico-s3.jpg', data.Body, 'binary', (err) => {
//         if (err) throw err;
//         console.log('Imagen grabada en el disco');
//     })
// })

// fs.readFile('information.txt', (err, data) => {
//     if (err) throw err;
//     const paramPutObject = {
//         Bucket: 'demo-s3-node',
//         Key: 'information.txt',
//         Body: data
//     }
//     s3.putObject(paramPutObject, (err, data) => {
//         if (err) throw err;
//         console.log(data);
//     })
// })