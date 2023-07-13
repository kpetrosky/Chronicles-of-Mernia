const db = require('../config/connection');
const { User, Party, PartyMember, Weapon } = require('../models');


const weapons = require('./weapons.json');


db.once('open', async () => {
  await User.deleteMany({});
  await PartyMember.deleteMany({});
  await Party.deleteMany({});
  await Weapon.deleteMany({});
  await Weapon.create(weapons);

  console.log('all done!');
  process.exit(0);
});
