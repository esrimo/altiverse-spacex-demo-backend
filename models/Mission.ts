import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

type OmitTypes = '';

class Mission extends Model<
  InferAttributes<Mission, { omit: OmitTypes; }>,
  InferCreationAttributes<Mission, { omit: OmitTypes; }>
> {

  declare id: CreationOptional<string>;
  declare name: string;
  declare destination: string;
  declare active: boolean;
  declare cargo?: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare shipId: string;

  static initModel(sequelize: Sequelize) {
    Mission.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        shipId: {type: DataTypes.UUID, allowNull: false},
        destination: {type: DataTypes.STRING, allowNull: false},
        cargo: {type: DataTypes.STRING, allowNull: true},
        name: { type: DataTypes.STRING, allowNull: true },
        active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
      },
      {
        sequelize,
      },
    );
    return Mission;
  }
}

export { Mission, Mission as MissionAttributes };
