import { Template } from 'meteor/templating';
import { Teams } from '../api/teams.js'; 

import './team.js';
import './body.html';
 
Template.teams.helpers({
    teams() {
      // Show newest teams at the top
      return Teams.find({}, { sort: { createdAt: -1 } });
    },
});


Template.teams.events({
    'submit .new-team'(event) {
      // Prevent default browser form submit
      event.preventDefault();
   
      // Get value from form element
      const target = event.target;
      const name = target.name.value;
   
      // Insert a team into the collection
      Teams.insert({
        name,
        createdAt: new Date(), // current time
      });
   
      // Clear form
      target.name.value = '';
    },
  });
