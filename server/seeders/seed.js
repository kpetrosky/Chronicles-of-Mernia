const db = require('../config/connection');
const { Encounter, Enemy, User, Party, PartyMember, Weapon } = require('../models');
const encounters = require('./encounters.json');
const enemies = require('./enemies.json');
const partyMembers = require('./partyMembers.json');
const weapons = require('./weapons.json');

db.once('open', async () => {
  await Thought.deleteMany({});
  await Thought.create(thoughtSeeds);

  console.log('all done!');
  process.exit(0);
});
