
const express = require('express')
const cors = require('cors')
const path = require("path");
__dirname = path.resolve();

const app = express()

app.use(cors())

require("dotenv").config();

const dbConfig = require('./config/dbConfig')

app.use(express.json())


const userRoute = require('./routes/userRoute')
const moviesRoute = require('./routes/moviesRoute')
const theatresRoute = require("./routes/theatresRoute");
const upcomingRoute = require('./routes/upcomingRoute')
const bookingsRoute = require('./routes/bookingsRoute')


app.use('/api/users', userRoute)
app.use('/api/movies', moviesRoute)
app.use("/api/theatres", theatresRoute);
app.use("/api/upcoming", upcomingRoute);
app.use("/api/bookings", bookingsRoute);



const port = process.env.PORT || 8081



// render deployment
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
  }

app.listen(port , ()=> console.log(`Node server Running`))