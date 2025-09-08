import express from 'express';

const app = express();

function middleware(req, res, next) {
  console.log('Local middleware');
  next();
}

app.use((req, res, next) => {
  const random = Math.random();

  console.log(random);

  if (random < 0.5) {
    return res.json({ status: 'Request closed' });
  }

  console.log('Middleware 3');

  next();
});

app.use((req, res, next) => {
  console.log('Middleware 1');
  next();
});

app.use((req, res, next) => {
  console.log('Middleware 2');
  next();
});

app.get(
  '/movies',
  [middleware, middleware, middleware, middleware],
  (req, res) => {
    res.json({ message: 'Hello, Middleware!' });
  },
);

const PORT = 9090;

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log(`Server started on port ${PORT}`);
});
