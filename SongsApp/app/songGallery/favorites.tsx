import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

/* 🌸 Shared Themes (same as Home) */
const THEMES = {
  light: {
    background: "#FFF9F7",
    card: "#F6D6DC",
    text: "#3F3A3A",
    muted: "#8B7E7E",
    accent: "#ef4444",
    button: "#E6EFE6",
  },
  dark: {
    background: "#0f172a",
    card: "#1e293b",
    text: "#ffffff",
    muted: "#94a3b8",
    accent: "#ef4444",
    button: "#1e293b",
  },
};

export default function Favorites() {
  const router = useRouter();
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? "dark" : "light";
  const colors = THEMES[theme];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Ionicons
        name="heart"
        size={80}
        color={colors.accent}
        style={{ marginBottom: 20 }}
      />

      <Text style={[styles.title, { color: colors.text }]}>
        Your Favorites
      </Text>

      <Text style={[styles.subtitle, { color: colors.muted }]}>
        Your vibe will appear here
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.button }]}
        onPress={() => router.push("./")}
      >
        <Text style={[styles.buttonText, { color: colors.text }]}>
          Go Back Home
        </Text>
      </TouchableOpacity>
    </View>
  );
}

/* 🎨 Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 14,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
