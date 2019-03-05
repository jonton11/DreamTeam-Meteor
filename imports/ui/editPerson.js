import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base'
 
import './editPerson.html';
Template.editPerson.helpers({
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
    },
    userName() {
        const userName = Meteor.user().username
        return userName
    }
  });

Template.editPerson.events({
    'submit form': function(event, template) {
        event.preventDefault();
        const newFirstName = event.target.editFirstName.value
        const newLastName = event.target.editLastName.value
        const newUserName = event.target.editUserName.value
        const profile = Meteor.user().profile
        const newEmail = event.target.editEmail.value

        // console.log(`test edit profile value:: newFirsName: ${newFirstName}, newLastName: ${newLastName}, newUserName: ${newUserName}
        // profile: ${profile}, newEmail: ${newEmail}`)
        // update profile 
        Meteor.users.update({_id: Meteor.userId()}, {$set: { 
            profile: {
                ...profile,
                firstName: newFirstName,
                lastName: newLastName,
            }
        }});

        // update username
        const currentUserName = Meteor.user().username
        if(newUserName !== currentUserName){
            Meteor.call('setUserName', newUserName, function(error){
                if (error) console.log("update username error " + error.reason);
            });
        }

        // update email address
        const currentEmail = Meteor.user().emails[0].address
        if(newEmail !== currentEmail){
            Meteor.call('addNewEmail', newEmail, function(error){
                if (error) console.log("update email error " + error.reason);
            });
        }

        Router.go("personal")
    }
})



