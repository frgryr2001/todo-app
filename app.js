const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app = express();
const PORT = 9000;
const todoRouter = require('./routes/todoRoute');
app.use(express.json({ limit: '10kb' }));

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
console.log('Password: ', process.env.DATABASE_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/api/v1/todos', todoRouter);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
