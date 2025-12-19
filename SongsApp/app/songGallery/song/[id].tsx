import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { songs } from "../../../assets/data/songs";


const { height } = Dimensions.get("window");

/* 🌸 Peónia Theme */
const COLORS = {
  background: "#FFF9F7",
  card: "#F6D6DC",
  rose: "#F2C1CC",
  sage: "#9CAF9C",
  textDark: "#3F3A3A",
  textMuted: "#8B7E7E",
  link: "#3b82f6",
};

export default function SongDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const song = songs.find((m) => m.id.toString() === id);
  const [rating, setRating] = useState(0);

  /* ⭐ Load saved rating */
  useEffect(() => {
    const loadRating = async () => {
      if (!song) return;
      const saved = await AsyncStorage.getItem(`rating-${song.id}`);
      if (saved) setRating(Number(saved));
    };
    loadRating();
  }, [song]);

  /* 💾 Save rating */
  const handleRating = async (value: number) => {
    if (!song) return;
    setRating(value);
    await AsyncStorage.setItem(`rating-${song.id}`, value.toString());
  };

  /* 🕒 Recently Viewed */
  useEffect(() => {
    const addToRecentlyViewed = async () => {
      if (!song) return;
      const stored = await AsyncStorage.getItem("recentlyViewed");
      let recent: number[] = stored ? JSON.parse(stored) : [];
      recent = recent.filter((x) => x !== song.id);
      recent.unshift(song.id);
      if (recent.length > 10) recent.pop();
      await AsyncStorage.setItem("recentlyViewed", JSON.stringify(recent));
    };
    addToRecentlyViewed();
  }, [song]);

  if (!song) {
    return (
      <View style={styles.notFound}>
        <Text style={{ fontFamily: "Inter" }}>Song not found</Text>
      </View>
    );
  }

  return (
   <ScrollView
         style={styles.container}
         contentContainerStyle={{ paddingBottom: 80 }}
       >
      {/* 🔙 Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={22} color={COLORS.textDark} />
      </TouchableOpacity>

      {/* 🎵 Cover Image */}
      <Image source={song.image} style={styles.image} />

      {/* 📄 Content */}
      <View style={styles.content}>
        <Text style={styles.title}>{song.title}</Text>

        <Text style={styles.description}>{song.description}</Text>

        {/* ℹ Info Card */}
        <View style={styles.infoCard}>
          <InfoRow label="Artist" value={song.artist} />
          <InfoRow label="Genre" value={song.genre} />
          <InfoRow label="Release" value={song.releaseDate} />

          <TouchableOpacity
            onPress={() => Linking.openURL(song.youtubeUrl)}
            style={styles.playButton}
          >
            <Ionicons name="play" size={18} color={COLORS.textDark} />
            <Text style={styles.playText}>Play on YouTube</Text>
          </TouchableOpacity>
        </View>

        {/* ⭐ Rating */}
        <View style={styles.ratingSection}>
          <Text style={styles.rateTitle}>Rate this song</Text>

          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => handleRating(star)}>
                <Ionicons
                  name={star <= rating ? "star" : "star-outline"}
                  size={32}
                  color={COLORS.rose}
                  style={{ marginHorizontal: 6 }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

/* 🔹 Reusable Info Row */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

/* 🎨 Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  backButton: {
    position: "absolute",
    top: 45,
    left: 20,
    zIndex: 2,
    backgroundColor: COLORS.card,
    padding: 8,
    borderRadius: 20,
  },

  image: {
    width: "100%",
    height: height * 0.5,
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 34,
    fontFamily: "Amatic",
    color: COLORS.textDark,
    marginBottom: 8,
  },

  description: {
    fontSize: 15,
    fontFamily: "Inter",
    color: COLORS.textMuted,
    marginBottom: 20,
    lineHeight: 22,
  },

  infoCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 16,
  },

  label: {
    fontSize: 13,
    fontFamily: "Inter",
    color: COLORS.textMuted,
  },

  value: {
    fontSize: 16,
    fontFamily: "Inter",
    color: COLORS.textDark,
  },

  playButton: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  playText: {
    fontFamily: "Inter",
    fontSize: 15,
    color: COLORS.link,
  },

  ratingSection: {
    marginTop: 35,
    alignItems: "center",
  },

  rateTitle: {
    fontFamily: "Amatic",
    fontSize: 26,
    color: COLORS.textDark,
    marginBottom: 10,
  },

  starsRow: {
    flexDirection: "row",
  },

  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});  