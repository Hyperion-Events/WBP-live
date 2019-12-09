import InteractionType from './InteractionType';

// eslint-disable-next-line import/prefer-default-export
export const showBreak = new InteractionType({
  typeName: 'SHOW_BREAK',
  label: 'Show • Pause',
  schemaKey: 'showBreak',
  fields: {
    template: {
      type: String,
      label: 'Template',
      defaultValue: 'NONE',
      allowedValues: ['NONE', 'SHOWSTART', 'MIDBREAK', 'SHOWEND'],
      publish: true,
    },
  },
});
