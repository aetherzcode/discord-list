const mongoose = require('mongoose');
const { Schema } = mongoose;
const Bots = new Schema({
 _id: {
    default: () => new Date(),
    type: Date
  }, //added at
 id: {
  type: String , 
  unique: true,
  required: true
  }, //botId
 owners: [{id: String}], //owners
 short: String, //short desc
 desc: String, //description
 prefix: String, //bot prefix
 verified: { type: Boolean, default: false }, //verified bot or not
 added: {type: Boolean, default: false},
 support: String, //support server id
 bg: String, // background image link
 github: String, //github link
 website: String, //website link
 donate: String, //donate account link
 invite: String, // invite link
 servers: Number, //servers number
 ramUsed: { type: Number, default: 0 },
 ramLeft: { type: Number, default: 0 },
 msgGot: { type: Number, default: 0 },
 cmdGot: { type: Number, default: 0 },
 msgSent: { type: Number, default: 0 },
 promoted: { type: Boolean, default: false },
 votes: { type: Number, default: 0 },
 voted: Number,
 badges: [{ type: String }],
},{
 versionKey: false
});
Bots.set('toObject', {
  transform: function (doc, ret) {
    ret.owners.forEach(delid);
    function delid(owner){
     delete owner._id;
    }
  }
})
console.log("[DB] Compiling Schema into Model - Bots");
module.exports = mongoose.model('Bots', Bots);