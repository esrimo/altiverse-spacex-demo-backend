if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
}
import axios from 'axios';
import { cleanDb } from '../helpers/testHelpers';
import { db } from '../models';

const populate = async () => {
  await cleanDb();
  console.log('Populating database...');

  try {
    const { data: { data: { ships } } } = await axios({
      method: 'POST',
      url: 'https://spacex-production.up.railway.app/api/graphql',
      headers: { 'Content-Type': 'application/json' },
      data: { query: '{ ships { id name image class active } }' }
    });

    await db.Ship.bulkCreate(ships);

  } catch (error) {
    console.error(error);
  } finally {
    try {
      await db.sequelize.close();
    } catch (error) {
      console.log(error);
      console.log('Unable to close db connection ^');
    }
  }
};

if (require.main === module) {
  populate();
}

export { populate };
