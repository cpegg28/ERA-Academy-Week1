const express = require("express");
const {MongoClient} = require("mongodb");
const app = express (); 
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function startServer() {
    try {
        await client.connect();
        console.log("Connectd to Mongodb");
        const db = client.db("school_demo");
        const studentCollection = db.collection("students");

        await studentCollection.insertOne({
            firstName: "John",
            lastName: "Doe",
            gradeLevel: 10
        });

        app.get("/", (req, res) => {
            res.send("backend connected to mongodb");
        });

        app.listen(3000,() => {
            console.log("server running at http://localhost:3000");
        });
    } catch(error){
        console.error("Error connected to mongodb:", error);
    }
}

startServer();