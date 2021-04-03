const express = require('express');
const cors = require('cors');
const pool = require('./db')
const path = require('path');
const app = express();


app.use(cors());
app.use(express.json());

//create a vehicle

/*app.post("/vehicles", async (req, res) => {
    try {
        
    } catch (err) {
        console.error(err.message);
    }
});*/

//get all vehicles

app.get("/vehicles", async(req, res) => {
    try {
        const allVehicles = await pool.query("SELECT * FROM vehicle");
        res.json(allVehicles.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get a vehicle

/*app.get("/vehicles/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const vehicle = await pool.query("SELECT * FROM todo WHERE id = $1", {id});
        res.json(vehicle.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});*/

//update a vehicle

/*app.put("/vehicles/:id", async (req, res) => {
    try {
        
    } catch (err) {
        console.error(err.message);
    }
})*/

//delete a vehicles

/*app.delete("/vehicles/:id", async (req, res) => {
    try {
        
    } catch (err) {
        console.error(err.message);
    }
})*/

app.listen(50001, () => console.log('Servidor web operando en el puerto 50001'));
app.use(express.static(path.join(__dirname, 'public')));
