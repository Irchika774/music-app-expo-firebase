import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { auth, db, storage } from "../../firebaseconfig";
import { useTheme } from "../context/ThemeContext";

export default function Profile() {
  const router = useRouter();
  const { colors } = useTheme();

  const [name, setName] = useState("User");
  const [email, setEmail] = useState("");
  const [watchedCount, setWatchedCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    let unsubscribeWatched: (() => void) | undefined;
    let unsubscribeFavorites: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/auth/login");
        return;
      }

      setEmail(user.email || "");

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
          const data = userDoc.data();

          setName(data.name || "User");
          setProfileImage(data.profileImage || "");
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      }

      const watchedRef = collection(
        db,
        "users",
        user.uid,
        "watched"
      );

      unsubscribeWatched = onSnapshot(watchedRef, (snapshot) => {
        setWatchedCount(snapshot.size);
      });

      const favoritesRef = collection(
        db,
        "users",
        user.uid,
        "favorites"
      );

      unsubscribeFavorites = onSnapshot(favoritesRef, (snapshot) => {
        setFavoriteCount(snapshot.size);
      });
    });

    return () => {
      unsubscribeAuth();

      if (unsubscribeWatched) {
        unsubscribeWatched();
      }

      if (unsubscribeFavorites) {
        unsubscribeFavorites();
      }
    };
  }, []);

  const pickProfileImage = async () => {
    const user = auth.currentUser;

    if (!user) return;

    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission denied.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (result.canceled) return;

    const uri = result.assets[0].uri;

    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, `profiles/${user.uid}.jpg`);

    await uploadBytes(storageRef, blob);

    const downloadURL = await getDownloadURL(storageRef);

    await updateDoc(doc(db, "users", user.uid), {
      profileImage: downloadURL,
    });

    setProfileImage(downloadURL);
  };

  const handleLogout = async () => {
    await auth.signOut();
    router.replace("/auth/login");
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
      <TouchableOpacity
        delayLongPress={250}
        onLongPress={pickProfileImage}
      >
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require("../../assets/images/profile.jpg")
          }
          style={styles.avatar}
        />
      </TouchableOpacity>

      <Text
        style={[
          styles.name,
          {
            color: colors.text,
          },
        ]}
      >
        {name}
      </Text>

      <Text
        style={[
          styles.email,
          {
            color: colors.muted,
          },
        ]}
      >
        {email}
      </Text>

      <View
        style={[
          styles.infoBox,
          {
            backgroundColor: colors.card,
          },
        ]}
      >
        <Ionicons
          name="film"
          size={20}
          color={colors.primary}
        />

        <Text
          style={[
            styles.infoText,
            {
              color: colors.text,
            },
          ]}
        >
          Total Watched: {watchedCount}
        </Text>
      </View>

      <View
        style={[
          styles.infoBox,
          {
            backgroundColor: colors.card,
          },
        ]}
      >
        <Ionicons
          name="heart"
          size={20}
          color={colors.danger}
        />

        <Text
          style={[
            styles.infoText,
            {
              color: colors.text,
            },
          ]}
        >
          Favorites: {favoriteCount}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: colors.button,
          },
        ]}
        onPress={() => router.replace("/songGallery")}
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

      <TouchableOpacity
        onPress={handleLogout}
        style={{ marginTop: 20 }}
      >
        <Text
          style={{
            color: colors.danger,
            fontWeight: "600",
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 80,
    paddingBottom: 120,
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