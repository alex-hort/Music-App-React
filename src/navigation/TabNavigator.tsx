import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../views/Home';
import Upload from '@/views/Upload';
import Profile from '@/views/Profile';
import colors from '@/utils/colors';
import AntDesing from 'react-native-vector-icons/AntDesign';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.PRIMARY,
        },
      }}
    >
      return
      <Tab.Screen
        name="HomeScreen"
        component={Home}
        options={{
          tabBarIcon: props => {
            return (
              <AntDesing name="home" size={props.size} color={props.color} />
            );
          },
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen name="ProfileScreen" component={Profile} options={{
        tabBarIcon: props => {
          return (
            <AntDesing name="user" size={props.size} color={props.color} />
          );
        },
        tabBarLabel: 'Profile',
      }} />
      <Tab.Screen name="UploadScreen" component={Upload} options={{
        tabBarIcon: props => {
          return (
            <MaterialComIcon name="account-music-outline" size={props.size} color={props.color} />
          );
        },
        tabBarLabel: 'Upload',
      }} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
