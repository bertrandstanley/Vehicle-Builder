import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

// Example route
app.get('/', (req, res) => {
  res.send('Vehicle Builder API');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
