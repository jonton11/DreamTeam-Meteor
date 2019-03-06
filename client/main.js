import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '../imports/api/teams.js';

// import './main.html';
import '../imports/ui/body.js';

Router.route('/teams',{
  // only logged in uer can access teams page
  onBeforeAction: function(){
    var currentUser = Meteor.userId();
    if(currentUser){
      this.next();
    } else {
      this.render("login");
    }
  }
});
Router.route('/register',{
  onBeforeAction: function(){
    var currentUser = Meteor.userId();
    if(currentUser){
      this.render("personal");
    } else {
      this.next();
    }
  }
});
Router.route('/login', {
  onBeforeAction: function(){
    var currentUser = Meteor.userId();
    if(currentUser){
      this.render("personal");
    } else {
      this.next();
    }
  }
})
Router.route('/personal',{
  // only logged in uer can access personal page
  onBeforeAction: function(){
    var currentUser = Meteor.userId();
    if(currentUser){
      this.next();
    } else {
      this.render("login");
    }
  }
});
Router.route('/editPerson', {
  // only logged in uer can access editPerson page
  onBeforeAction: function(){
    var currentUser = Meteor.userId();
    if(currentUser){
        this.next();
    } else {
        this.render("login");
    }
  }
})
Router.route('/', {
  template: 'login',
  onBeforeAction: function(){
    var currentUser = Meteor.userId();
    if(currentUser){
      this.render("personal");
    } else {
      this.next();
    }
  }
})
