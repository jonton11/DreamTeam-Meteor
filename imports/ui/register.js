import { Template } from 'meteor/templating';
 
import './register.html';

Template.register.events({
    'submit form': function(event, template) {
      event.preventDefault();
      // console.log("test", event.target.email.value)
      // console.log("test pass", event.target.password.value)
      const email = template.find("#email").value
      const password = template.find('#password').value
      const firstname = template.find('#firstname').value
      const lastname = template.find('#lastname').value
      console.log(`form submitted email: ${firstname}, password: ${lastname} `)
      Accounts.createUser({
        email: email,
        password: password,
        profile: {
          firstname: firstname,
          lastname: lastname
        }
      }, function(err){
        if(err){
          console.log("Crate user error: ", err.message)
        }else{
          if(Meteor.userId()){
            Router.go("person")
          }
        }
      })
    }
  })