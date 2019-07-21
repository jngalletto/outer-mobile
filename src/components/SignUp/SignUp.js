import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../common/Button';
import TextField from '../common/TextField';
import ErrorView from '../common/ErrorView';
import styles from './styles';

import ShadowStyles from 'helpers/ShadowStyles';
import TextStyles from 'helpers/TextStyles';
import getUser from 'selectors/UserSelectors';
import errorsSelector from 'selectors/ErrorSelectors';
import { isLoadingSelector } from 'selectors/StatusSelectors';
import strings from 'localization';
import { signUp, actionTypes } from 'actions/UserActions';

function SignUp(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');

  const user = useSelector(state => getUser(state));
  const isLoading = useSelector(state => isLoadingSelector([actionTypes.LOGIN], state));
  const errors = useSelector(state => errorsSelector([actionTypes.LOGIN], state));

  const dispatch = useDispatch();
  const signUpUser = useCallback(() => dispatch(signUp(email, password, firstName, lastName, username)), [email, password, firstName, lastName, username, dispatch]);
  const passwordChanged = useCallback(value => setPassword(value), []);
  const passwordConfirmationChanged = useCallback(value => setPassword(value), []);
  const emailChanged = useCallback(value => setEmail(value), []);
  const firstNameChanged = useCallback(value => setFirstName(value), []);
  const lastNameChanged = useCallback(value => setLastName(value), []);
  const usernameChanged = useCallback(value => setUsername(value), []);
  const navigateToLogin = () => props.navigation.navigate('Login');

  useEffect(() => {
    if (user !== null) {
      props.navigation.navigate('App');
    }
  });

  return (
    <View style={styles.container}>
      <View style={[styles.formContainer, ShadowStyles.shadow]}>
        <Text style={TextStyles.fieldTitle}>
          {strings.firstName}
        </Text>
        <TextField
          placeholder={strings.firstName}
          onChangeText={firstNameChanged}
          value={firstName}
        />
        <Text style={TextStyles.fieldTitle}>
          {strings.lastName}
        </Text>
        <TextField
          placeholder={strings.lastName}
          onChangeText={lastNameChanged}
          value={lastName}
        />
        <Text style={TextStyles.fieldTitle}>
          {strings.email}
        </Text>
        <TextField
          placeholder={strings.email}
          onChangeText={emailChanged}
          value={email}
        />
        <Text style={TextStyles.fieldTitle}>
          {strings.username}
        </Text>
        <TextField
          placeholder={strings.username}
          onChangeText={usernameChanged}
          value={username}
        />
        <Text style={TextStyles.fieldTitle}>
          {strings.password}
        </Text>
        <TextField
          placeholder={strings.password}
          value={password}
          onChangeText={passwordChanged}
          secureTextEntry
        />
        <Text style={TextStyles.fieldTitle}>
          {strings.passwordConfirmation}
        </Text>
        <TextField
          placeholder={strings.passwordConfirmation}
          value={passwordConfirmation}
          onChangeText={passwordConfirmationChanged}
          secureTextEntry
        />
        <ErrorView errors={errors} />
        <Button
          onPress={signUpUser}
          title={isLoading ? strings.loading : strings.signUp}
        />
        <Text style={TextStyles.textLink} onPress={navigateToLogin}>
          {strings.tryLogin}
        </Text>
      </View>
    </View>
  );
}

SignUp.navigationOptions = {
  header: null,
};

SignUp.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default SignUp;
