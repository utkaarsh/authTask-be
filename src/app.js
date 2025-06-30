const express = require("express");
const app = express();
const PORT = 5000;

app.use((req, res) => {
  res.send("Hello from ther server");
});
app.listen(PORT, () => {
  console.log(`Server sucessfully listening on PORT: ${PORT}`);
});
