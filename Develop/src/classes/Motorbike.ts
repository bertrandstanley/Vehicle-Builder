import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

class Motorbike extends Vehicle {
  override weight!: number;
  override topSpeed!: number;
  wheels: Wheel[];

  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[]  // Ensure that wheels is passed as an array of Wheel objects
  ) {
    super(vin, color, make, model, year, weight, topSpeed);
    this.wheels = wheels || [];  // If wheels are not passed, default to an empty array
  }

  wheelie(): void {
    console.log(`Motorbike ${this.make} ${this.model} is doing a wheelie!`);
  }

  override printDetails() {
    console.log(`Vehicle details: ${this.constructor.name} {
      currentSpeed: ${this.currentSpeed},
      isStarted: ${this.isStarted},
      vin: '${this.vin}',
      make: '${this.make}',
      model: '${this.model}',
      year: '${this.year}',
      color: '${this.color}',
      weight: '${this.weight}',
      topSpeed: '${this.topSpeed}'
    }`);

    // Check if wheels array is initialized and not empty before calling map
    if (Array.isArray(this.wheels) && this.wheels.length > 0) {
      console.log('Wheels:', this.wheels.map((wheel) => `Diameter: ${wheel.getDiameter} inches, Tire Brand: ${wheel.getTireBrand}`).join(', '));
    } else {
      console.log('No wheels available for this motorbike');
    }
  }
}

export default Motorbike;
