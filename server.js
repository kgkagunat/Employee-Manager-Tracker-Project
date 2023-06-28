const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const passport = require('passport')
require('./utils/auth')


const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const initializePassport = require('./utils/auth')
initializePassport(passport, email => {
  return users.find(user => user.email === email),
  id => users.find(user => user.id === id)
})

const app = express();
const PORT = process.env.PORT || 3001;


const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));


app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize())
app.use(passport.session())

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});