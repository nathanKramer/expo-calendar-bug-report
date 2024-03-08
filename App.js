import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as Calendar from "expo-calendar";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  useEffect(() => {
    async function requestPermissions() {
      await Calendar.requestCalendarPermissionsAsync();
    }

    requestPermissions();
  }, []);

  const onClick = async () => {
    const calendar = await Calendar.getDefaultCalendarAsync();

    const recurrenceRule = {
      daysOfTheWeek: [
        { dayOfTheWeek: 2 },
        { dayOfTheWeek: 3 },
        { dayOfTheWeek: 6 },
      ],
      frequency: "WEEKLY",
    };

    const event = {
      startDate: new Date(),
      endDate: new Date(),
      recurrenceRule,
      title: "Test Calendar Event",
    };

    console.log("[Creating Event]\n", JSON.stringify(event, null, 2));
    await Calendar.createEventAsync(calendar.id, event);
  };
  return (
    <View style={styles.container}>
      <Text>
        The below button should create a recurring event in the device's
        calendar.
      </Text>
      <Button title="Create" onPress={onClick} />

      <Text>
        After clicking, please go to the calendar app and note that the event is
        not recurring.
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
