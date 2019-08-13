import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';

import Button from '/imports/ui/components/Button';

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  question: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
};

const EstimationVoting = ({ question, submit, classes }) => (
  <div className={classes.wrapper}>
    <span className={classes.text}>{question}</span>
    <div className={classes.buttonWrapper}>
      <Button className={classes.button} onClick={() => submit('YES')}>
        Ja
      </Button>
      <Button className={classes.button} onClick={() => submit('NO')}>
        Nein
      </Button>
    </div>
  </div>
);

EstimationVoting.propTypes = propTypes;

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    display: 'block',
    width: '90%',
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  buttonWrapper: {
    width: '80%',
    marginTop: 40,
    display: 'flex',
    justifyContent: 'space-around',
  },
  button: {
    width: 100,
    fontSize: 18,
  },
};

export default withStyles(styles)(EstimationVoting);
