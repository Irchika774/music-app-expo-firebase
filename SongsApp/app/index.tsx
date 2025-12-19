import { router } from "expo-router";
import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const COLORS = {
  background: "#FFF9F7",
  primary: "#D9778F",
  text: "#3F3A3A",
  muted: "#8B7E7E",
};

export default function SplashScreen() {
  const [step, setStep] = useState(0);

  const screens = [
    {
      animation: require("../assets/images/music_song.json"),
      title: "Welcome to SongVerse",
      subtitle: "Discover songs that match your vibe",
    },
    {
      animation: require("../assets/images/cozy_drink.json"),
      title: "Explore Music",
      subtitle: "Browse genres, moods & trending tracks",
    },
    {
      animation: require("../assets/images/Spotify_like.json"),
      title: "Save Favorites",
      subtitle: "Keep the songs you love in one place",
    },
  ];

  const gotoLogin = () => router.replace("/auth/login");

  useEffect(() => {
    const timer = setTimeout(() => {
      step < screens.length - 1 ? setStep(step + 1) : gotoLogin();
    }, 3000);
    return () => clearTimeout(timer);
  }, [step]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipBtn} onPress={gotoLogin}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <Lottie
        animationData={screens[step].animation}
        loop
        autoplay
        style={styles.animation}
      />

      <Text style={styles.title}>{screens[step].title}</Text>
      <Text style={styles.subtitle}>{screens[step].subtitle}</Text>

      <View style={styles.btnRow}>
        {step > 0 ? (
          <TouchableOpacity style={styles.navBtnOutline} onPress={() => setStep(step - 1)}>
            <Text style={styles.navTextOutline}>Back</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 90 }} />
        )}

        <TouchableOpacity style={styles.navBtn} onPress={gotoLogin}>
          <Text style={styles.navText}>
            {step === screens.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  skipBtn: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#F6D6DC",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  skipText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "600",
  },
  animation: {
    width: 320,
    height: 320,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginTop: 20,
    color: COLORS.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.muted,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 22,
  },
  btnRow: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginTop: 40,
    alignItems: "center",
  },
  navBtn: {
    backgroundColor: COLORS.primary,
    width: 120,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  navText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  navBtnOutline: {
    width: 90,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  navTextOutline: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "600",
  },
});
