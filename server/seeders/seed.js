const db = require('../config/connection');
const { Encounter, Enemy, User, Party, PartyMember, Weapon } = require('../models');
// const encounters = require('./encounters.json');
const enemies = require('./enemies.json');
const weapons = require('./weapons.json');

db.once('open', async () => {
  await User.deleteMany({});
  await PartyMember.deleteMany({});
  await Party.deleteMany({});
  await Weapon.deleteMany({});
  await Weapon.create(weapons);
  await Enemy.deleteMany({});
  await Enemy.create(enemies);

  console.log('all done!');
  process.exit(0);
});
