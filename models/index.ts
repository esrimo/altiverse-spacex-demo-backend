import { DataTypeAbstract, ModelAttributeColumnOptions, Sequelize } from 'sequelize';
import { config } from '../config';
import { Address } from './Address';
import { User } from './User';
import { Ship } from './ship';
import { Mission } from './Mission';

declare global {
  type SequelizeAttributes<T extends { [key: string]: any }> = {
    [P in keyof T]: string | DataTypeAbstract | ModelAttributeColumnOptions;
  };
}

const sequelize = new Sequelize({
  ...config.mysql,
  dialect: 'mariadb',
  define: {
    charset: 'utf8mb4',
  },
  logging: console.log,
  pool: {
    acquire: 30,
  },
});

const db = {
  sequelize,
  User: User.initModel(sequelize),
  Address: Address.initModel(sequelize),
  Ship: Ship.initModel(sequelize),
  Mission: Mission.initModel(sequelize),
};

db.Ship.hasOne(db.Mission, {
  as: 'Ship',
  foreignKey: 'shipId'
});

Object.keys(db).map(key => {
  if (db[key].associate) {
    db[key].associate(db);
  }
});

const sync = async () => {
  await sequelize.sync({ force: false });
};

export { sync, db, sequelize };
