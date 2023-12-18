import { QueryShipsArgs } from '../../../common/types/backend';
import { GraphqlContext } from '../../../config';
import { shipController } from '../../../controllers';
import { ShipAttributes } from '../../../models/ship';

const ships = async (rootValue, { input }: QueryShipsArgs, context: GraphqlContext): Promise<ShipAttributes[]> => {
  return shipController.get();
};

// const addShip = async (rootValue, _, context: GraphqlContext): Promise<ShipAttributes | null> => {
//   return null;
// };

const query = { ships };

const mutation = {};

const Ship = { query, mutation };
export { Ship };
