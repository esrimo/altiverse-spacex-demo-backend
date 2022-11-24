if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import { db } from "../models";
import { cleanDb } from "../helpers/testHelpers";

const populate = async () => {
  await cleanDb();
  await db.sequelize.close();
};

if (require.main === module) {
  populate();
}

export { populate };
