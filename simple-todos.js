
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  Template.body.helpers({
      tasks: function () {
        return Tasks.find({}, {sort: {createdAt:-1}});
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
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
