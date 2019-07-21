import { StyleSheet } from 'react-native';
import Colors from '../helpers/Colors';

const styles = StyleSheet.create({
  lightTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
  },
  textField: {
    fontSize: 15,
    fontWeight: 'normal',
  },
  fieldTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  textLink: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 20,
    color: Colors.primary,
  },
  error: {
    fontSize: 14,
    color: Colors.red,
  },
});

export default styles;
