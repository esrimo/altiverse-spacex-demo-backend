import { db } from '../models';
import { ShipAttributes } from '../models/ship';

const get = async (): Promise<ShipAttributes[]> => {
  return await db.Ship.findAll();
};

const shipController = {
  get,
};
export { shipController };
