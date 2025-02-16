// import classes
import Truck from "./classes/Truck.js";
import Car from "./classes/Car.js";
import Motorbike from "./classes/Motorbike.js";
import Wheel from "./classes/Wheel.js";
import Cli from "./classes/Cli.js";
import inquirer from "inquirer";

// create an array of vehicles
const vehicles = [];

// Uncomment once trucks are implemented
// Create a truck and push it to the vehicles array
const truck1 = new Truck(
  Cli.generateVin(),
  "red",
  "Ford",
  "F-150",
  2021,
  5000,
  120,
  [], // Assuming wheels can be empty initially or you can provide wheel objects as needed
  10000 // Towing capacity
);
vehicles.push(truck1); // Add the truck to the vehicles array

// will use default wheels
const car1 = new Car(
  Cli.generateVin(),
  'blue',
  'Toyota',
  'Camry',
  2021,
  3000,
  130,
  []
);
vehicles.push(car1); // Add the car to the vehicles array

// Uncomment once motorbikes are implemented
// Create motorbike wheels and motorbike, then push to vehicles array
const motorbike1Wheels = [new Wheel(17, "Michelin"), new Wheel(17, "Michelin")];
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
vehicles.push(motorbike1); // Add motorbike to the vehicles array

// create a new instance of the Cli class
const cli = new Cli(vehicles);

// start the cli
cli.startCli();