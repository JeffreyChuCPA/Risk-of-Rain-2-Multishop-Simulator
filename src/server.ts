import express from 'express'
const app = express()
import mongoose from 'mongoose'

const PORT: string | 5000 = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

mongoose.connect('mongodb://localhost/RoR2-Multishop-Simulator')
.then(() => console.log("Connected to Mongodb..."))
.catch((err) => console.error("Could not connect to Mongodb...", err));

app.get("/", (req, res) => {
  //*here is where we usually get stuff from database then return it
  res.send('Hello World');
});