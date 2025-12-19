import { Link, router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { auth } from "../../firebaseconfig";

/* 🌸 Peónia Theme */
const THEMES = {
  light: {
    background: "#FFF9F7",
    card: "#F6D6DC",
    border: "#E8BFC8",
    text: "#3F3A3A",
    muted: "#8B7E7E",
    primary: "#D9778F",
  },
  dark: {
    background: "#0f172a",
    card: "#1e293b",
    border: "#334155",
    text: "#ffffff",
    muted: "#94a3b8",
    primary: "#fbbf24",
  },
};

export default function Login() {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? "dark" : "light";
  const colors = THEMES[theme];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      router.replace("/songGallery");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* 🌸 Card */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.text }]}>
          Welcome Back 🎵
        </Text>

        <Text style={[styles.subtitle, { color: colors.muted }]}>
          Login to continue
        </Text>

        <TextInput
          style={[
            styles.input,
            { borderColor: colors.border, color: colors.text },
          ]}
          placeholder="Email"
          placeholderTextColor={colors.muted}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={[
            styles.input,
            { borderColor: colors.border, color: colors.text },
          ]}
          placeholder="Password"
          placeholderTextColor={colors.muted}
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Link href="/auth/signup" style={[styles.linkText, { color: colors.text }]}>
          Don’t have an account?{" "}
          <Text style={{ color: colors.primary, fontWeight: "600" }}>
            Register
          </Text>
        </Link>
      </View>
    </View>
  );
}

/* 🎨 Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  card: {
    borderRadius: 24,
    padding: 26,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 28,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 18,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  linkText: {
    fontSize: 15,
    textAlign: "center",
  },
});
