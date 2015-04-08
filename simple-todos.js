
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  Template.body.helpers({
      tasks: function () {
        if (Session.get("hideCompleted")) {
          // If hide completed is checked, filter tasks
          return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
        } else {
          // Otherwise, return all of the tasks
          return Tasks.find({}, {sort: {checked: 1,createdAt: -1}});
        }
      },
      hideCompleted: function () {
        return Session.get("hideCompleted");
      },
      incompleteCount: function () {
        return Tasks.find({checked: {$ne: true}}).count();
      }
  });

  Template.body.events({
    'submit .new-task': function (event) {
      var textOfNewTodo = event.target.text.value;
      Tasks.insert({
        text: textOfNewTodo,
        createdAt: new Date()
      });
      event.target.text.value = "";
      return false; //prevent form submit
    },

    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Tasks.update(this._id, {$set: {checked: ! this.checked}});
    },

    "click .delete": function () {
      Tasks.remove(this._id);
    },

    "change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked);
    }

  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
