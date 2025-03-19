import express from 'express';
import Truck from "./classes/Truck.js";
import Car from "./classes/Car.js";
import Motorbike from "./classes/Motorbike.js";
import Wheel from "./classes/Wheel.js";
import Cli from "./classes/Cli.js";
import Vehicle from "./classes/Vehicle.js";

// Create an instance of the express app
const app = express();
const port = process.env.PORT || 3000;  // Set the port for the server

// Create vehicle instances
const truck1 = new Truck(
  Cli.generateVin(),
  "red",
  "Ford",
  "F-150",
  2021,
  5000,
  120,
  [],
  10000
);

const car1 = new Car(
  Cli.generateVin(),
  "blue",
  "Toyota",
  "Camry",
  2021,
  3000,
  130,
  []
);

const motorbike1Wheels = [
  new Wheel(17, "Michelin"),
  new Wheel(17, "Michelin")
];
const motorbike1 = new Motorbike(
  Cli.generateVin(),
  "black",
  "Harley Davidson",
  "Sportster",
  2021,
  500,
  125,
  motorbike1Wheels
);

// Create an array to store all vehicles
const vehicles: Vehicle[] = [truck1, car1, motorbike1];

// Create an instance of the Cli class (CLI functionality is not required for the server, but it can still be created)
const cli = new Cli(vehicles);

// Define API Route: Get all vehicles
app.get('/api/vehicles', (req, res) => {
  res.json(vehicles);  // Return the array of vehicles as a JSON response
});

// Define API Route: Get a specific vehicle by VIN
app.get('/api/vehicle/:vin', (req, res) => {
  const vin = req.params.vin;
  const vehicle = vehicles.find(v => v.vin === vin);
  
  if (vehicle) {
    res.json(vehicle);  // Return the found vehicle as a JSON response
  } else {
    res.status(404).send('Vehicle not found');  // If vehicle with the given VIN is not found
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  // Optionally start the CLI if needed (though it's not typically used in a web app)
  cli.startCli();
});
