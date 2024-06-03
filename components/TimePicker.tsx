import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { TimerPickerModal } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";

const TimerPicker = ({ setShowPicker, timerDuration, setTimerDuration }) => {
  return (
    <View style={styles.container}>
      <TimerPickerModal
        visible={true}
        setIsVisible={setShowPicker}
        onConfirm={(pickedDuration) => {
          setTimerDuration(pickedDuration);
          setShowPicker(false);
        }}
        modalTitle="Set Timer"
        onCancel={() => setShowPicker(false)}
        closeOnOverlayPress
        Audio={Audio}
        LinearGradient={LinearGradient}
        Haptics={Haptics}
        styles={{
          theme: "dark",
        }}
        modalProps={{
          overlayOpacity: 0.2,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#202020",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TimerPicker;
