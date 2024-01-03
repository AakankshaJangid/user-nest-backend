const express = require("express");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

connectDb();
app.use(cors());
app.use(express.json());
app.use("/api/users",require("./routes/userRoute"))
app.use("/api/admin",require("./routes/adminRoute"))

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`)
})