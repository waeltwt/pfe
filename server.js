const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const createAdmin = require('./createAdmin');

//parse the data
app.use(express.json());
app.use(cors());

const mongoUrl = "mongodb+srv://wael123:waeltouati123@cluster0.qj1q37h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

//Routes

app.use("/api/user", require("./Routes/userRoutes"));
const postRoutes = require("./Routes/postRoutes");
app.use("/api/post", postRoutes);
const dataRoutes = require("./Routes/dataRoutes");
app.use("/api/data", dataRoutes);
const annonceRoutes = require("./Routes/annonceRoutes");
app.use('/api/annonce', annonceRoutes);
const postulerRoutes = require("./Routes/postulerRoutes");
const path = require("path");
app.use('/api', postulerRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log(__dirname)
// Connect database
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
// .then(() => {
  // console.log("database Connected");
  .then(async () => {
    console.log("Database Connected");
    await createAdmin();
  })
  .catch(err => console.log(err.message));

const port = 5000;
app.listen(port, (err) => {
  err ? console.log(err) : console.log("server is running on port 5000");
});
