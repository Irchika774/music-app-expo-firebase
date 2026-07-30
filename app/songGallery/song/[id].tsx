import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  doc,
  getDoc,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
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
import { auth, db } from "../../../firebaseconfig";
import { useTheme } from "../../context/ThemeContext";

const { height } = Dimensions.get("window");

export default function SongDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { colors } = useTheme();

  const song = songs.find((m) => m.id.toString() === id);

  const [rating, setRating] = useState(0);

  const handlePlaySong = async () => {
    if (!song) return;

    const user = auth.currentUser;

    if (!user) {
      router.replace("/auth/login");
      return;
    }

    const songRef = doc(
      db,
      "users",
      user.uid,
      "watched",
      song.id.toString()
    );

    try {
      const songDoc = await getDoc(songRef);

      if (songDoc.exists()) {
        await updateDoc(songRef, {
          watchCount: increment(1),
          lastWatched: serverTimestamp(),
        });
      } else {
        await setDoc(songRef, {
          songId: song.id,
          title: song.title,
          artist: song.artist,
          genre: song.genre,
          watchCount: 1,
          lastWatched: serverTimestamp(),
        });
      }

      await Linking.openURL(song.youtubeUrl);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadRating = async () => {
      if (!song) return;

      const saved = await AsyncStorage.getItem(`rating-${song.id}`);

      if (saved) setRating(Number(saved));
    };

    loadRating();
  }, [song]);

  const handleRating = async (value: number) => {
    if (!song) return;

    setRating(value);

    await AsyncStorage.setItem(
      `rating-${song.id}`,
      value.toString()
    );
  };

  useEffect(() => {
    const addRecent = async () => {
      if (!song) return;

      const stored =
        await AsyncStorage.getItem("recentlyViewed");

      let recent: number[] = stored
        ? JSON.parse(stored)
        : [];

      recent = recent.filter((x) => x !== song.id);

      recent.unshift(song.id);

      if (recent.length > 10) recent.pop();

      await AsyncStorage.setItem(
        "recentlyViewed",
        JSON.stringify(recent)
      );
    };

    addRecent();
  }, [song]);

  if (!song) {
    return (
      <View style={styles.notFound}>
        <Text>Song not found</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
      contentContainerStyle={{
        paddingBottom: 100,
      }}
    >
      <TouchableOpacity
        style={[
          styles.backButton,
          {
            backgroundColor: colors.footer,
          },
        ]}
        onPress={() => router.back()}
      >
        <Ionicons
          name="arrow-back"
          size={22}
          color={colors.text}
        />
      </TouchableOpacity>

      <Image
        source={song.image}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}
        >
          {song.title}
        </Text>

        <Text
          style={[
            styles.description,
            {
              color: colors.muted,
            },
          ]}
        >
          {song.description}
        </Text>

        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: colors.footer,
            },
          ]}
        >
          <InfoRow
            label="Artist"
            value={song.artist}
          />

          <InfoRow
            label="Genre"
            value={song.genre}
          />

          <InfoRow
            label="Release"
            value={song.releaseDate}
          />

          <TouchableOpacity
            onPress={handlePlaySong}
            style={styles.playButton}
          >
            <Ionicons
              name="play"
              size={18}
              color={colors.text}
            />

            <Text
              style={[
                styles.playText,
                {
                  color: colors.active,
                },
              ]}
            >
              Play on YouTube
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.ratingSection}>
          <Text
            style={[
              styles.rateTitle,
              {
                color: colors.text,
              },
            ]}
          >
            Rate this song
          </Text>

          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() =>
                  handleRating(star)
                }
              >
                <Ionicons
                  name={
                    star <= rating
                      ? "star"
                      : "star-outline"
                  }
                  size={32}
                  color={colors.active}
                  style={{
                    marginHorizontal: 6,
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const { colors } = useTheme();

  return (
    <View style={{ marginBottom: 10 }}>
      <Text
        style={[
          styles.label,
          {
            color: colors.muted,
          },
        ]}
      >
        {label}
      </Text>

      <Text
        style={[
          styles.value,
          {
            color: colors.text,
          },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backButton: {
    position: "absolute",
    top: 45,
    left: 20,
    zIndex: 2,
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
    marginBottom: 8,
  },

  description: {
    fontSize: 15,
    fontFamily: "Inter",
    marginBottom: 20,
    lineHeight: 22,
  },

  infoCard: {
    borderRadius: 18,
    padding: 16,
  },

  label: {
    fontSize: 13,
    fontFamily: "Inter",
  },

  value: {
    fontSize: 16,
    fontFamily: "Inter",
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
  },

  ratingSection: {
    marginTop: 35,
    alignItems: "center",
  },

  rateTitle: {
    fontFamily: "Amatic",
    fontSize: 26,
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