import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import JobChip from "../../components/Common/JobChip";
import { JobType } from "@/types/job";

export default function JobsDetail() {
  const [jobDetail, setJobDetail] = useState<JobType>();
  const { JobId } = useLocalSearchParams();
  const navigation = useNavigation();

  const getJobDetailByID = async () => {
    const docRef = doc(db, "Jobs", JobId as string);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const list = docSnap.data() as JobType;
      setJobDetail(list);
    }
  };

  const handleLinkPress = (url?:string) => {
    if (url) {
      Linking.openURL(url);
    }else{
      Alert.alert("No Link Found");
    }
  };

  useEffect(() => {
    getJobDetailByID();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Job Details",
    });
  });

  return (
    <ScrollView>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          gap: 5,
          backgroundColor: "#fff",
          borderRadius: 10,
          margin: 15,
        }}
      >
        <Image
          source={{
            uri:
              jobDetail?.Logo ||
              "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg",
          }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 10,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            fontFamily: "poppins-bold",
          }}
        >
          {jobDetail?.Role}
        </Text>
        <Text
          style={{
            color: "#7b7b7b",
            fontSize: 14,
            fontWeight: "500",
          }}
        >
          {jobDetail?.Company}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 30,
            marginTop: 10,
            alignItems: "center",
          }}
        >
          <JobChip data={jobDetail?.Location || "Unknown"} />
          <JobChip data={jobDetail?.Type || "Fulltime"} />
          <JobChip data={jobDetail?.JobPublisher || "Website"} />
        </View>
      </View>
      <Text
        style={{
          backgroundColor: "#fff",
          padding: 10,
          marginHorizontal: 15,
          borderRadius: 10,
          fontSize: 16,
          fontWeight: "500",
        }}
      >
        About
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          gap: 5,
          backgroundColor: "#fff",
          borderRadius: 10,
          margin: 15,
        }}
      >
        <Text>{jobDetail?.About}</Text>
      </View>
      <TouchableOpacity
        onPress={() => handleLinkPress(jobDetail?.Link)}
        style={{
          borderRadius: 10,
          marginHorizontal: 15,
          backgroundColor: "#0DB2FB",
          padding: 10,
          marginBottom: 30,
        }}
      >
        <Text
          style={{
            fontWeight: "600",
            color: "#fff",
            fontSize: 16,
            textAlign: "center",
          }}
        >
          Apply for Job
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
