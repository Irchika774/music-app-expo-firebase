import { Ionicons } from "@expo/vector-icons";
import { Stack, usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  );
}

function Layout() {
  const router = useRouter();
  const pathname = usePathname();
  const { colors, theme, toggleTheme } = useTheme();

  const isActive = (path: string) => pathname === path;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <StatusBar style={theme === "dark" ? "light" : "dark"} />

      {/* Screens */}
      <Stack screenOptions={{ headerShown: false }} />

      {/* Footer */}
      <View
        style={[
          styles.footer,
          {
            backgroundColor: colors.footer,
            borderTopColor: colors.border,
          },
        ]}
      >
        <View style={styles.navRow}>
          <FooterItem
            label="Home"
            icon="home"
            active={isActive("/songGallery")}
            colors={colors}
            onPress={() => router.replace("/songGallery")}
          />
          <FooterItem
            label="Favorites"
            icon="heart"
            active={isActive("/songGallery/favorites")}
            colors={colors}
            onPress={() => router.replace("/songGallery/favorites")}
          />
          <FooterItem
            label="Profile"
            icon="person"
            active={isActive("/songGallery/profile")}
            colors={colors}
            onPress={() => router.replace("/songGallery/profile")}
          />

          {/* Theme Button */}
          <Pressable
            onPress={toggleTheme}
            style={({ pressed }) => [
              styles.footerButton,
              { opacity: pressed ? 0.6 : 1 },
            ]}
          >
            <Ionicons
              name={theme === "light" ? "moon" : "sunny"}
              size={24} // larger for clarity
              color={colors.icon}
            />
            <Text
              style={[
                styles.footerText,
                { color: colors.text },
              ]}
            >
              Theme
            </Text>
          </Pressable>
        </View>

        <Text
          style={[
            styles.credit,
            { color: colors.muted },
          ]}
        >
          Made with ❤️ by Warushi Irchika
        </Text>
      </View>
    </View>
  );
}

/* Footer Item */
function FooterItem({
  label,
  icon,
  active,
  onPress,
  colors,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  active: boolean;
  onPress: () => void;
  colors: any;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.footerButton,
        { opacity: pressed ? 0.6 : 1 },
      ]}
    >
      <Ionicons
        name={icon}
        size={24} // slightly larger
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
    </Pressable>
  );
}

/* Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 105,
    borderTopWidth: 1,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 8,
  },
  navRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  footerButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14, // slightly bigger touch target
    paddingVertical: 6,
  },
  footerText: {
    fontSize: 13,
    marginTop: 4,
  },
  credit: {
    fontSize: 10,
    marginTop: 8,
  },
});
