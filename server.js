const express = require('express');
const app = express();
const port = 3000;  

import movieRouters from "./routers/movieRouters.js";

// API ROUTES 
app.use("/movies", movieRouters);
// ===========================================================================

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
