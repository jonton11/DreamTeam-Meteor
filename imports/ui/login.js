import { Template } from 'meteor/templating';
 
import './login.html';

Template.login.events({
    'submit form': function(event, template) {
      event.preventDefault();
      // console.log("test", event.target.email.value)
      // console.log("test pass", event.target.password.value)
      const email = template.find("#login-email").value
      const password = template.find('#login-password').value
      // console.log(`form submitted email: ${email}, password: ${password} `)
      Meteor.loginWithPassword(email, password)
    },

  })