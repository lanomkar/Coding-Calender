import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import axios from "axios";
import cheerio from "react-native-cheerio";

const Carder = ({ url, challType, onPress }) => {
  const [type, setType] = useState(challType);
  const [urlName, setUrlName] = useState(url);
  const [result, setResult] = useState({ image: "", name: "" });

  const handlePress = () => {
    const name = result.name;
    onPress({ urlName, name });
  };

  useEffect(() => {
    axios.get(`${urlName}`).then((response) => {
      const $ = cheerio.load(response.data, {
        withDomLvl1: true,
        normalizeWhitespace: false,
        xmlMode: false,
        decodeEntities: true,
      });
      var siteTitle = $(".event-title").text().replace(/\s\s+/g, "");
      var companyImage = $(".company-img").find("img").attr("src");
      // if (!companyImage) {
      //   companyImage = require("../assets/noImage.png");
      // }
      setResult({ ...result, name: siteTitle, image: companyImage });
    });
  }, []);

  return (
    <View>
      <Card
        style={{
          borderWidth: 1,
          borderColor: "#000",
          paddingHorizontal: 10,
          marginHorizontal: 10,
          marginBottom: 15,
        }}
      >
        <Card.Content>
          <Title>{result.name}</Title>
          <Paragraph>{type}</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: `${result.image}` }} />
        <Card.Actions>
          <Button onPress={handlePress}>View</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default Carder;
