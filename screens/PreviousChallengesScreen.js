import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Alert, Button } from "react-native";
import { Avatar, Card, Paragraph } from "react-native-paper";
import axios from "axios";
import cheerio from "react-native-cheerio";

import Carder from "../components/Carder";
import ModalComponent from "../components/ModalComponent";

const PreviousChallengesScreen = ({ navigation }) => {
  const [urlName, setUrlName] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalArticleData, setModalArticleData] = useState({});

  useEffect(() => {
    axios
      .get(
        "https://www.hackerearth.com/challenges/?filters=competitive%2Chackathon%2Chiring%2Cuniversity"
      )
      .then((response) => {
        const $ = cheerio.load(response.data, {
          withDomLvl1: true,
          normalizeWhitespace: false,
          xmlMode: false,
          decodeEntities: true,
        });
        var arr = [];
        var arrfiltered;
        $("#previous-challenges-container")
          .find(".challenge-card")
          .find(".challenge-card-wrapper")
          .each((i, el) => {
            var element = $(el).attr("href");

            arr[i] = { element: element };
          });

        arrfiltered = arr.filter((item) => {
          if (item.element === "/codearena/") {
            return false;
          }
          if (item.element === undefined) {
            return false;
          }
          return true;
        });

        for (let i = 0; i < arrfiltered.length; i++) {
          if (!arrfiltered[i].element.includes("https")) {
            var tempelement = arrfiltered[i].element;
            arrfiltered[i].element = `https://hackerearth.com${tempelement}`;
          }
        }
        setUrlName(arrfiltered);
      });
  }, []);

  const handleItemDataOnPress = (articleData) => {
    setModalVisible(true);
    setModalArticleData(articleData);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setModalArticleData({});
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={urlName}
        renderItem={({ item }) => (
          <Carder url={item.element} onPress={handleItemDataOnPress} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <ModalComponent
        showModal={modalVisible}
        articleData={modalArticleData}
        onClose={handleModalClose}
      />
    </View>
  );
};

export default PreviousChallengesScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: "#EA7773",
  },
});
