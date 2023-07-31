require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');

db.authenticate()
  .then(() => console.log('Database Connected..!'))
  .catch((err) => console.log(err));

db.sync({ force: false })
  .then(() => console.log('Database Synced..!'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
  console.log(`Server Running in port ${PORT}`);
});
