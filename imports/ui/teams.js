import { Template } from 'meteor/templating';
 
import { Teams } from '../api/teams.js';
 
import './teams.html';

Template.teams.helpers({
  teams() {
    // Show newest teams at the top
    return Teams.find({}, { sort: { createdAt: -1 } });
  },
});

Template.team.helpers({
  members() {
    return Meteor.users.find({"profile.teams": this._id})
  },
  userName() {
    return this.profile.userName
  },
  isTeamMembers() {
    teams = Meteor.user().profile.teams
    return teams.includes(this._id)
  },
  isTeamCreator () {
    return Meteor.userId() === this.createdBy
  }
})

Template.teams.events({
  'submit .new-team'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const name = target.name.value;

    // console.log("tet", Teams.find({}, { sort: { createdAt: -1 } }, {limit: 1}))
 
    // Insert a team into the collection
    let newTeamID = Teams.insert({
      name,
      createdAt: new Date(), // current time
      createdBy: Meteor.userId(),
      members: [Meteor.userId()]
    }, function(err){
      if(err){
        console.log("error create team: ", err)
      }
    });

    if(newTeamID){
      // add new team to user's info
      const profile = Meteor.user().profile
      Meteor.users.update({_id: Meteor.userId()}, {$set: { 
        profile: {
            ...profile,
            teams: profile.teams.concat(newTeamID)
        }
      }});
    }
 
    // Clear form
    target.name.value = '';
  },
});
 
Template.team.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Teams.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
    const users = Meteor.users.find().fetch()
    
    // remove team from user object
    users.forEach((user) => {
      const teams = user.profile.teams
      if(teams.includes(this._id)){
        const newTeams = [...teams]
        newTeams.splice(teams.indexOf(this._id), 1)

        const profile = user.profile
        Meteor.users.update({_id: user._id}, {$set: { 
          profile: {
            ...profile,
            teams: newTeams
          }
        }});
      }
    })
    // delete team
    Teams.remove(this._id);
  },
});