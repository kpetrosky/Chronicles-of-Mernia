const db = require('../config/connection');
const { Encounter, Enemy, User, Party, PartyMember, Weapon } = require('../models');
// const encounters = require('./encounters.json');
// const enemies = require('./enemies.json');
const partyMembers = require('./partyMembers.json');
const weapons = require('./weapons.json');

db.once('open', async () => {
  await Weapon.deleteMany({});
  await Weapon.create(weapons);
  await PartyMember.deleteMany({});
  await PartyMember.create(partyMembers);

  console.log('all done!');
  process.exit(0);
});
