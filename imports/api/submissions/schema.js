import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const submissionSchema = new SimpleSchema({
  userId: {
    type: SimpleSchema.RegEx.Id,
  },
  gameId: {
    type: SimpleSchema.RegEx.Id,
  },
  guess: {
    type: Number,
    decimal: true,
  },
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      }

      this.unset(); // Prevent user from supplying their own value
    },
  },
});

export default submissionSchema;
