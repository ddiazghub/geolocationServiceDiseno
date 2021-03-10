const express = require('express');
const app = express();
app.listen(50001, () => console.log('Recibiendo requests en el puerto 50001'));
app.use(express.static('public'));