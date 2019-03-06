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
            Router.go('personal')  
        }
      })
    },
    'click #loginGithub': function(event, template) {
        event.preventDefault()

        // log in with Github function
        Meteor.loginWithGithub({
          requestPermissions: ['user', 'public_repo']
        }, function(err){
          if (err) {
            alert(`log in Github error: ${err.reason}`)
          }else {
            const email = Meteor.user().services.github.email
            const newUserName = Meteor.user().services.github.username
            
            // update username
            const currentUserName = Meteor.user().username
            if(newUserName !== currentUserName){
                Meteor.call('setUserName', newUserName, function(error){
                    if (error) alert("update username error " + error.reason);
                });
            }

            // update email address
            Meteor.call('addEmailGithub', email, function(error){
                if (error) alert("update email error " + error.reason);
            });
            Router.go('personal') 
          }
        })
      }

  })