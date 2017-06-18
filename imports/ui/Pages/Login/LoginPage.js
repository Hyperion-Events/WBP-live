import { Meteor } from 'meteor/meteor';

import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { theme } from '../../components/theme';

const propTypes = {
  wrapperStyles: PropTypes.object,
};

const LoginPage = ({ wrapperStyles = {} }) => (
  <form style={{ ...wrapperStyles, ...styles }} onSubmit={handleOnSubmit}>
    <TextField
      floatingLabelText="Vorname"
      name="firstName"
      autoComplete="given-name"
      maxLength="10"
      fullWidth
    />
    <TextField
      floatingLabelText="Nachname"
      name="lastName"
      autoComplete="family-name"
      maxLength="20"
      fullWidth
    />
    <RaisedButton
      label="Anmelden"
      secondary
      labelStyle={{ color: '#fff' }}
      type="submit"
      style={{ marginTop: theme.spacing.desktopGutter }}
    />
  </form>
);

LoginPage.propTypes = propTypes;

const handleOnSubmit = (e) => {
  e.preventDefault();
  const firstName = e.target.firstName.value;
  const lastName = e.target.lastName.value;

  Meteor.loginWithName(firstName, lastName);
};

const styles = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

export default LoginPage;
