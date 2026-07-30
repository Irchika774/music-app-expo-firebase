import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import { useRouter } from "expo-router";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
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
import { auth, db } from "../../firebaseconfig";
import { useTheme } from "../context/ThemeContext";

const CARD_WIDTH = 120;   // ✅ slightly wider
const CARD_HEIGHT = 200;  // ✅ taller so image + text + stars fit

export default function Home() {
  const router = useRouter();
  const { colors } = useTheme();

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [recentSongs, setRecentSongs] = useState<typeof songs>([]);
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});

  /* Fonts */
  useEffect(() => {
    Font.loadAsync({
      Amatic: require("../../assets/fonts/AmaticSC-Regular.ttf"),
      Leaner: require("../../assets/fonts/Inter_18pt-Light.ttf"),
    }).then(() => setFontsLoaded(true));
  }, []);

  /* Ratings */
  useEffect(() => {
    const loadRatings = async () => {
      const data: { [key: number]: number } = {};
      for (const song of songs) {
        const saved = await AsyncStorage.getItem(`rating-${song.id}`);
        if (saved) {
          data[song.id] = Number(saved);
        }
      }
      setRatings(data);
    };
    loadRatings();
  }, []);

  /* Favorites */
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const favoritesRef = collection(db, "users", user.uid, "favorites");
    const unsubscribe = onSnapshot(favoritesRef, (snapshot) => {
      const favs: { [key: number]: boolean } = {};
      snapshot.forEach((doc) => {
        favs[Number(doc.id)] = true;
      });
      setFavorites(favs);
    });

    return unsubscribe;
  }, []);

  /* Recently viewed */
  useEffect(() => {
    const loadRecent = async () => {
      const stored = await AsyncStorage.getItem("recentlyViewed");
      const ids: number[] = stored ? JSON.parse(stored) : [];
      const recent = ids
        .map((id) => songs.find((song) => song.id === id))
        .filter(Boolean) as typeof songs;
      setRecentSongs(recent.slice(0, 5)); // ✅ limit to 5
    };
    loadRecent();
  }, []);

  /* Favorite toggle */
  const toggleFavorite = async (song: any) => {
    const user = auth.currentUser;
    if (!user) return;

    const favRef = doc(db, "users", user.uid, "favorites", song.id.toString());

    if (favorites[song.id]) {
      await deleteDoc(favRef);
    } else {
      await setDoc(favRef, {
        songId: song.id,
        title: song.title,
        artist: song.artist,
        genre: song.genre,
      });
    }
  };

  if (!fontsLoaded) return null;

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.genre.toLowerCase().includes(search.toLowerCase())
  );

  const renderSongs = ({ item }: any) => {
    const rating = ratings[item.id] || 0;
    const isFavorite = favorites[item.id] || false;

    return (
      <View style={[styles.card, { backgroundColor: colors.footer }]}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => router.push(`/songGallery/song/${item.id}`)}
        >
          <Image source={item.image} style={styles.songImage} />

          <View style={styles.textContainer}>
            <Text style={[styles.songTitle, { color: colors.text }]} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={[styles.artist, { color: colors.muted }]} numberOfLines={1}>
              {item.artist}
            </Text>

            <View style={{ flexDirection: "row", marginTop: 4 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={star <= rating ? "star" : "star-outline"}
                  size={14}
                  color={colors.active}
                />
              ))}
            </View>
          </View>
        </TouchableOpacity>

        {/* ❤️ Favorite Button */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item)}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={18}
            color={isFavorite ? colors.danger : colors.muted}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      <Text style={[styles.header, { color: colors.text }]}>Song Library</Text>

      <View style={[styles.searchContainer, { backgroundColor: colors.footer }]}>
        <TextInput
          placeholder="Search songs..."
          placeholderTextColor={colors.muted}
          style={[styles.searchInput, { color: colors.text }]}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {recentSongs.length > 0 && (
        <View style={{ alignItems: "center" }}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Recently Viewed
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ justifyContent: "center" }}
          >
            {recentSongs.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => router.push(`/songGallery/song/${item.id}`)}
              >
                <Image source={item.image} style={styles.recentImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <FlatList
        data={filteredSongs}
        renderItem={renderSongs}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3} // ✅ 3 cards per row
        columnWrapperStyle={{ justifyContent: "center" }} // ✅ centered row
        scrollEnabled={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 40,
  },
  header: {
    fontSize: 32,
    fontFamily: "Amatic",
    textAlign: "center",
    marginBottom: 20,
  },
  searchContainer: {
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 25,
  },
  searchInput: {
    fontSize: 16,
    paddingVertical: 12,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT + 80,
    margin: 10,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
    alignItems: "center",
    justifyContent: "center", // ✅ centers content vertically
  },
  songImage: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 12,
    resizeMode: "contain", // ✅ keeps image centered and fully visible
    alignSelf: "center",   // ✅ centers horizontally
  },
  textContainer: {
    padding: 8,
    alignItems: "center",
    minHeight: 70,
    justifyContent: "space-between",
  },
  songTitle: {
    fontSize: 15,
    fontFamily: "Amatic",
    textAlign: "center",
  },
  artist: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Amatic",
    marginBottom: 10,
    textAlign: "center",
  },
  favoriteButton: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 12,
    padding: 4,
  },
  recentImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginHorizontal: 5,
  },
});