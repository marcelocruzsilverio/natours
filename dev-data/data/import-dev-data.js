const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
); // <PASSWORD> is the placeholder in the connection string
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!')); // eslint-disable-line

// Read JSON file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

// Import data into DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all data from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
}

if (process.argv[2] === '--delete') {
  deleteData();
}
// To import data, run the following command in the terminal:
// node dev-data/data/import-dev-data.js --import
// To delete data, run the following command in the terminal:
// node dev-data/data/import-dev-data.js --delete
// This script is used to import and delete data from the database. It reads data from a JSON file and then imports it into the database. The script can be run from the command line using the --import or --delete flag to import or delete data, respectively.
// The script uses the mongoose library to connect to the database and perform the import and delete operations. It reads the data from a JSON file and then uses the Tour model to create or delete the data in the database.
// The script uses the dotenv library to load environment variables from a .env file. This allows the script to access the database connection string and other configuration settings.
// The script uses the fs library to read the JSON file containing the data to be imported. The data is stored in an array of objects, with each object representing a tour.
// The importData function uses the Tour model to create the data in the database. It uses the create method to insert the data into the database. If the data is successfully imported, a success message is logged to the console.
// The deleteData function uses the Tour model to delete all data from the database. It uses the deleteMany method to remove all documents from the collection. If the data is successfully deleted, a success message is logged to the console.
// The script checks the command-line arguments to determine whether to import or delete data. If the --import flag is provided, the importData function is called. If the --delete flag is provided, the deleteData function is called.
// The script can be run from the command line using the node command, followed by the path to the script file and the --import or --delete flag. For example, to import data, you would run node dev-data/data/import-dev-data.js --import. To delete data, you would run node dev-data/data/import-dev-data.js --delete.
// This script is useful for seeding the database with initial data or for clearing out data during development and testing. It provides a convenient way to manage the data in the database without having to manually insert or delete records.
// The script can be customized to handle different types of data and to perform additional operations on the database. It can be extended to support more complex data import and export tasks, such as transforming data before importing it or exporting data to different formats.  // eslint-disable-line
