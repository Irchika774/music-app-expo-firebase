import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";

import { useTheme } from "../../context/ThemeContext";

interface Props {
  songId: number;
}

export default function RatingStars({ songId }: Props) {
  const { colors } = useTheme();

  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    const loadRating = async () => {
      try {
        const savedRating = await AsyncStorage.getItem(
          `rating-${songId}`
        );

        if (savedRating !== null) {
          setRating(Number(savedRating));
        }
      } catch (error) {
        console.log("Error loading rating:", error);
      }
    };

    loadRating();
  }, [songId]);

  const handleRating = async (value: number) => {
    try {
      setRating(value);

      await AsyncStorage.setItem(
        `rating-${songId}`,
        value.toString()
      );
    } catch (error) {
      console.log("Error saving rating:", error);
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 15,
      }}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => handleRating(star)}
        >
          <Ionicons
            name={
              star <= rating
                ? "star"
                : "star-outline"
            }
            size={32}
            color={colors.active}
            style={{ marginRight: 6 }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}