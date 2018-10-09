import { Meteor } from 'meteor/meteor';
import AppState from '../collection';

Meteor.publish('appState', function publishUserAppState() {
  if (!this.userId) return this.ready();
  return AppState.find(
    {},
    {
      fields: {
        hintText: 1,
        rankDisplayMode: 1,
      },
      limit: 1,
    },
  );
});

Meteor.publish('appState.admin', function publishAdminAppState() {
  if (!this.userId || !Meteor.userIsAdmin(this.userId)) return this.ready();
  return AppState.find();
});
