// Truck.ts
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';
import AbleToTow from '../interfaces/AbleToTow.js';
import Motorbike from './Motorbike.js';
import Car from './Car.js';

class Truck extends Vehicle implements AbleToTow {
  towingCapacity: number;
  wheels: Wheel[];

  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[] = [],
    towingCapacity: number
  ) {
    // Call the parent (Vehicle) constructor
    super(vin, color, make, model, year, weight, topSpeed);

    // Additional properties specific to Truck
    this.wheels = wheels.length ? wheels : Array(4).fill(new Wheel());
    this.towingCapacity = towingCapacity;
  }

  tow(towVehicle: Car | Motorbike | Truck) {
    const towingWeight = towVehicle.weight;
    
    // Check if the towing weight exceeds the truck's capacity
    if (towingWeight > this.towingCapacity) {
      console.log(`${this.make} ${this.model} cannot tow ${towVehicle.make} ${towVehicle.model} because it exceeds the towing capacity of ${this.towingCapacity} lbs.`);
    } else {
      console.log(`${this.make} ${this.model} is towing ${towVehicle.make} ${towVehicle.model} (${towingWeight} lbs).`);
    }
  }

  override printDetails(): void {
    super.printDetails(); // Call the parent class's printDetails
    console.log(`Towing Capacity: ${this.towingCapacity}`);
  }
}

export default Truck;
