import React from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createMaterialBottomTabNavigator();
const LiveStack = createStackNavigator();
const UpcomingStack = createStackNavigator();
const PreviousStack = createStackNavigator();

import { Entypo } from "@expo/vector-icons";

import LiveChallengesScreen from "./LiveChallengesScreen";
import UpcomingChallengesScreen from "./UpcomingChallengesScreen";
import PreviousChallengesScreen from "./PreviousChallengesScreen";

const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Live"
    activeColor="#fff"
    barStyle={{ backgroundColor: "#D63031" }}
  >
    <Tab.Screen
      name="Live"
      component={LiveStackScreen}
      options={{
        tabBarLabel: "Live Challenges",
      }}
    />
    <Tab.Screen
      name="Upcoming"
      component={UpcomingStackScreen}
      options={{
        tabBarLabel: "Upcoming Challenges",
      }}
    />
    <Tab.Screen
      name="Previous"
      component={PreviousStackScreen}
      options={{
        tabBarLabel: "Previous Challenges",
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;
const LiveStackScreen = ({ navigation }) => {
  return (
    <LiveStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#D63031",
        },
        headerTintColor: "#fff",
      }}
    >
      <LiveStack.Screen
        name="Live"
        options={{
          title: "Live Challenges",
          headerLeft: () => (
            <Entypo
              name="menu"
              style={{ marginLeft: 10 }}
              size={25}
              color="#fff"
              backgroundColor="#009387"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
        component={LiveChallengesScreen}
      />
    </LiveStack.Navigator>
  );
};

const UpcomingStackScreen = ({ navigation }) => {
  return (
    <UpcomingStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#D63031",
        },
        headerTintColor: "#fff",
      }}
    >
      <UpcomingStack.Screen
        name="Upcoming"
        options={{
          title: "Upcoming Challenges",
          headerLeft: () => (
            <Entypo
              name="menu"
              style={{ marginLeft: 10 }}
              size={25}
              color="#fff"
              backgroundColor="#009387"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
        component={UpcomingChallengesScreen}
      />
    </UpcomingStack.Navigator>
  );
};

const PreviousStackScreen = ({ navigation }) => {
  return (
    <PreviousStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#D63031",
        },
        headerTintColor: "#fff",
      }}
    >
      <PreviousStack.Screen
        name="Previous"
        options={{
          title: "Previous Challenges",
          headerLeft: () => (
            <Entypo
              name="menu"
              style={{ marginLeft: 10 }}
              size={25}
              color="#fff"
              backgroundColor="#009387"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
        component={PreviousChallengesScreen}
      />
    </PreviousStack.Navigator>
  );
};
