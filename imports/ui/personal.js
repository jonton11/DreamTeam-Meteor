import { Template } from 'meteor/templating';
import { Teams } from '../api/teams.js';
import './personal.html';

Template.personal.helpers({
    email() {
        const email = Meteor.user().emails[0]
        return email.address  
    },
    userName() {
        const userName = Meteor.user().username
        return userName
    },
    firstName() {
        const firstName = Meteor.user().profile.firstName
        return firstName
    },
    lastName() {
        const lastName = Meteor.user().profile.lastName
        return lastName
    },
    teams() {
        // Show newest teams at the top
        // return teams that user has joined
        return Teams.find({ members: Meteor.userId() }, { sort: { createdAt: -1 } });
      },
  });