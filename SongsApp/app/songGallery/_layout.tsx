import { Ionicons } from "@expo/vector-icons";
import { Stack, usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

/* 🌸 Peónia Theme */
const THEMES = {
  light: {
    background: "#FFF9F7",
    footer: "#F6D6DC",
    border: "#E8BFC8",
    text: "#3F3A3A",
    muted: "#8B7E7E",
    icon: "#3F3A3A",
    active: "#D9778F",
  },
  dark: {
    background: "#0f172a",
    footer: "#1e293b",
    border: "#334155",
    text: "#ffffff",
    muted: "#94a3b8",
    icon: "#ffffff",
    active: "#fbbf24",
  },
};

export default function Layout() {
  const router = useRouter();
  const pathname = usePathname();
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? "dark" : "light";
  const colors = THEMES[theme];

  const isActive = (path: string) => pathname === path;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />

      {/* 📱 App Screens */}
      <Stack screenOptions={{ headerShown: false }} />

      {/* ⬇ Footer Navigation */}
      <View
        style={[
          styles.footer,
          {
            backgroundColor: colors.footer,
            borderTopColor: colors.border,
          },
        ]}
      >
       <FooterItem
          label="Home"
          icon="home"
          active={isActive("/songGallery")}
          colors={colors}
          onPress={() => router.push("/songGallery")}
        />

        <FooterItem
          label="Favorites"
          icon="heart"
          active={isActive("/songGallery/favorites")}
          colors={colors}
          onPress={() => router.push("/songGallery/favorites")}
        />

        <FooterItem
          label="Profile"
          icon="person"
          active={isActive("/songGallery/profile")}
          colors={colors}
          onPress={() => router.push("/songGallery/profile")}
        />
      </View>

      {/* ✨ Credit */}
      <Text style={[styles.credit, { color: colors.muted }]}>
        Made with ❤️ by Warushi Irchika
      </Text>
    </View>
  );
}

/* 🔘 Footer Button */
function FooterItem({
  label,
  icon,
  active,
  onPress,
  colors,
}: {
  label: string;
  icon: any;
  active: boolean;
  onPress: () => void;
  colors: any;
}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.footerItem}>
        <Ionicons
          name={icon}
          size={22}
          color={active ? colors.active : colors.icon}
        />
        <Text
          style={[
            styles.footerText,
            {
              color: active ? colors.active : colors.text,
              fontWeight: active ? "700" : "500",
            },
          ]}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

/* 🎨 Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 8,
  },

  footerItem: {
    alignItems: "center",
    paddingHorizontal: 10,
  },

  footerText: {
    fontSize: 13,
    marginTop: 4,
  },

  credit: {
    position: "absolute",
    bottom: 4,
    alignSelf: "center",
    fontSize: 11,
  },
});
