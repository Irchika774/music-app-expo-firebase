import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

import { auth, db } from "../../firebaseconfig";

/* 🌸 Shared Themes */
const THEMES = {
  light: {
    background: "#FFF9F7",
    card: "#F6D6DC",
    text: "#3F3A3A",
    muted: "#8B7E7E",
    primary: "#38bdf8",
    danger: "#ef4444",
    button: "#E6EFE6",
  },
  dark: {
    background: "#0f172a",
    card: "#1e293b",
    text: "#ffffff",
    muted: "#94a3b8",
    primary: "#38bdf8",
    danger: "#ef4444",
    button: "#1e293b",
  },
};

export default function Profile() {
  const router = useRouter();
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? "dark" : "light";
  const colors = THEMES[theme];

  const [name, setName] = useState("User");
  const [email, setEmail] = useState("user@example.com");

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        router.replace("/auth/login");
        return;
      }

      setEmail(currentUser.email || "user@example.com");

      try {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setName(data.name || "User");
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    router.replace("/auth/login");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image
        source={{ uri: "https://i.pravatar.cc/150?img=12" }}
        style={styles.avatar}
      />

      {/* ✅ REAL USER DATA */}
      <Text style={[styles.name, { color: colors.text }]}>{name}</Text>
      <Text style={[styles.email, { color: colors.muted }]}>{email}</Text>

      <View style={[styles.infoBox, { backgroundColor: colors.card }]}>
        <Ionicons name="film" size={20} color={colors.primary} />
        <Text style={[styles.infoText, { color: colors.text }]}>
          Total Watched: 42
        </Text>
      </View>

      <View style={[styles.infoBox, { backgroundColor: colors.card }]}>
        <Ionicons name="heart" size={20} color={colors.danger} />
        <Text style={[styles.infoText, { color: colors.text }]}>
          Favorites: 10
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.button }]}
        onPress={() => router.replace("/songGallery")}
      >
        <Text style={[styles.buttonText, { color: colors.text }]}>
          Go Back Home
        </Text>
      </TouchableOpacity>

      {/* ✅ LOGOUT BUTTON */}
      <TouchableOpacity onPress={handleLogout} style={{ marginTop: 20 }}>
        <Text style={{ color: colors.danger, fontWeight: "600" }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

/* 🎨 Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 80,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
  },
  email: {
    marginBottom: 30,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    width: "80%",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "500",
  },
  button: {
    marginTop: 40,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 14,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
