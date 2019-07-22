import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Login from '../Login';
import SignUp from '../SignUp';

const LoginStack = createStackNavigator({ Login });
const SignUpStack = createStackNavigator({ SignUp });

const AuthStack = createSwitchNavigator({ LoginStack, SignUpStack }, { initialRouteName: 'LoginStack' });

export default AuthStack;
