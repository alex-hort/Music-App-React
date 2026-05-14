import { NavigationContainer } from '@react-navigation/native';
import { FC, useEffect } from 'react';
import AuthNavigator from './AuthNavigator';
import { View, StyleSheet } from 'react-native';
import {
  getAuthState,
  updateBusyState,
  updateLoggedInState,
  updateProfile,
} from '@/store/auth';
import { useDispatch, useSelector } from 'react-redux';
import TabNavigator from './TabNavigator';
import { getFromAsyncStorage, Keys } from '@/utils/asyncStorage';
import client from '@/api/client';
import colors from '@/utils/colors';
import Loader from '@/views/ui/Loader';

interface Props {}

const AppNavigator: FC<Props> = props => {
  const { loggedIn, busy } = useSelector(getAuthState);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAuthInfo = async () => {
      dispatch(updateBusyState(true));

      try {
        const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);

        if (!token) {
          return dispatch(updateBusyState(false));
        }

        const { data } = await client.get('/auth/is-auth', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(updateProfile(data.user));
        dispatch(updateLoggedInState(true));
      } catch (error) {
        console.log('Error fetching auth info from async storage', error);
      }

      dispatch(updateBusyState(false));
    };

    fetchAuthInfo();
  }, []);

  return (
    <NavigationContainer>
      {busy ? (
        <View
          style={{
            ...StyleSheet.absoluteFill,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.OVERLAY,
            zIndex: 1,
          }}>
          <Loader />
        </View>
      ) : null}

      {loggedIn ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
