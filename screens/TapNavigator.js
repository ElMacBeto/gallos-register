
import HomeScreen from "../screens/home/HomeScreen";
import SettingsTapScreen from '../screens/register/settingTapScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import * as colors from '../constants/color';
import { Image } from 'react-native';
import { icons } from "../constants/imageRoute";

const Tab = createMaterialBottomTabNavigator();

const navOptionHandler = ()=>({
  headerShown: false
})

export default  function TapNavigator() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused
                ? icons.homeWhite
                : icons.home;
            } else if (route.name === 'Register rooster') {
              iconName = focused ? 
              icons.add
              : icons.addFocus;
            }
            return <Image source={iconName} style={{width:20, height:20}} resizeMode="contain"/>;
          },
        })}
        activeColor="#000"
        inactiveColor="#0005"
        barStyle={{ backgroundColor: "#D9DDED"}}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={navOptionHandler}/>
        <Tab.Screen name="Register rooster" component={SettingsTapScreen} options={navOptionHandler} />
      </Tab.Navigator>
  );
}