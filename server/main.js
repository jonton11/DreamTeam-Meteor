import { Meteor } from 'meteor/meteor';
import '../imports/api/teams.js';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  addNewEmail: function(address)
  {
    // add new email
    Accounts.addEmail(Meteor.userId(), address);
    // remove previous email
    const currentEmail = Meteor.user().emails[0].address
    Accounts.removeEmail(Meteor.userId(), currentEmail)
  },
  addTeamToUser: function(data)
  { 
    // add new team to user account
    const updateUser = data.updateUser
    const teamID = data.teamID
    Meteor.users.update({_id: updateUser._id}, {$set: { 
        profile: {
          ...updateUser.profile,
          teams: updateUser.profile.teams.concat(teamID)
        }
    }});
  },
  deleteTeamFromUser: function(data)
  {
    // remove team from user account
    const userID = data.userID
    const profile = data.profile
    const newTeams = data.newTeams
    Meteor.users.update({_id: userID}, {$set: { 
      profile: {
        ...profile,
        teams: newTeams
      }
    }});
  },

  deleteEmail: function(address)
  {
    Accounts.removeEmail(Meteor.userId(), address)
  }
});