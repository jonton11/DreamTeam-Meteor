import { Template } from 'meteor/templating';
 
import './navbar.html';

Template.navbar.events({
    'click .logout': function(event) {
      event.preventDefault()
      Meteor.logout(function(err){
        if (err){
          // show err message
          console.log("err logout: ", err)
        } else {
          // show alerts says logged out
          Router.go("/")
        }
      })
    },
})