import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyProfile from './MyProfile';
import ManageShop from './ManageShop';
import Home from './Home';
import { Header } from 'react-native/Libraries/NewAppScreen';
import AddShop from './AddShop';
import UpdateShop from './UpdateShop';

const Stack = createNativeStackNavigator();
export default function App() {

  return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen options={{headerShown:false}} name='Home' component={Home}/>
        <Stack.Screen options={{title:"Trang cá nhân"}} name='MyProfile' component={MyProfile}/>
        <Stack.Screen options={{title:"Thêm cửa hàng"}} name='AddShop' component={AddShop}/>
        <Stack.Screen options={{title:"Sửa cửa hàng"}} name='UpdateShop' component={UpdateShop}/>
        <Stack.Screen options={{title:"Trang quản lý cửa hàng"}} name='ManageShop' component={ManageShop} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 

const styles = StyleSheet.create({});
