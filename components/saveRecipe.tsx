import React, { useEffect, useState } from "react";
import { Button, FlatList, Text, View } from "react-native";
import RNFS from "react-native-fs";

const FILE_PATH = `${RNFS.DocumentDirectoryPath}/flatListData.json`;

const saveFlatListData = async (data) => {
  try {
    const jsonData = JSON.stringify(data);
    await RNFS.writeFile(FILE_PATH, jsonData, "utf8");
    console.log("FlatList data saved successfully");
  } catch (error) {
    console.error("Error saving FlatList data:", error);
  }
};

const loadFlatListData = async () => {
  try {
    const jsonData = await RNFS.readFile(FILE_PATH, "utf8");
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error loading FlatList data:", error);
    return [];
  }
};

const MyComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const loadedData = await loadFlatListData();
      setData(loadedData);
    };
    loadData();
  }, []);

  const handleSaveData = () => {
    saveFlatListData(data);
  };

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Save Data" onPress={handleSaveData} />
    </View>
  );
};
