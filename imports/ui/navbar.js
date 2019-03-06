import { Template } from 'meteor/templating';
 
import './navbar.html';

Template.navbar.helpers({
    userName() {
        const userName = Meteor.user().username
        return userName
    },
})

Template.navbar.events({
    'click .logout': function(event) {
      event.preventDefault()
      Meteor.logout(function(err){
        if (err){
          // show error message
          alert("logout error: ", err.reason)
        } else {
          // redirect to homepage after logging out
          Router.go("/")
        }
      })
    },
})