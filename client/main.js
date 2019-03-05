import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '../imports/api/teams.js';

// import './main.html';
import '../imports/ui/body.js';

Router.route('/teams');
Router.route('/register');
Router.route('/login')
Router.route('/personal');
Router.route('/editPerson')
Router.route('/', {
  name: 'home',
  template: 'home'
})

