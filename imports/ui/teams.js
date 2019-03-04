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
  'submit .newTeam'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const name = target.name.value;

 
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
        const data = {
          userID: user._id,
          profile,
          newTeams
        }

        // calling deleteTeamFromUser function from server
        Meteor.call('deleteTeamFromUser', data, function(error){
          if (error) console.log("got an error " + error.reason);
        });
      }
    })
    // delete team
    Teams.remove(this._id);
  },
  'submit .searchUser': function(event, template) {
    event.preventDefault();
    const searchUser = event.target.searchUser.value
    const resultUser = Meteor.users.find({"profile.userName": searchUser}).fetch()
    
    if(resultUser.length>0){
      const joinedTeams = resultUser[0].profile.teams

      if(joinedTeams.includes(this._id)){
        alert("This member is already in your team")
      }else{
        const cf = confirm(`Please confirm to add userName: "${searchUser}" to your team`)
        if(cf){
          // add new member to the team
          Teams.update({ _id: this._id}, { $set: {
            members: this.members.concat(resultUser[0]._id)
          }})

          // add new team to user account
          const updateUser = Meteor.users.find({ _id: resultUser[0]._id}).fetch()[0]
          const data = {
            updateUser,
            teamID: this._id
          }

          // calling addTeamToUser function from the server
          Meteor.call('addTeamToUser', data, function(error){
            if (error) console.log("got an error " + error.reason);
          });

        }
      }
    }else{
      alert("No information for this userName")
    }
  },
});