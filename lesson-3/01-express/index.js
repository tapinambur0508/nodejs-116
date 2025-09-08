import express from 'express';

const app = express();

app.get('/movies', (req, res) => {
  res.json({ message: 'Hello, Express:-)' });
});

app.listen(9090, (error) => {
  // 1500+ 1501, 1502, 8080
  if (error) {
    throw error;
  }

  console.log(`Server started on port 9090`);
});
