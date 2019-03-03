import { Template } from 'meteor/templating';
 
import { Teams } from '../api/teams.js';
 
import './team.html';
 
Template.team.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Teams.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
    Teams.remove(this._id);
  },
});