import inquirer from 'inquirer';
import Wheel from './Wheel.js';

// Vehicle base class
class Vehicle {
  vin: string;
  make: string;
  model: string;
  year: number;
  color: string;
  weight: number;
  topSpeed: number;
  currentSpeed: number = 0;
  isStarted: boolean = false;

  constructor(vin: string, make: string, model: string, year: number, color: string, weight: number, topSpeed: number) {
    this.vin = vin;
    this.make = make;
    this.model = model;
    this.year = year;
    this.color = color;
    this.weight = weight;
    this.topSpeed = topSpeed;
  }

  printDetails() {
    console.log("Vehicle details:", this);
    // Check if the vehicle has wheels (for motorbikes and possibly others)
    if (this instanceof Motorbike) {
      const motorbike = this as Motorbike;  // Cast `this` to `Motorbike`
      console.log('Wheels:', motorbike.wheels.map((wheel: { getDiameter: any; getTireBrand: any; }) => `Diameter: ${wheel.getDiameter} inches, Tire Brand: ${wheel.getTireBrand}`).join(', '));
    }
    
  }

  start() {
    this.isStarted = true;
    console.log(`${this.make} ${this.model} is starting.`);
  }

  accelerate(amount: number) {
    this.currentSpeed = Math.min(this.currentSpeed + amount, this.topSpeed);
    console.log(`${this.make} ${this.model} is accelerating to ${this.currentSpeed} mph.`);
  }

  decelerate(amount: number) {
    this.currentSpeed = Math.max(this.currentSpeed - amount, 0);
    console.log(`${this.make} ${this.model} is decelerating to ${this.currentSpeed} mph.`);
  }

  stop() {
    console.log(`${this.make} ${this.model} is stopping.`);
    this.isStarted = false; // Reset the vehicle to its initial state
    this.currentSpeed = 0; // Optionally reset the speed as well
  }

  turnRight() {
    console.log(`${this.make} ${this.model} is turning right.`);
  }

  turnLeft() {
    console.log(`${this.make} ${this.model} is turning left.`);
  }

  reverse() {
    console.log(`${this.make} ${this.model} is reversing.`);
  }
}

// Car class
class Car extends Vehicle {
  constructor(vin: string, make: string, model: string, year: number, color: string, weight: number, topSpeed: number) {
    super(vin, make, model, year, color, weight, topSpeed);
  }
}

// Motorbike class
class Motorbike extends Vehicle {
  wheels: any;
  constructor(vin: string, make: string, model: string, year: number, color: string, weight: number, topSpeed: number) {
    super(vin, make, model, year, color, weight, topSpeed);
  }

  wheelie() {
    console.log(`${this.make} ${this.model} is performing a wheelie!`);
  }
}

// Truck class
class Truck extends Vehicle {
  towingCapacity: number;

  constructor(vin: string, make: string, model: string, year: number, color: string, weight: number, topSpeed: number, towingCapacity: number) {
    super(vin, make, model, year, color, weight, topSpeed);
    this.towingCapacity = towingCapacity;
  }

  tow(towVehicle: Car | Motorbike | Truck) {
    console.log(`${this.make} ${this.model} towed ${towVehicle.make} ${towVehicle.model} with a towing capacity of ${this.towingCapacity} lbs.`);
  }
}

// Main CLI class to handle user interactions
class Cli {
  vehicles: Vehicle[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  constructor(vehicles: Vehicle[]) {
    this.vehicles = vehicles;
  }

  // Static method to generate VIN
  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // Method to prompt the user to choose a vehicle
  async chooseVehicle(): Promise<Vehicle | null> {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'Would you like to create a new vehicle or perform an action on an existing vehicle?',
      choices: ['Create a new vehicle', 'Select an existing vehicle', 'Exit'],
    });

