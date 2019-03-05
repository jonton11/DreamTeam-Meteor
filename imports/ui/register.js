import { Template } from 'meteor/templating';
 
import './register.html';

Template.register.events({
    'submit form': function(event, template) {
      event.preventDefault();
      // console.log("test", event.target.email.value)
      // console.log("test pass", event.target.password.value)
      const email = template.find("#register-email").value
      const password = template.find('#register-password').value
      const confirmPassword = template.find('#register-password2').value
      const firstName = template.find('#register-firstname').value
      const lastName = template.find('#register-lastname').value
      const userName = template.find('#register-username').value
      console.log(`form submitted email: ${email}, password: ${password}, confirmpass: ${confirmPassword}, 
      firstname: ${firstName}, lastname: ${lastName}, userName: ${userName}`)
    
      // check if password and confirmPassword are the same  
      if(password === confirmPassword){
          alert("register")
        // create user account
            Accounts.createUser({
              email: email,
              password: password,
              username: userName,
              profile: {
                firstName: firstName ? firstName : null,
                lastName: lastName ? lastName : null,
                teams:[]
              }
            }, function(err){
              if(err){
                alert("Crate user error: ", err.message)
              }else{
                if(Meteor.userId()){
                  Router.go("personal")
                }
              }
            })
      } else {
        alert("password and confirm password do not match please correct it")
      }
    }
  })