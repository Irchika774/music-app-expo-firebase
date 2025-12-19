import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

interface Props {
  songId: number;
}

/* 🌸 Shared Theme Accent */
const THEMES = {
  light: {
    star: "#F2C1CC", // Peónia rose
  },
  dark: {
    star: "#fbbf24", // golden star
  },
};

export default function RatingStars({ songId }: Props) {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? "dark" : "light";
  const colors = THEMES[theme];

  const [rating, setRating] = useState(0);

  /* ⭐ Load saved rating */
  useEffect(() => {
    const loadRating = async () => {
      try {
        const saved = await AsyncStorage.getItem(`rating-${songId}`);
        if (saved) setRating(Number(saved));
      } catch (error) {
        console.log("Error loading rating:", error);
      }
    };
    loadRating();
  }, [songId]);

  /* 💾 Save rating */
  const handleRating = async (value: number) => {
    setRating(value);
    await AsyncStorage.setItem(`rating-${songId}`, value.toString());
  };

  return (
    <View style={{ flexDirection: "row", marginTop: 15 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => handleRating(star)}>
          <Ionicons
            name={star <= rating ? "star" : "star-outline"}
            size={32}
            color={colors.star}
            style={{ marginRight: 6 }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}
