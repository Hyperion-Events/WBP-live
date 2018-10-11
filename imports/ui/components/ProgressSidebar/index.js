import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import windowSize from 'react-window-size';

import classnames from 'classnames';

import Star from './Star';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  games: PropTypes.arrayOf(
    PropTypes.shape({
      estimationGame: PropTypes.shape({
        gameNumber: PropTypes.number.isRequired,
      }),
      state: PropTypes.oneOf(['ACTIVE', 'CORRECT', 'WRONG', 'NOT_YET_PLAYED', 'SUBMITTED'])
        .isRequired,
    }),
  ).isRequired,
  windowHeight: PropTypes.number.isRequired,
};

const ProgressSidebar = ({ classes, games, windowHeight }) => {
  const currentClientHeight = windowHeight;
  const isSmallScreen = currentClientHeight < 600;

  const correctGamesCount = games.filter((g) => g.state === 'CORRECT').length;
  return (
    <div className={classes.outerWrapper}>
      <div className={classnames(classes.wrapper, { [classes.small]: isSmallScreen })}>
        {games.map(({ fullShowGame: { gameNumber }, state }) => (
          <Star
            key={gameNumber}
            state={state}
            classes={{ wrapper: classnames({ [classes.small]: isSmallScreen }) }}
          />
        ))}

        <div className={classes.scoreText}>
          <span className={classes.score}>{correctGamesCount}</span>
          <span className={classes.scoreDescription}>
            {correctGamesCount === 1 ? 'Punkt' : 'Punkte'}
          </span>
        </div>
      </div>
    </div>
  );
};

ProgressSidebar.propTypes = propTypes;

// TODO: use theme variable
const width = 50;
const styles = () => ({
  outerWrapper: {
    position: 'fixed',
    width,
    minWidth: width,
    height: '100%',
    overflowY: 'scroll',

    backgroundColor: '#232D33',
    color: '#ddd',

    textAlign: 'center',
    textTransform: 'uppercase',

    boxShadow: 'inset -13px 0px 17px -8px rgba(0, 0, 0, .5)',
  },
  wrapper: {
    minHeight: 500,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '&$small': {
      position: 'relative',
      height: '100%',
    },
  },
  scoreText: {
    position: 'absolute',
    left: 0,
    bottom: 10,

    width,

    display: 'flex',
    flexDirection: 'column',
  },
  score: {
    fontFamily: 'GothamBold',
    fontSize: 25,
  },
  scoreDescription: {
    fontSize: 10,
  },
  small: {
    marginTop: 0,
    marginBottom: 0,
  },
});

export default windowSize(withStyles(styles)(ProgressSidebar));