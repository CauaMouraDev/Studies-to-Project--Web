const express = require('express');
const app = express();
 const port = 3000;

 app.get ('/',(req, res) => {
     res.send('Hello World!');  
 });    

app.get('usuario',(req, res) =>{
    res.json({name: 'John Doe',age: 30, occupation: 'Software Developer'});
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});