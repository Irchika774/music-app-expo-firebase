import { Link, router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { auth, db } from "../../firebaseconfig";

/* 🌸 Peónia Theme */
const THEMES = {
  light: {
    background: "#FFF9F7",
    card: "#F6D6DC",
    text: "#3F3A3A",
    muted: "#8B7E7E",
    button: "#D9778F",
    inputBorder: "#E8BFC8",
  },
  dark: {
    background: "#0f172a",
    card: "#1e293b",
    text: "#ffffff",
    muted: "#94a3b8",
    button: "#fbbf24",
    inputBorder: "#334155",
  },
};

export default function Register() {
  const scheme = useColorScheme();
  const colors = THEMES[scheme === "dark" ? "dark" : "light"];

  const [name, setName] = useState<string>(""); // ✅ fixed
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        createdAt: new Date(),
      });

      alert("Account created successfully!");
      router.replace("/auth/login");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* 🌸 Title */}
      <Text style={[styles.title, { color: colors.text }]}>
        Create Account
      </Text>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <TextInput
          style={[
            styles.input,
            { borderColor: colors.inputBorder, color: colors.text },
          ]}
          placeholder="Full Name"
          placeholderTextColor={colors.muted}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={[
            styles.input,
            { borderColor: colors.inputBorder, color: colors.text },
          ]}
          placeholder="Email"
          placeholderTextColor={colors.muted}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
        />

        <TextInput
          style={[
            styles.input,
            { borderColor: colors.inputBorder, color: colors.text },
          ]}
          placeholder="Password"
          placeholderTextColor={colors.muted}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.button }]}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Link href="/auth/login" style={[styles.linkText, { color: colors.text }]}>
          Already have an account? Login
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
  title: {
    fontSize: 36,
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "700",
  },
  card: {
    borderRadius: 26,
    padding: 22,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  linkText: {
    textAlign: "center",
    fontSize: 15,
    opacity: 0.8,
  },
});
