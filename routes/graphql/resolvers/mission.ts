import { QueryMissionArgs } from '../../../common/types/backend';
import { GraphqlContext } from '../../../config';
import { missionController } from '../../../controllers';
import { MissionAttributes } from '../../../models/Mission';

const missions = async (rootValue, { shipId }: QueryMissionArgs, context: GraphqlContext): Promise<MissionAttributes[]> => {
  return missionController.get(shipId);
};

const query = { missions };

const mutation = {};

const Mission = { query, mutation };
export { Mission };