    if (action === 'Create a new vehicle') {
      return await this.createNewVehicle();
    } else if (action === 'Select an existing vehicle') {
      return await this.selectExistingVehicle();
    } else {
      console.log('Goodbye!');
      return null;  // Exit the app
    }
  }

  // Method to handle creating a new vehicle
  async createNewVehicle(): Promise<Vehicle | null> {
    const { vehicleType } = await inquirer.prompt({
      type: 'list',
      name: 'vehicleType',
      message: 'What type of vehicle would you like to create?',
      choices: ['Car', 'Motorbike', 'Truck'],
    });

    const vehicleDetails = await this.getVehicleDetails(vehicleType);
    const newVehicle = this.createVehicle(vehicleType, vehicleDetails);
    this.vehicles.push(newVehicle);

    console.log(`Created new ${vehicleType}: ${newVehicle.make} ${newVehicle.model}`)

    return newVehicle;
  }

  // Method to select an existing vehicle
  async selectExistingVehicle(): Promise<Vehicle | null> {
    if (this.vehicles.length === 0) {
      console.log('No vehicles available. Please create a new vehicle first.');
      return null;
    }

    const { selectedVehicle } = await inquirer.prompt({
      type: 'list',
      name: 'selectedVehicle',
      message: 'Select a vehicle to perform an action on:',
      choices: this.vehicles.map((vehicle) => `${vehicle.make} ${vehicle.model}`),
    });

    const vehicle = this.vehicles.find(
      (v) => `${v.make} ${v.model}` === selectedVehicle
    );

    return vehicle || null;
  }

  // Method to get vehicle details
  async getVehicleDetails(vehicleType: string) {
    const questions = [
      {
        type: 'input',
        name: 'make',
        message: `Enter ${vehicleType} make:`,
      },
      {
        type: 'input',
        name: 'model',
        message: `Enter ${vehicleType} model:`,
      },
      {
        type: 'input',
        name: 'year',
        message: `Enter ${vehicleType} year:`,
        validate: (input: string) => {
          const year = parseInt(input);
          return isNaN(year) ? 'Please enter a valid year.' : true;
        },
      },
      {
        type: 'input',
        name: 'color',
        message: `Enter ${vehicleType} color:`,
      },
      {
        type: 'input',
        name: 'weight',
        message: `Enter ${vehicleType} weight (in lbs):`,
        validate: (input: string) => {
          const weight = parseInt(input);
          return isNaN(weight) ? 'Please enter a valid weight.' : true;
        },
      },
      {
        type: 'input',
        name: 'topSpeed',
        message: `Enter ${vehicleType} top speed (in mph):`,
        validate: (input: string) => {
          const speed = parseInt(input);
          return isNaN(speed) ? 'Please enter a valid top speed.' : true;
        },
      },
    ];

    if (vehicleType === 'Motorbike') {
      // Add wheel details for motorbikes
      const { numWheels } = await inquirer.prompt({
        type: 'input',
        name: 'numWheels',
        message: 'How many wheels does the motorbike have?',
        validate: (input: string) => {
          const num = parseInt(input);
          return isNaN(num) || num !== 2 ? 'Motorbikes typically have 2 wheels.' : true;
        },
      });

      // Collect details for each wheel
      const wheels: Wheel[] = [];
      for (let i = 0; i < numWheels; i++) {
        const wheelDetails = await inquirer.prompt([
          {
            type: 'input',
            name: 'diameter',
            message: `Enter diameter (in inches) for wheel ${i + 1}:`,
            validate: (input: string) => {
              const diameter = parseFloat(input);
              return isNaN(diameter) || diameter <= 0 ? 'Please enter a valid diameter.' : true;
            },
          },
          {
            type: 'input',
            name: 'tireBrand',
            message: `Enter tire brand for wheel ${i + 1}:`,
          },
        ]);
        wheels.push(new Wheel(parseFloat(wheelDetails.diameter), wheelDetails.tireBrand));
      }

      return { wheels, ...await inquirer.prompt(questions) };
    }

  
    if (vehicleType === 'Truck') {
      questions.push({
        type: 'input',
        name: 'towingCapacity',
        message: 'Enter Truck towing capacity (in lbs):',
      });
    }

    return await inquirer.prompt(questions);
  }

  // Method to create vehicle objects
  createVehicle(vehicleType: string, details: any): Vehicle {
    const vin = Cli.generateVin();
    switch (vehicleType) {
      case 'Car':
        return new Car(vin, details.make, details.model, details.color, details.year, details.weight, details.topSpeed);
      case 'Motorbike':
        return new Motorbike(vin, details.make, details.model, details.color, details.year, details.weight, details.topSpeed);
      case 'Truck':
        return new Truck(vin, details.make, details.model, details.color, details.year, details.weight, details.topSpeed, details.towingCapacity);
      default:
        throw new Error('Invalid vehicle type');
    }
  }

  // Method to perform actions on a vehicle
  async performActions(vehicle: Vehicle): Promise<void> {
    // Create the action choices list dynamically based on vehicle type
    let actionChoices = ['Print Vehicle Details', 'Start Vehicle', 'Accelerate 5 MPH', 'Decelerate 5 MPH', 'Stop Vehicle', 'Turn Right', 'Turn Left', 'Reverse Vehicle', 'Exit'];

    if (vehicle instanceof Truck) {
      actionChoices.splice(actionChoices.length - 1, 0, 'Tow');  // Insert 'Tow' before 'Exit'
    }

    if (vehicle instanceof Motorbike) {
      actionChoices.splice(actionChoices.length - 1, 0, 'Perform Wheelie');  // Insert 'Perform Wheelie' before 'Exit'
    }

    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: `What would you like to do with the ${vehicle.make} ${vehicle.model}?`,
      choices: actionChoices,
    });

    switch (action) {
      case 'Print Vehicle Details':
        vehicle.printDetails();
        break;
      case 'Start Vehicle':
        // Start the vehicle and update the state
        vehicle.start();
        break;
      case 'Accelerate 5 MPH':
        if (vehicle.isStarted) {
          vehicle.accelerate(5);
        } else {
          console.log('The vehicle must be started before accelerating.');
        }
        break;
      case 'Decelerate 5 MPH':
        if (vehicle.isStarted) {
          vehicle.decelerate(5);
        } else {
          console.log('The vehicle must be started before decelerating.');
        }
        break;
      case 'Stop Vehicle':
        if (vehicle.isStarted) {
          vehicle.stop();
        } else {
          console.log('The vehicle must be started before stopping.');
        }
        break;
      case 'Turn Right':
        if (vehicle.isStarted) {
          vehicle.turnRight();
        } else {
          console.log('The vehicle must be started before turning.');
        }
        break;
      case 'Turn Left':
        if (vehicle.isStarted) {
          vehicle.turnLeft();
        } else {
          console.log('The vehicle must be started before turning.');
        }
        break;
      case 'Reverse Vehicle':
        if (vehicle.isStarted) {
          vehicle.reverse();
        } else {
          console.log('The vehicle must be started before reversing.');
        }
        break;
      case 'Perform Wheelie':
        if (vehicle instanceof Motorbike && vehicle.isStarted) {
          vehicle.wheelie();
        } else {
          console.log('The vehicle must be started before performing a wheelie.');
        }
        break;
      case 'Tow':
        if (vehicle instanceof Truck && vehicle.isStarted) {
          // Prompt for the vehicle to tow
          const { vehicleToTow } = await inquirer.prompt({
            type: 'list',
            name: 'vehicleToTow',
            message: 'Which vehicle would you like to tow?',
            choices: this.vehicles
              .filter((v) => v !== vehicle)
              .map((v) => `${v.make} ${v.model}`),
          });
  
          // Find the vehicle selected to tow
          const towVehicle = this.vehicles.find(
            (v) => `${v.make} ${v.model}` === vehicleToTow
          );
  
          // Perform the towing action
          if (towVehicle) {
            vehicle.tow(towVehicle);
          } else {
            console.log('Vehicle to tow not found.');
          }
        } else {
          console.log('The vehicle must be started before towing.');
        }
        break;
      case 'Exit':
        console.log('Exiting vehicle actions...');
        return;
    }

    // Continue prompting for actions until the user exits
    await this.performActions(vehicle);
  }

  // Method to start the CLI
  async startCli() {
    let vehicle: Vehicle | null = await this.chooseVehicle();

    if (!vehicle) {
      console.log('Goodbye!');
      return; // Exit the CLI entirely when user selects 'Exit'
    }

    while (vehicle !== null) {
      await this.performActions(vehicle);
      vehicle = await this.chooseVehicle();  // Re-prompt to choose a new vehicle or exit
    }
  }
}

export default Cli;
