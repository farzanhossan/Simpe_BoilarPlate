import app from './app';

const port: any = process.env.PORT || 3000;

new app().start(port)
  .then(port => console.log(`Server running on port ${port}`))
  .catch(error => {
    console.log(error)
    process.exit(1);
  });