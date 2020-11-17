import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Drawer } from "react-native-paper";
import { DrawerItem, Drwaer } from "@react-navigation/drawer";

export function DrawerContent(props) {
  return (
    <View style={{ flex: 1, backgroundColor: "#EA7773" }}>
      <Drawer.Section style={{ marginTop: 50 }}>
        <View style={styles.drawerContent}>
          <DrawerItem
            inactiveTintColor="#B83227"
            label="Live Challenges"
            onPress={() => {
              props.navigation.navigate("Live");
            }}
          />
        </View>
        <View style={styles.drawerContent}>
          <DrawerItem
            inactiveTintColor="#B83227"
            label="Upcoming Challenges"
            onPress={() => {
              props.navigation.navigate("Upcoming");
            }}
          />
        </View>
        <View style={styles.drawerContent}>
          <DrawerItem
            inactiveTintColor="#B83227"
            label="Previous Challenges"
            onPress={() => {
              props.navigation.navigate("Previous");
            }}
          />
        </View>
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    borderRadius: 50,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: "#B83227",
  },
});
