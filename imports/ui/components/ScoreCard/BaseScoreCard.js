import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import { orange500, blueGrey600 } from 'material-ui/styles/colors';


import { padLeft, isTopRank } from '../../../api/helpers';

const propTypes = {
  fullName: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
  style: PropTypes.object,
  children: PropTypes.element,
};


const BaseScoreCard = ({ fullName, rank, style, children }) => (
  <Paper zDepth={4} style={{ ...styles, ...style, backgroundColor: isTopRank(rank) ? orange500 : blueGrey600 }}>
    <span style={rankStyles}>{padLeft(rank)}.</span>
    <span>{fullName}</span>
    {children}
  </Paper>
);

BaseScoreCard.propTypes = propTypes;

const styles = {
  position: 'relative',
  width: '100%',
  padding: '1rem',
  marginBottom: '.25rem',
  fontWeight: 300,
  fontSize: '1.5em',
};

const rankStyles = { fontWeight: 600, textTransform: 'uppercase', marginRight: '.5em' };


export default BaseScoreCard;