import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { songs } from "../../assets/data/songs";

/* 🌸 Peónia Color Palette */
const COLORS = {
  blush: "#F6D6DC",
  dustyPink: "#E8BFC8",
  rose: "#F2C1CC",
  sage: "#9CAF9C",
  lightSage: "#E6EFE6",
  ivory: "#FFF9F7",
  textDark: "#3F3A3A",
  textMuted: "#8B7E7E",
};

const CARD_WIDTH = 220;
const CARD_HEIGHT = 300;

export default function Home() {
  const router = useRouter();

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [recentSongs, setRecentSongs] = useState<typeof songs>([]);
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});

  /* 🔤 Load Fonts */
  useEffect(() => {
    Font.loadAsync({
      Amatic: require("../../assets/fonts/AmaticSC-Regular.ttf"),
      Leaner: require("../../assets/fonts/Inter_18pt-Light.ttf"),
    }).then(() => setFontsLoaded(true));
  }, []);

  /* ⭐ Load ratings */
  useEffect(() => {
    const loadRatings = async () => {
      const newRatings: { [key: number]: number } = {};
      for (const song of songs) {
        const saved = await AsyncStorage.getItem(`rating-${song.id}`);
        if (saved) newRatings[song.id] = Number(saved);
      }
      setRatings(newRatings);
    };
    loadRatings();
  }, []);

  /* 🕒 Recently viewed */
  useEffect(() => {
    const loadRecentlyViewed = async () => {
      const stored = await AsyncStorage.getItem("recentlyViewed");
      const ids: number[] = stored ? JSON.parse(stored) : [];
      const recent = ids
        .map((id) => songs.find((s) => s.id === id))
        .filter(Boolean) as typeof songs;
      setRecentSongs(recent);
    };
    loadRecentlyViewed();
  }, []);

  if (!fontsLoaded) return null;

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.genre.toLowerCase().includes(search.toLowerCase())
  );

  const renderSongs = ({ item }: any) => {
    const rating = ratings[item.id] || 0;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push(`./songGallery/song/${item.id}`)}
      >
        <Image source={item.image} style={styles.songImage} />

        <View style={styles.textContainer}>
          <Text style={styles.songTitle} numberOfLines={1}>
            {item.title}
          </Text>

          <Text style={styles.artist} numberOfLines={1}>
            {item.artist}
          </Text>

          <View style={{ flexDirection: "row", marginTop: 4 }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name={star <= rating ? "star" : "star-outline"}
                size={16}
                color={COLORS.rose}
                style={{ marginRight: 2 }}
              />
            ))}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      <Text style={styles.header}>Song Library</Text>

      {/* 🔍 Search */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search songs..."
          placeholderTextColor={COLORS.textMuted}
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* 🕒 Recently Viewed */}
      {recentSongs.length > 0 && (
        <View style={{ marginBottom: 25 }}>
          <Text style={styles.sectionTitle}>Recently Viewed</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recentSongs.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => router.push(`./songGallery/song/${item.id}`)}
                style={{ marginRight: 15 }}
              >
                <Image source={item.image} style={styles.recentImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* 🎵 Songs Grid */}
      <FlatList
        data={filteredSongs}
        renderItem={renderSongs}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }}
        columnWrapperStyle={{ justifyContent: "center" }}
      />
    </ScrollView>
  );
}

/* 🎨 Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.ivory,
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  header: {
    fontSize: 36,
    fontFamily: "Amatic",
    textAlign: "center",
    marginBottom: 20,
    color: COLORS.textDark,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: "Amatic",
    color: COLORS.textDark,
    marginBottom: 10,
  },
  searchContainer: {
    borderRadius: 20,
    paddingHorizontal: 16,
    backgroundColor: COLORS.lightSage,
    marginBottom: 25,
  },
  searchInput: {
    fontSize: 16,
    fontFamily: "Leaner",
    paddingVertical: 12,
    color: COLORS.textDark,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT + 80,
    margin: 30,
    borderRadius: 24,
    backgroundColor: COLORS.blush,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  songImage: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  textContainer: {
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  songTitle: {
    fontSize: 18,
    fontFamily: "Amatic",
    color: COLORS.textDark,
  },
  artist: {
    fontSize: 13,
    fontFamily: "Leaner",
    color: COLORS.textMuted,
    marginTop: 2,
  },
  recentImage: {
    width: 120,
    height: 180,
    borderRadius: 16,
  },
});
