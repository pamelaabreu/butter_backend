const { app } = require('./app');
const port = 3000;

app.listen(port, () => {
    console.log('Butter API is running on Port: '+port);
  });

module.exports = { app }