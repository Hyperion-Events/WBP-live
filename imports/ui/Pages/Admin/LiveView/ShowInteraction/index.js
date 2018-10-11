import React from 'react';
import PropTypes from 'prop-types';

import interactionTypes, { interactionTypeNames } from '/imports/api/interactions/types';

import FullShowGame from './FullShowGame';
import EstimationVoting from './EstimationVoting';

const interactionsMap = new Map([
  [interactionTypeNames.FULL_SHOW_GAME, FullShowGame],
  [interactionTypeNames.ESTIMATION_VOTING, EstimationVoting],
]);

const propTypes = {
  interaction: PropTypes.object.isRequired, // TODO: better type
  candidate1Name: PropTypes.string.isRequired,
  candidate2Name: PropTypes.string.isRequired,
};

// TODO we have almost the same component for LiveGame => should be split out to helper component
const ShowInteraction = ({ interaction, candidate1Name, candidate2Name }) => {
  const { type, additionalData } = interaction;
  const Component = interactionsMap.get(type);

  if (!Component) {
    return <div>TODO: Show graceful failure message here</div>; // TODO
  }

  const { schemaKey } = interactionTypes.get(type);
  return (
    <Component
      title={interaction.title}
      {...interaction[schemaKey]}
      additionalData={additionalData}
      candidate1Name={candidate1Name}
      candidate2Name={candidate2Name}
    />
  );
};

ShowInteraction.propTypes = propTypes;

export default ShowInteraction;