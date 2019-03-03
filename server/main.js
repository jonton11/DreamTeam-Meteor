import { Meteor } from 'meteor/meteor';
import '../imports/api/teams.js';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  addNewEmail: function(address)
  {
    Accounts.addEmail(Meteor.userId(), address);
    const currentEmail = Meteor.user().emails[0].address
    Accounts.removeEmail(Meteor.userId(), currentEmail)
  },

  deleteEmail: function(address)
  {
    Accounts.removeEmail(Meteor.userId(), address)
  }
});