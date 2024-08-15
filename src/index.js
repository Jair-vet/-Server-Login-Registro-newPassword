const express = require("express");
const cors = require("cors")


const app = express();

// app.use(cors());
// app.use(cors({
//     origin: '*', // Or use '*' to allow all origins
// }));

// app.use(cors({
    //     origin: 'https://ownersclub.stown.mx',
    //     credentials: true, // Enable sending of credentials
// }));
app.use('*', cors()); // Handle preflight requests for all routes
app.use(express.json());


// Routes
const userRoutes = require("./modules/users");
app.use("/api", userRoutes);


const PORT = process.env.PORT || 4012

app.listen(PORT, () => {
    console.log(`El Servidor esta corriendo en el el Puerto ${PORT}`);
})