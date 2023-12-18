import { db } from "../models";
import { MissionAttributes } from "../models/Mission";


const get = async (shipId: string): Promise<MissionAttributes[]> => {

    return await db.Mission.findAll({
      where: { shipId: shipId }
    });
};

const missionController = { get };

export { missionController };