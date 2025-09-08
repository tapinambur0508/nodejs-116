import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());

app.get('/movies', (req, res) => {
  res.json({
    data: [
      { title: 'Movie 1' },
      { title: 'Movie 2' },
      { title: 'Movie 3' },
      { title: 'Movie 4' },
    ],
  });
});

app.listen(9090, (error) => {
  // 1500+ 1501, 1502, 8080
  if (error) {
    throw error;
  }

  console.log(`Server started on port 9090`);
});
