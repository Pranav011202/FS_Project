const express  = require("express")
const app = express()

const taskRouter = require("./routes/taskRoutes");
const userRouter = require("./routes/userRoutes"); // Import user routes

const {MONGO_IP, MONGO_PORT, MONGO_USER, MONGO_PASSWORD} = require("./config/config")
const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const mongoose = require("mongoose");
// URI or query string 
// mongodb://username:password@URLOfMOngoDB(IP Address// even better -write the image name):portNumber/?finalQuery
mongoose.connect(
    // "mongodb://root:root@mongo:27017/?authSource=admin"
    MONGO_URL
    )

    .then( () => {
        console.log("Successfully connected to MongoDB");
    })
    .catch((e) => {
        console.log("Error trying to connect to MongoDB", e);
    });

// to handle JSON data in express
app.use(express.json());
//It is Middleware to handle JSON data in express

    
// home page ka URL "/"
app.get("/", (req, res) => {
    res.send("<h1> Hello world using Express and Docker Compose!!!</h1>");
});


// Connecting the task routes
// Here we will call the API defined in the Taskcontroller section
app.use("/api/v1/tasks", taskRouter);
// v1 is version 1

// Connecting the user routes
app.use("/api/v1/users", userRouter); // Now we can access user routes under /api/v1/users


const PORT = process.env.PORT || 3000;
// process.environment.port (port passed here  using environment variable) OR hardcoded 3000

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at PORT : ${PORT}`);
});

