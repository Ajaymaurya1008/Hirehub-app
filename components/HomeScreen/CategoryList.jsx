import { View, Text, Image } from "react-native";
import React from "react";
import {
  TouchableOpacity,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";


export default function CategoryList({ item, index }) {

  const router = useRouter();

  return (
    <GestureHandlerRootView key={index}>
      <TouchableOpacity onPress={() => router.push(`/JobList/${item.name}`)}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 15,
          }}
        >
          <View
            style={{
              backgroundColor: Colors.BG,
              borderRadius: 99,
              padding: 15,
            }}
          >
            <Image
              key={index}
              style={{
                height: 40,
                width: 40,
              }}
              source={{ uri: item.icon }}
            />
          </View>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "poppins-med",
              marginTop: 5,
            }}
          >
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
}