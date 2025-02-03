// Vehicle.ts
import Driveable from '../interfaces/Driveable.js';

class Vehicle implements Driveable {
  vin: string; // Add vin property
  color: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
  started: boolean;
  currentSpeed: number;
  isStarted: boolean;

  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number
  ) {
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    this.started = false;
    this.currentSpeed = 0;
    this.isStarted = false;
  }

  printDetails(): void {
    console.log(`VIN: ${this.vin}`);
    console.log(`Make: ${this.make}, Model: ${this.model}, Year: ${this.year}`);
    console.log(`Color: ${this.color}`);
    console.log(`Weight: ${this.weight} lbs`);
    console.log(`Top Speed: ${this.topSpeed} mph`);
    console.log(`Vehicle started: ${this.started}`);
    console.log(`Current speed: ${this.currentSpeed} mph`);
  }

  start(): void {
    this.started = true;
    console.log('Vehicle started');
  }

  accelerate(change: number): void {
    if (this.started) {
      this.currentSpeed += change;
      console.log(`Vehicle accelerated to ${this.currentSpeed} mph`);
    } else {
      console.log('Start the vehicle first');
    }
  }

  decelerate(change: number): void {
    if (this.started) {
      this.currentSpeed -= change;
      console.log(`Vehicle decelerated to ${this.currentSpeed} mph`);
    } else {
      console.log('Start the vehicle first');
    }
  }

  stop(): void {
    this.currentSpeed = 0;
    this.started = false;
    console.log('Vehicle stopped');
  }

  turnRight(): void {
    if (this.started) {
      console.log("Vehicle turned right");
    } else {
      console.log("Start the vehicle first");
    }
  }

  turnLeft(): void {
    if (this.started) {
      console.log("Vehicle turned left");
    } else {
      console.log("Start the vehicle first");
    }
  }

  reverse(): void {
    if (this.started) {
      console.log('Vehicle reversed');
    } else {
      console.log('Start the vehicle first');
    }
  }
}

export default Vehicle;
