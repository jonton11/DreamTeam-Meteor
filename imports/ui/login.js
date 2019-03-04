import { Template } from 'meteor/templating';
 
import './login.html';

Template.login.events({
    'submit form': function(event, template) {
      event.preventDefault();
      const email = template.find("#login-email").value
      const password = template.find('#login-password').value
      Meteor.loginWithPassword(email, password, (error, result) => {
        if(error){
            alert(`${error.reason}`)
        }else{
            Router.go('person')  
        }
      })
    },

  })