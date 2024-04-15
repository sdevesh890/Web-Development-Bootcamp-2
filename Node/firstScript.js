const fs = require('fs');
const math = require('./Project/app');
// console.log("Hello this is node js");
// console.log(process.argv);
// const folderName  = process.argv[2] || 'Project';

// File System module
//Asynchronous
// fs.mkdir('Dogs',{recursive:true} , (err)=>
// {
//     console.log('IM INSIDE THE FS');
//     if(err) throw err;
// })
// console.log('AFTER THE FS');

//Synchronous
// fs.mkdirSync(folderName);

// try {
//     fs.writeFileSync(`${folderName}/index.html`,'');
//     fs.writeFileSync(`${folderName}/app.css`,'');
//     fs.writeFileSync(`${folderName}/app.js`,'');
// } catch (error) {
//     throw error
// }

// Module exports 
console.log(math.add(1,2));
console.log(math.square(4));