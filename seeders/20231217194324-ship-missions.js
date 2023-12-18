'use strict';
const crypto = require('crypto');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   const [results] = await queryInterface.sequelize.query('select id, name from ships');

   const missions = [];

   for (const ship of results) {
      missions.push(createMission(ship.id, ship.name));
      missions.push(createMission(ship.id, ship.name));
   }
   
   await queryInterface.bulkInsert('Missions', missions);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('truncate table missions');
  }
};


const missionTypes = ['important', 'risky', 'secret', 'solidary', 'rescue', 'investigation', 'garbage collection'];
const cargoTypes = ['rockets', 'engines', 'space garbage', 'fuel', 'food', 'people'];
const destinations = ['nemo point', 'china', 'bahamas', 'antartica', 'pluto', 'mars', 'uranus', 'jupiter'];

function createMission(shipId, shipName) {
  const missionRand = missionTypes[Math.floor(Math.random() * missionTypes.length)];
  const cargo = cargoTypes[Math.floor(Math.random() * cargoTypes.length)];
  const destination = destinations[Math.floor(Math.random() * destinations.length)];

  return {
    id: crypto.randomUUID(),
    shipId,
    destination,
    cargo,
    name: `${shipName} is performing a ${missionRand} mission`,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}