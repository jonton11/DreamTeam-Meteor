import { Template } from 'meteor/templating';
 
import './person.html';

Template.person.helpers({
    email() {
        const email = Meteor.user().emails[0]
        return email.address  
    },
    firstName() {
        const firstName = Meteor.user().profile.firstName
        return firstName
    },
    lastName() {
        const lastName = Meteor.user().profile.lastName
        return lastName
    }
  });