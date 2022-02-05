import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import Apploading from "expo-app-loading";
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import ListRecipe from "./Components/ListRecipe";
import WhatIsThis from "./Components/WhatIsThis";
import {
  agitationArray,
  brewStyleArray,
  grindSizeArray,
  temperatureArray,
  ratioArray,
} from "./Components/DataArrays";
import { firstName, lastName } from "./Components/TitleList50s";
import { styles } from "./styles";

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 3000);

export default function App() {
  const [recipeName, setRecipeName] = useState("default name");
  const [ratio, setRatio] = useState("default ratio");
  const [grindSize, setGrindSize] = useState("default grindSize");
  const [agitation, setAgitation] = useState("default agitation");
  const [temperature, setTemperature] = useState("default");
  const [brewStyle, setBrewStyle] = useState("default brew style");
  const [favorite, setFavorite] = useState(false);
  const [loadedRecipeArray, setLoadedRecipeArray] = useState([
    {
      ratio: "default ratio",
      grindSize: "default grind",
      agitation: "default agitation",
      temperature: "default temp",
      brewStyle: "default brew",
    },
  ]);
  const [onLoad, setOnLoad] = useState(false);
  const [modalNewRecipeVisible, setModalNewRecipeVisible] = useState(false);
  const [recipeAddedText, setRecipeAddedText] = useState("");
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [modalWhatIsThisVisible, setModalWhatIsThisVisible] = useState(false);

  const defaultRecipe = [
    {
      recipeName: "Default Diner Coffee",
      ratio: "12g Coffee / 250g Water",
      grindSize: "Coarse / 4min",
      agitation: "Stir Before Pressing",
      temperature: "95 C / 203 F",
      brewStyle: "Upright / No Bloom",
      note: "Tap to open. Hold to edit",
      favorite: false,
    },
  ];

  useEffect(() => {
    onLoad == false ? loadStartupRecipe() : null;
  });

  function doRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function loadStartupRecipe() {
    setOnLoad(true);
    getArray();
  }

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        
        "Raleway-Bold": {
          uri: require("./assets/fonts/Raleway-Bold.ttf"),
        },
        "Raleway-Medium": {
          uri: require("./assets/fonts/Raleway-Medium.ttf"),
        },
        "Raleway-Black": {
          uri: require("./assets/fonts/Raleway-Black.ttf"),
        },
        "Rammetto-Regular": {
          uri: require("./assets/fonts/RammettoOne-Regular.ttf"),
        },
      });
      setFontsLoaded(true);
    } catch (e) {}
  };

  async function getArray() {
    (await AsyncStorage.getItem("recipeList")) != null
      ? AsyncStorage.getItem("recipeList")
          .then((value) => JSON.parse(value))
          .then((value) => setLoadedRecipeArray(value))
      : AsyncStorage.setItem("recipeList", JSON.stringify(defaultRecipe));
    setLoadedRecipeArray(defaultRecipe);
  }

  function multiCap(phrase) {
    var splitWord = phrase.toLowerCase().split(" ");
    for (let i = 0; i < splitWord.length; i++) {
      splitWord[i] =
        splitWord[i].charAt(0).toUpperCase() + splitWord[i].substring(1);
    }
    return splitWord.join(" ");
  }


  function generateRandomName() {
    const adj = firstName[doRandom(0, firstName.length)];
    const aml = lastName[doRandom(0, lastName.length)];
    const genName = (adj.charAt(0).toUpperCase() + adj.slice(1) + " " + multiCap(aml));
    for(var i = 0; i < loadedRecipeArray.length; i++) {
      if (loadedRecipeArray[i].recipeName == genName) {
          generateRandomName();
          break;
      }
  }
   setRecipeName(genName);
  }

  function setAttribute(func, array) {
    const gen = array[doRandom(0, array.length)];
    func(gen);
  }


  async function saveRecipe() {
    const newRecipe = {
      recipeName: recipeName,
      ratio: ratio,
      grindSize: grindSize,
      agitation: agitation,
      temperature: temperature,
      brewStyle: brewStyle,
    };
    let loadedRecipe;
    (await AsyncStorage.getItem("recipeList")) == null
      ? AsyncStorage.setItem("recipeList", JSON.stringify(newRecipe))
      : AsyncStorage.getItem("recipeList")
          .then((value) => JSON.parse(value))
          .then((value) => (loadedRecipe = value))
          .then(() => loadedRecipe.push(newRecipe))
          .then(() =>
            AsyncStorage.setItem("recipeList", JSON.stringify(loadedRecipe))
          )
          .then(() => getArray());
    setTimeout(() => {
      setRecipeAddedText("Recipe Added!");
    }, 100);
    setTimeout(() => {
      setRecipeAddedText("");
    }, 2000);
  }


  if (fontsLoaded == true) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalNewRecipeVisible}
          onRequestClose={() => {
            setModalNewRecipeVisible(!modalNewRecipeVisible);
          }}
        >
          <ScrollView style={{ backgroundColor: "rgba(52, 52, 52, 0.7)" }}>
            <View style={styles.modalView}>
              <Text style={styles.headline}>Name: </Text>
              <Text style={styles.recipeText}>{recipeName}</Text>
              <Text style={styles.headline}>Ratio: </Text>
              <Text style={styles.recipeText}>{ratio}</Text>
              <Text style={styles.headline}>Grind Size/Brew Time: </Text>
              <Text style={styles.recipeText}>{grindSize}</Text>
              <Text style={styles.headline}>Agitation: </Text>
              <Text style={styles.recipeText}>{agitation}</Text>
              <Text style={styles.headline}>Temperature: </Text>
              <Text style={styles.recipeText}>{temperature}</Text>
              <Text style={styles.headline}>Brew Style: </Text>
              <Text style={styles.recipeText}>{brewStyle}</Text>
              <Text
                style={{ marginTop: 5, marginBottom: 5, fontWeight: "bold" }}
              >
                {recipeAddedText}
              </Text>
              <Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    generateRandomName(),
                      setAttribute(setRatio, ratioArray),
                      setAttribute(setGrindSize, grindSizeArray),
                      setAttribute(setAgitation, agitationArray),
                      setAttribute(setTemperature, temperatureArray),
                      setAttribute(setBrewStyle, brewStyleArray);
                  }}
                >
                  <Text style={styles.buttonText}>Try Again</Text>
                </TouchableOpacity>
                <Text>      </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => saveRecipe()}
                >
                  <Text style={styles.buttonText}>Save Recipe</Text>
                </TouchableOpacity>
                {"\n"}
              </Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalNewRecipeVisible(!modalNewRecipeVisible)}
              >
                <Text style={styles.buttonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Modal>

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalWhatIsThisVisible}
        onRequestClose={() => {
          setModalWhatIsThisVisible(!modalWhatIsThisVisible);
        }}
      >
        <View style={{ backgroundColor: "rgba(52, 52, 52, 0.7)" }}>
        <View style={styles.modalView}>
        <WhatIsThis/>
        <TouchableOpacity onPress={()=>setModalWhatIsThisVisible(false)}><Text style={styles.buttonText}>Close</Text></TouchableOpacity>
        </View>
        </View>
      </Modal>
        <Text style={styles.topTitle}>Atomic Press</Text>
        <Text style={styles.subHead}>
          Recipes for the AeroPress Coffee Maker
        </Text>

        <ListRecipe loadedRecipeArray={loadedRecipeArray} />
        <View style={styles.creditRow}>
          <TouchableOpacity onPress={()=>setModalWhatIsThisVisible(!modalWhatIsThisVisible)}>
            <Text style={styles.creditsCredits}>What is this?</Text>
          </TouchableOpacity>
          
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => {
              setModalNewRecipeVisible(!modalNewRecipeVisible),
                generateRandomName(),
                setAttribute(setRatio, ratioArray),
                setAttribute(setGrindSize, grindSizeArray),
                setAttribute(setAgitation, agitationArray),
                setAttribute(setTemperature, temperatureArray),
                setAttribute(setBrewStyle, brewStyleArray);
            }}
          >
            <Text style={styles.bottomButtonText}>New Brew</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <Apploading
        startAsync={loadFonts}
        onFinish={() => {
          setFontsLoaded(true);
        }}
        onError={console.warn}
      />
    );
  }
}
