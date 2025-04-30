
const express = require('express');
const app = express();
const port = 80;



app.use(express.static('client/dist'));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})
