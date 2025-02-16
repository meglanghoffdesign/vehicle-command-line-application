// importing classes from other files
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

// define the Cli class
class Cli {
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  // static method to generate a vin
  static generateVin(): string {
    // return a random string
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // method to choose a vehicle from existing vehicles
  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedVehicleVin',
          message: 'Select a vehicle to perform an action on',
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle.vin,
            };
          }),
        },
      ])
      .then((answers) => {
        // set the selectedVehicleVin to the vin of the selected vehicle
        this.selectedVehicleVin = answers.selectedVehicleVin;
        // perform actions on the selected vehicle
        this.performActions();
      });
  }

  // method to create a vehicle
  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleType',
          message: 'Select a vehicle type',
          choices: ['Car', 'Truck', 'Motorbike'],
        },
      ])
      .then((answers) => {
        // Statements to create a truck or motorbike if the user selects the respective vehicle type
        if (answers.vehicleType === 'Car') {
          this.createCar();
        } else if (answers.vehicleType === 'Truck') {
          this.createTruck();
        } else if (answers.vehicleType === 'Motorbike') {
          this.createMotorbike();
        }
      });
  }

  // method to create a car
  createCar(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
      ])
      .then((answers) => {
        const car = new Car(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          []
        );
        // push the car to the vehicles array
        this.vehicles.push(car);
        // set the selectedVehicleVin to the vin of the car
        this.selectedVehicleVin = car.vin;
        // perform actions on the car
        this.performActions();
      });
  }

  // method to create a truck
  createTruck(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
        {
          type: 'input',
          name: 'towingCapacity',
          message: 'Enter Towing Capacity',
        },
      ])
      .then((answers) => {
        // Use the answers object to pass the required properties to the Truck constructor
        const truck = new Truck(
          Cli.generateVin(), // Generating a unique VIN
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [], // Empty wheels array
          parseInt(answers.towingCapacity) // Towing capacity from user input
        );
  
        // Push the truck to the vehicles array
        this.vehicles.push(truck);
  
        // Set the selectedVehicleVin to the vin of the truck
        this.selectedVehicleVin = truck.vin;
  
        // Perform actions on the truck
        this.performActions(); 
      });
  }

  // method to create a motorbike
  createMotorbike(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
        {
          type: 'input',
          name: 'frontWheelDiameter',
          message: 'Enter Front Wheel Diameter',
        },
        {
          type: 'input',
          name: 'frontWheelBrand',
          message: 'Enter Front Wheel Brand',
        },
        {
          type: 'input',
          name: 'rearWheelDiameter',
          message: 'Enter Rear Wheel Diameter',
        },
        {
          type: 'input',
          name: 'rearWheelBrand',
          message: 'Enter Rear Wheel Brand',
        },
      ])
      .then((answers) => {
      // Create Wheel objects for front and rear wheels
      const frontWheel = new Wheel(
        parseInt(answers.frontWheelDiameter), 
        answers.frontWheelBrand
      );
      const rearWheel = new Wheel(
        parseInt(answers.rearWheelDiameter), 
        answers.rearWheelBrand
      );

      // Create the Motorbike object
      const motorbike = new Motorbike(
        Cli.generateVin(), // Generating a unique VIN
        answers.color,
        answers.make,
        answers.model,
        parseInt(answers.year),
        parseInt(answers.weight),
        parseInt(answers.topSpeed),
        [frontWheel, rearWheel] // Wheels array with front and rear wheels
      );

      // Push the motorbike to the vehicles array
      this.vehicles.push(motorbike);

      // Set the selectedVehicleVin to the vin of the motorbike
      this.selectedVehicleVin = motorbike.vin;

      // Perform actions on the motorbike (like calling the `performActions()` method)
      this.performActions(); 
    });
}

  // method to find a vehicle to tow
  // TODO: add a parameter to accept a truck object
  findVehicleToTow(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleToTow',
          message: 'Select a vehicle to tow',
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle,
            };
          }),
        },
      ])
      .then((answers) => {
      // Check if the selected vehicle is the truck
      const selectedVehicle = answers.vehicleToTow;
      console.log(`Selected vehicle to tow: ${selectedVehicle.make} ${selectedVehicle.model}`);

      if (selectedVehicle instanceof Truck) {
        // If the selected vehicle is a truck, log that it cannot tow itself
        console.log("The truck cannot tow itself.");
        
        // Perform actions on the truck to allow the user to select another action
        this.performActions();
      } else {
        // If it is not a truck, tow the selected vehicle
        console.log(`Towing ${selectedVehicle.make} ${selectedVehicle.model}...`);
        // After towing, allow the user to select another action
        this.performActions();
      }
    });
}

