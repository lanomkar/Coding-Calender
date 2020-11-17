import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, Alert } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import axios from "axios";
import cheerio from "react-native-cheerio";

import * as Calendar from "expo-calendar";

const CarderUpcoming = ({ url, challType, onPress }) => {
  const [type, setType] = useState(challType);
  const [urlName, setUrlName] = useState(url);
  const [result, setResult] = useState({ image: "", name: "" });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [duration, setDuration] = useState("");
  const [uniqueID, setUniqueId] = useState("");
  const [timeZone, setTimeZone] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync();
      }
    })();
  }, []);

  async function getDefaultCalendarSource() {
    const calendars = await Calendar.getCalendarsAsync();
    const defaultCalendars = calendars.filter(
      (each) => each.source.name === "Default"
    );
    return defaultCalendars[0].source;
  }
  const createEvent = async () => {
    const defaultCalendarSource =
      Platform.OS === "ios"
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: "Expo Calendar" };
    const newCalendarID = await Calendar.createCalendarAsync({
      title: "Expo Calendar",
      color: "blue",
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: "internalCalendarName",
      ownerAccount: "personal",
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });

    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === "granted") {
      await Calendar.createEventAsync(newCalendarID, {
        title: result.name,
        startDate: startDate,
        endDate: endDate,
      })
        .then((res) => console.log("Res", res))
        .catch((err) => console.log("error", err));
    }
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
      var id = $(".event-timings")
        .find(".timing")
        .children("span")
        .next()
        .text()
        .replace(/ /g, "");

      var date = $(".event-timings")
        .find(".timing")
        .children("span")
        .next()
        .text();

      var month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      var eMonthIndex;
      var eDayDate;

      var fullSdateDemo = date.split("IST");
      var fullEdateDemo = date.split(",");

      var sDateDemo = fullSdateDemo[0].split(",")[0];
      var eDateDemo = fullEdateDemo[1];

      var sMonthNameDemo = sDateDemo.split(" ")[0];
      var eMonthNameDemo = eDateDemo.split(" ")[3];

      var smonth = month.indexOf(sMonthNameDemo);
      var emonth = month.indexOf(eMonthNameDemo);

      var sDayDate = sDateDemo.split(" ")[1];
      var eDayDate = eDateDemo.split(" ")[4];

      const sDate = new Date("2020", smonth, sDayDate);
      const eDate = new Date("2020", emonth, eDayDate);

      if (companyImage == "") {
        companyImage = require("../assets/noImage.png");
      }
      var split = new Date().toString().split(" ");
      var tZone = split[split.length - 2] + " " + split[split.length - 1];

      setStartDate(sDate);
      setEndDate(eDate);
      setUniqueId(id);
      setTimeZone(tZone);
      setResult({ ...result, name: siteTitle, image: companyImage });
    });
  }, []);

  const handlePress = () => {
    const name = result.name;
    onPress({ urlName, name });
  };

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
          <Button onPress={createEvent}>Save to Calender</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default CarderUpcoming;
