import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

import { songs } from "../../assets/data/songs";
import { auth, db } from "../../firebaseconfig";
import { useTheme } from "../context/ThemeContext";

export default function Favorites() {
  const router = useRouter();

  const { colors } = useTheme();

  const [favoriteSongs, setFavoriteSongs] =
    useState<typeof songs>([]);


  useEffect(() => {
    const user = auth.currentUser;

    if (!user) return;

    const favRef = collection(
      db,
      "users",
      user.uid,
      "favorites"
    );

    const unsubscribe = onSnapshot(
      favRef,
      (snapshot) => {
        const ids = snapshot.docs.map((doc) =>
          Number(doc.id)
        );

        const favSongs = songs.filter((song) =>
          ids.includes(song.id)
        );

        setFavoriteSongs(favSongs);
      }
    );

    return unsubscribe;
  }, []);


  // Remove from favorite list
  const removeFavorite = async (songId: number) => {
    const user = auth.currentUser;

    if (!user) return;

    const favoriteRef = doc(
      db,
      "users",
      user.uid,
      "favorites",
      songId.toString()
    );

    await deleteDoc(favoriteRef);
  };


  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >

      <Text
        style={[
          styles.title,
          {
            color: colors.text,
          },
        ]}
      >
        Your Favorites
      </Text>


      <FlatList
        data={favoriteSongs}
        keyExtractor={(item) =>
          item.id.toString()
        }
        numColumns={2}
        contentContainerStyle={{
          paddingBottom: 20,
        }}

        renderItem={({ item }) => (

          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.card,
              },
            ]}
          >

            <TouchableOpacity
              onPress={() =>
                router.push(
                  `/songGallery/song/${item.id}`
                )
              }
            >

              <Image
                source={item.image}
                style={styles.image}
              />


              <Text
                style={[
                  styles.songTitle,
                  {
                    color: colors.text,
                  },
                ]}
                numberOfLines={1}
              >
                {item.title}
              </Text>


              <Text
                style={[
                  styles.artist,
                  {
                    color: colors.muted,
                  },
                ]}
                numberOfLines={1}
              >
                {item.artist}
              </Text>

            </TouchableOpacity>



            {/* Favorite Button */}

            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() =>
                removeFavorite(item.id)
              }
            >

              <Ionicons
                name="heart"
                size={26}
                color={colors.danger}
              />

            </TouchableOpacity>


          </View>

        )}
      />



      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: colors.card,
          },
        ]}
        onPress={() =>
          router.push("/songGallery")
        }
      >

        <Text
          style={[
            styles.buttonText,
            {
              color: colors.text,
            },
          ]}
        >
          Go Back Home
        </Text>

      </TouchableOpacity>


    </View>
  );
}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },


  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
  },


  card: {
    width: 160,
    margin: 12,
    borderRadius: 16,
    paddingBottom: 10,
    overflow: "hidden",
  },


  image: {
    width: 160,
    height: 220,
    borderRadius: 16,
  },


  songTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
    paddingHorizontal: 6,
  },


  artist: {
    fontSize: 14,
    paddingHorizontal: 6,
    marginTop: 2,
  },


  favoriteButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 6,
  },


  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 14,
    marginTop: 10,
    marginBottom: 110,
  },


  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },

});