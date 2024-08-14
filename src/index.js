const express = require("express");
const cors = require("cors")


const app = express();

app.use(cors());
app.use(express.json());


// Routes
const userRoutes = require("./modules/users");
app.use("/api", userRoutes);


const PORT = process.env.PORT || 3999

app.listen(PORT, () => {
    console.log(`El Servidor esta corriendo en el el Puerto ${PORT}`);
})