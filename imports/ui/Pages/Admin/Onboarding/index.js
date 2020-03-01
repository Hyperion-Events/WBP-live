import { Meteor } from 'meteor/meteor';
import React, { useState, useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { AutoForm } from 'uniforms-material';

import {
  createAdminAccountSchema,
  createShowGamesSchema,
  createEstimationGamesSchema,
} from '/imports/api/onboarding/schema';

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
  content: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
}));

const makeAutoForm = (schema) => ({ model, onSubmit, setForm }) => {
  return (
    <AutoForm
      schema={schema}
      model={model}
      onSubmit={onSubmit}
      ref={setForm}
      submitField={() => <input type="submit" hidden />}
    />
  );
};

const steps = [
  {
    label: 'Admin-Account',
    helpText: 'Mit diesem Account kannst du dich dann im Adminbereich anmelden',
    Component: makeAutoForm(createAdminAccountSchema),
  },
  {
    label: 'Spiele der Show',
    helpText: 'Gib bitte die Namen der Spiele für diese Show ein.',
    Component: makeAutoForm(createShowGamesSchema),
  },
  {
    label: 'Fragen für Schätzen',
    helpText:
      'Gibt bitte die Schätzenfragen mit ihrem Typ ein. WICHTIG: Die Antworten müssen im Dashboard noch angepasst werden.',
    Component: makeAutoForm(createEstimationGamesSchema),
  },
];

const Onboarding = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [state, setState] = useState(Object.fromEntries(steps.map((_, i) => [i, {}])));

  const submitActiveForm = async (callback) => {
    const { form } = state[activeStep];
    await form.submit();
    callback();
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const Component = steps[activeStep]?.Component || (() => null);
  const currentStep = (
    <Component
      model={state[activeStep]?.model}
      onSubmit={(model) => {
        setState((prevState) => ({
          ...prevState,
          [activeStep]: { ...prevState[activeStep], model },
        }));
      }}
      setForm={useCallback(
        (form) => {
          setState((prevState) => ({
            ...prevState,
            [activeStep]: { ...prevState[activeStep], form },
          }));
        },
        [activeStep],
      )}
    />
  );
  return (
    <Box width={1} height={1} display="flex" flexDirection="column">
      <Stepper activeStep={activeStep}>
        {steps.map(({ label }) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box width={1} display="flex" alignItems="center" justifyContent="center" flexGrow={1}>
        {activeStep === steps.length ? (
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                doOnboarding(state);
              }}
            >
              WBP Live einrichten
            </Button>
          </Box>
        ) : (
          <Box width={1 / 2}>
            <Box width={1} my={8}>
              <Typography variant="h5" gutterBottom>
                {steps[activeStep].label}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {steps[activeStep].helpText}
              </Typography>
              <Box my={1}>{currentStep}</Box>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
              <Button
                disabled={activeStep === 0}
                onClick={() => {
                  submitActiveForm(handleBack);
                }}
                className={classes.button}
              >
                Zurück
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  submitActiveForm(handleNext);
                }}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Abschließen' : 'Nächster Schritt'}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

function doOnboarding(state) {
  const data = Object.fromEntries(
    Object.entries(state).map(([key, value]) => {
      return [key, value.model];
    }),
  );

  Meteor.call('onboarding.createAdmin', data, (err) => {
    if (err) {
      console.log('createAdmin', err);
      return;
    }

    const { username, password } = data['0'];
    Meteor.loginWithPassword(username, password, (err) => {
      if (err) {
        console.log('loginWithPassword', err);
        return;
      }

      Meteor.call('onboarding.insert', data, (err, res) => {
        if (err) {
          console.log('onboarding.insert', err);
          return;
        }
      });
    });
  });
}

export default Onboarding;
