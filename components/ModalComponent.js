import React from "react";
import { Dimensions, Modal, View, Text } from "react-native";
import { WebView } from "react-native-webview";
import { Button } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";

function ModalComponent({ showModal, articleData, onClose }) {
  const handleClose = () => {
    return onClose();
  };
  return (
    <Modal
      animationType="slide"
      onRequestClose={handleClose}
      transparent
      visible={showModal}
    >
      <View style={{ flex: 4 }}>
        <View
          style={{
            margin: 15,
            marginBottom: 0,
            backgroundColor: "#fff",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 3 }}>
              <Button transparent onPress={handleClose}>
                <Text style={{ color: "red" }}>X</Text>
              </Button>
            </View>
            <View style={{ flex: 9 }}>
              <Text style={{ color: "red" }}>{articleData.name}</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 10 }}>
          <WebView
            style={{ flex: 1 }}
            source={{ uri: articleData.urlName }}
            startInLoadingState
          ></WebView>
        </View>
      </View>
    </Modal>
  );
}

export default ModalComponent;
