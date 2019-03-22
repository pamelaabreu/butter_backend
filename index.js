const { app } = require('./app');
const port = 3000;

app.listen(process.env.PORT || port, () => {
    console.log(`Butter API is running on Port: ${process.env.PORT || port} port`);
  });

module.exports = { app }