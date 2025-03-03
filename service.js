const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let employees = [];

app.get("/employees", (req, res) => res.json(employees));

app.post("/employees", (req, res) => {
    const newEmployee = { id: Date.now(), ...req.body };
    employees.push(newEmployee);
    res.json(newEmployee);
});

app.delete("/employees/:id", (req, res) => {
    
    employees = employees.filter(emp => emp.id != req.params.id);
    res.json({ message: "Deleted" });
});

app.listen(5001, () => console.log("Server running on port 5001"));
