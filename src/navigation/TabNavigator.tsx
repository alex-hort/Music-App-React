import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../views/Home";
import Upload from "@/views/Upload";
import Profile from "@/views/Profile";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return <Tab.Navigator>
    return 
    <Tab.Screen name="HomeScreen" component={Home} />
    <Tab.Screen name="ProfileScreen" component={Profile} />
    <Tab.Screen name="UploadScreen" component={Upload} />
    </Tab.Navigator>

}

export default TabNavigation;