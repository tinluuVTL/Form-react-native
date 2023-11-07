import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from './src/components/Home';
import Login from './src/components/LoginForm';
import Register from './src/components/RegisterForm';
import Product from './src/components/ProductForm';
import ProductReview from './src/components/ProductReview'
import Order from './src/components/OrderForm'
import Event from './src/components/EventForm'
const Tab = createBottomTabNavigator();

const App = () => {
  const [isRegisterScreen, setIsRegisterScreen] = useState(true);

  const switchToRegisterScreen = () => {
    setIsRegisterScreen(true);
  };

  const switchToLoginScreen = () => {
    setIsRegisterScreen(false);
  };

  const BaiTabs = () => (
    <Tab.Navigator>
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarIcon: ({ size, color }) => (   
            <Ionicons name="log-in-outline" size={size} color={color} />
          ),
        }}
        initialParams={{ onSwitchToRegister: switchToRegisterScreen }}
      />
      <Tab.Screen
        name="Register"
        component={Register}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person-add-outline" size={size} color={color} />
          ),
        }}
        initialParams={{ onSwitchToLogin: switchToLoginScreen }}
      />
      <Tab.Screen
        name="Product"
        component={Product}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />
       <Tab.Screen
        name="ProductReview"
        component={ProductReview}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={Order}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="bookmarks-outline" size={size} color={color} />
          ),
        }}
      />
       <Tab.Screen
        name="Event"
        component={Event}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="archive-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="HOME"
          component={Home}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Danh sách bài tập"
          component={BaiTabs}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="ios-list" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;