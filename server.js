let express = require('express');
let hbs = require('hbs');
let fs = require('fs');
let app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  let now = new Date().toString();
  let logInfo = `Time stamp: ${now}, method: ${req.method}, url:${req.originalUrl}`
  console.log();
  fs.appendFileSync('server.log', logInfo + '\n')
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance Page',
//     maintenanceMsg: 'This site is currently under maintenance. Please check back later'
//   });

//   next()
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
}); 

hbs.registerHelper('screamIt', (str) => {
  return str.toUpperCase();
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMsg: 'Welcome to my **node-web-server** tutorial exercise ;)'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    aboutMsg: 'Welcome to the about section of **node-web-server** tutorial exercise ;)'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to fulfill this request'
  })
})

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});