// method to perform actions on a vehicle
performActions(): void {
  let actionChoices: string[] = [
    'Print details',
    'Start vehicle',
    'Accelerate 5 MPH',
    'Decelerate 5 MPH',
    'Stop vehicle',
    'Turn right',
    'Turn left',
    'Reverse',
    'Select or create another vehicle',
    'Exit',
  ];

  // Conditionally add "Tow a vehicle" or "Wheelie" depending on the type of the selected vehicle
  const selectedVehicle = this.vehicles.find(vehicle => vehicle.vin === this.selectedVehicleVin);

  if (selectedVehicle instanceof Truck) {
    actionChoices.push('Tow a vehicle');  // Add towing option only for trucks
  }

  if (selectedVehicle instanceof Motorbike) {
    actionChoices.push('Wheelie');  // Add wheelie option only for motorbikes
  }

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Select an action',
        choices: actionChoices,
      },
    ])
    .then((answers) => {
      // perform the selected action
      if (answers.action === 'Print details') {
        // find the selected vehicle and print its details
        for (let i = 0; i < this.vehicles.length; i++) {
          if (this.vehicles[i].vin === this.selectedVehicleVin) {
            this.vehicles[i].printDetails();
          }
        }
      } else if (answers.action === 'Start vehicle') {
        // find the selected vehicle and start it
        for (let i = 0; i < this.vehicles.length; i++) {
          if (this.vehicles[i].vin === this.selectedVehicleVin) {
            this.vehicles[i].start();
          }
        }
      } else if (answers.action === 'Accelerate 5 MPH') {
        // find the selected vehicle and accelerate it by 5 MPH
        for (let i = 0; i < this.vehicles.length; i++) {
          if (this.vehicles[i].vin === this.selectedVehicleVin) {
            this.vehicles[i].accelerate(5);
          }
        }
      } else if (answers.action === 'Decelerate 5 MPH') {
        // find the selected vehicle and decelerate it by 5 MPH
        for (let i = 0; i < this.vehicles.length; i++) {
          if (this.vehicles[i].vin === this.selectedVehicleVin) {
            this.vehicles[i].decelerate(5);
          }
        }
      } else if (answers.action === 'Stop vehicle') {
        // find the selected vehicle and stop it
        for (let i = 0; i < this.vehicles.length; i++) {
          if (this.vehicles[i].vin === this.selectedVehicleVin) {
            this.vehicles[i].stop();
          }
        }
      } else if (answers.action === 'Turn right') {
        // find the selected vehicle and turn it right
        for (let i = 0; i < this.vehicles.length; i++) {
          if (this.vehicles[i].vin === this.selectedVehicleVin) {
            this.vehicles[i].turn('right');
          }
        }
      } else if (answers.action === 'Turn left') {
        // find the selected vehicle and turn it left
        for (let i = 0; i < this.vehicles.length; i++) {
          if (this.vehicles[i].vin === this.selectedVehicleVin) {
            this.vehicles[i].turn('left');
          }
        }
      } else if (answers.action === 'Reverse') {
        // find the selected vehicle and reverse it
        for (let i = 0; i < this.vehicles.length; i++) {
          if (this.vehicles[i].vin === this.selectedVehicleVin) {
            this.vehicles[i].reverse();
          }
        }
      } else if (answers.action === 'Tow a vehicle') {  // Add statements to perform the tow action only if the selected vehicle is a truck.
        // Find the selected vehicle (truck)
        for (let i = 0; i < this.vehicles.length; i++) {
          if (this.vehicles[i].vin === this.selectedVehicleVin && this.vehicles[i] instanceof Truck) {
            // Call the findVehicleToTow method and pass the selected truck as an argument
            this.findVehicleToTow();
            return; // Exit here to avoid performing actions on the truck immediately
          }
        }
      } else if (answers.action === 'Wheelie') {  // Add statements to perform the wheelie action only if the selected vehicle is a motorbike
        // Find the selected vehicle (motorbike)
        for (let i = 0; i < this.vehicles.length; i++) {
          if (this.vehicles[i].vin === this.selectedVehicleVin && this.vehicles[i] instanceof Motorbike) {
            // Call the wheelie method for the motorbike
            (this.vehicles[i] as Motorbike).wheelie();
            break; 
          }
        }
      } else if (answers.action === 'Select or create another vehicle') {
        // start the cli to return to the initial prompt if the user wants to select or create another vehicle
        this.startCli();
        return;
      } else {
        // exit the cli if the user selects exit
        this.exit = true;
      }

      if (!this.exit) {
        // if the user does not want to exit, perform actions on the selected vehicle
        this.performActions();
      }
    });
}

  // method to start the cli
  startCli(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'CreateOrSelect',
          message:
            'Would you like to create a new vehicle or perform an action on an existing vehicle?',
          choices: ['Create a new vehicle', 'Select an existing vehicle'],
        },
      ])
      .then((answers) => {
        // check if the user wants to create a new vehicle or select an existing vehicle
        if (answers.CreateOrSelect === 'Create a new vehicle') {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }
}

// export the Cli class
export default Cli;
