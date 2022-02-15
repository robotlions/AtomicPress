import React, { useState } from "react";
import {
  Alert,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {styles} from "../styles"

export default function ListRecipe(props) {
  const [modalListVisible, setModalListVisible] = useState(false);
  const [loadedName, setLoadedName] = useState(null);
  const [loadedRatio, setLoadedRatio] = useState(null);
  const [loadedGrindSize, setLoadedGrindSize] = useState(null);
  const [loadedAgitation, setLoadedAgitation] = useState(null);
  const [loadedTemperature, setLoadedTemperature] = useState(null);
  const [loadedBrewStyle, setLoadedBrewStyle] = useState(null);
  const [loadedIndex, setLoadedIndex] = useState(null);
  const [loadedNote, setLoadedNote] = useState(null);
  const [loadedFavorite, setLoadedFavorite] = useState(false);
  const [deleted, setDeleted] = useState(true);
  const [textWindowVisible, setTextWindowVisible] = useState(false);
  const [activeEdit, setActiveEdit] = useState(null);
  const [textEdit, setTextEdit] = useState(null);
  const [noteWindowVisible, setNoteWindowVisible] = useState(false);
  const [recipeExpanded, setRecipeExpanded] = useState(false);


  function alertDeleteRecipe() {
    let index = loadedIndex;
    let data = props.loadedRecipeArray;
    data.splice(index, 1);
    setModalListVisible(false),setLoadedRatio(""),setLoadedGrindSize(""),setLoadedAgitation(""),setLoadedTemperature(""),setLoadedBrewStyle(""),setLoadedNote("")
    setTimeout(async () => {
      await AsyncStorage.setItem("recipeList", JSON.stringify(data));
    }, 1500);
    
  }


  function handleChange(func, text){
      func(text);
  }

  function pressRecipe(title, type){
    setTextWindowVisible(!textWindowVisible)
    setActiveEdit(type)
    setTextEdit(title)
  }


  function closeWindow(){
    setTextWindowVisible(false)
  }

  function makeFavorite(){
    let index = loadedIndex;
    let data = props.loadedRecipeArray;
    let recipe = data[index]
    setLoadedFavorite(!loadedFavorite)
    recipe.favorite = true
    data.splice(index, 1, recipe);
    setDeleted(!deleted)
    setTimeout(async () => {
      await AsyncStorage.setItem("recipeList", JSON.stringify(data));
    }, 1500);
  }

  function saveEdit(){
    const loadedRecipe = {
      recipeName: loadedName,
      ratio: loadedRatio,
      grindSize: loadedGrindSize,
      agitation: loadedAgitation,
      temperature: loadedTemperature,
      brewStyle: loadedBrewStyle,
      note: loadedNote,
      favorite: loadedFavorite,
    }
    let index = loadedIndex;
    let data = props.loadedRecipeArray;
    data.splice(index, 1, loadedRecipe)
    setTimeout(() => {
          AsyncStorage.setItem("recipeList", JSON.stringify(data));
        }, 1500);

  }

  function deleteAlert(index){ 
      Alert.alert(
        "Delete-O-Matic",
        `Are you sure?`,
        [
          {
            text: "Delete Recipe",
            onPress: () => alertDeleteRecipe(index),
            style: "cancel",
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ],
        {
          cancelable: true,
        }
      );
  }
      

  const displayArray = props.loadedRecipeArray.map((value, index) => (
    recipeExpanded == true && loadedIndex == index ?
    
   
    
    <TouchableOpacity
      style={styles.listItem}
      key={index}
      animationType="slide"
      onPress={()=>setRecipeExpanded(!recipeExpanded)}
      onLongPress={() => {
        setModalListVisible(!modalListVisible),
          setNoteWindowVisible(false),
          setLoadedName(value.recipeName),
          setLoadedRatio(value.ratio),
          setLoadedGrindSize(value.grindSize),
          setLoadedAgitation(value.agitation),
          setLoadedTemperature(value.temperature),
          setLoadedBrewStyle(value.brewStyle),
          setLoadedNote(value.note),
          setLoadedFavorite(value.favorite),
          setLoadedIndex(index);
      }}
    >
      
      <Text style={styles.listHeadline}>{value.recipeName}</Text>{value.favorite == true ? 
      
      <Image
        style={styles.starLogo}
        source={require('../assets/images/favstar.png')}
      /> : null}
      <Text style={{lineHeight: 5}}> </Text>
        <Text style={styles.category}>Ratio: </Text>
        <Text style={styles.listingText}>{value.ratio}</Text>
        
        <Text style={styles.category}>Grind Size/Brew Time: </Text>
        <Text style={styles.listingText}>{value.grindSize}</Text>
        
        <Text style={styles.category}>Agitation: </Text>
        <Text style={styles.listingText}>{value.agitation}</Text>
        
        <Text style={styles.category}>Temperature: </Text>
        <Text style={styles.listingText}>{value.temperature}</Text>
        
        <Text style={styles.category}>Brew Style: </Text>
        <Text style={styles.listingText}>{value.brewStyle}</Text>
        
        <Text style={styles.category}>Note: </Text>
        <Text style={styles.listingText}>{value.note || "Press and hold to edit"}</Text>
        
      
      </TouchableOpacity>
    :
    
    <TouchableOpacity
    key={index}
    style={styles.smallListItem}
    onPress={()=>{setRecipeExpanded(true),setLoadedIndex(index)}}
    onLongPress={() => {
      setModalListVisible(!modalListVisible),
        setNoteWindowVisible(false),
        setLoadedName(value.recipeName),
        setLoadedRatio(value.ratio),
        setLoadedGrindSize(value.grindSize),
        setLoadedAgitation(value.agitation),
        setLoadedTemperature(value.temperature),
        setLoadedBrewStyle(value.brewStyle),
        setLoadedNote(value.note),
        setLoadedFavorite(value.favorite)
        setLoadedIndex(index)
    }}>
      <Text style={styles.smallListHeadline}>{value.recipeName}</Text>
      {value.favorite == true ?  <Image
      style={styles.starLogo}
        source={require('../assets/images/favstar.png')}
      /> : null}
      <Text style={styles.listingNote}>{value.note || ""}</Text>
      </TouchableOpacity>
  ));

  return (
    <ScrollView
      style={{marginTop: 10, marginBottom: 20}}
    >
      {displayArray}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalListVisible}
        onRequestClose={() => {
          setModalListVisible(!modalListVisible);
        }}
      >
        <ScrollView
          style={{backgroundColor: "rgba(52, 52, 52, 0.7)" }}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalHeadline}>Tap any field to edit</Text>
            <Text>{"\n"}</Text>
          <TouchableOpacity
            onPress={()=>pressRecipe(loadedName, "loadedName")}>
              <Text style={styles.headline}>Name:</Text>
              <Text style={styles.recipeText}>{loadedName}</Text>
            </TouchableOpacity>
            {activeEdit === "loadedName" && textWindowVisible == true ?
            <TextInput
            autoFocus={true}
            onEndEditing={()=>closeWindow()}
            style={styles.input}
            value={loadedName}
            onChangeText={(text)=>handleChange(setLoadedName, text)}/>
            :
            null}

            <TouchableOpacity
            onPress={()=>pressRecipe(loadedRatio, "loadedRatio")}>
              <Text style={styles.headline}>Ratio:</Text>
              <Text style={styles.recipeText}>{loadedRatio}</Text>
            </TouchableOpacity>
            {activeEdit === "loadedRatio" && textWindowVisible == true ?
            <TextInput
            autoFocus={true}
            onEndEditing={()=>closeWindow()}
            style={styles.input}
            value={loadedRatio}
            onChangeText={(text)=>handleChange(setLoadedRatio, text)}/>
            :
            null}

            <TouchableOpacity
            onPress={()=>pressRecipe(loadedGrindSize, "loadedGrindSize")}>
            <Text style={styles.headline}>Grind Size/Brew Time:</Text>
            <Text style={styles.recipeText}>{loadedGrindSize}</Text>
            </TouchableOpacity>
            {activeEdit === "loadedGrindSize" && textWindowVisible == true ?<TextInput 
            autoFocus={true}
            style={styles.input}
            value={loadedGrindSize}
            onChangeText={(text)=>handleChange(setLoadedGrindSize, text)}
            onEndEditing={()=>closeWindow()}/>
            :
            null}

            <TouchableOpacity
            onPress={()=>pressRecipe(loadedAgitation, "loadedAgitation")}>
            <Text style={styles.headline}>Agitation: </Text>
            <Text style={styles.recipeText}>{loadedAgitation}</Text>
            </TouchableOpacity>
            {activeEdit === "loadedAgitation" && textWindowVisible == true ?<TextInput 
            autoFocus={true}
            style={styles.input}
            value={loadedAgitation}
            onChangeText={(text)=>handleChange(setLoadedAgitation, text)}
            onEndEditing={()=>closeWindow()}/>
            :
            null}

            <TouchableOpacity
            onPress={()=>pressRecipe(loadedTemperature, "loadedTemperature")}>
            <Text style={styles.headline}>Temperature: </Text>
            <Text style={styles.recipeText}>{loadedTemperature}</Text>
            </TouchableOpacity>
            {activeEdit === "loadedTemperature" && textWindowVisible == true ?<TextInput 
            autoFocus={true}
            style={styles.input}
            value={loadedTemperature}
            onChangeText={(text)=>handleChange(setLoadedTemperature, text)}
            onEndEditing={()=>closeWindow()}/>
            :
            null}

            <TouchableOpacity
            onPress={()=>pressRecipe(loadedBrewStyle, "loadedBrewStyle")}>
            <Text style={styles.headline}>Brew Style:</Text>
            <Text style={styles.recipeText}>{loadedBrewStyle}</Text>
            </TouchableOpacity>
            {activeEdit === "loadedBrewStyle" && textWindowVisible == true ?<TextInput 
            style={styles.input}
            value={loadedBrewStyle}
            onChangeText={(text)=>handleChange(setLoadedBrewStyle, text)}
            onEndEditing={()=>closeWindow()}/>
            :
            null}

            <TouchableOpacity
            onPress={()=>pressRecipe(loadedNote, "loadedNote")}>
                <Text style={styles.headline}>Note: </Text>
                <Text style={styles.recipeText}>{loadedNote || "Tap to Add Note"}</Text>
                </TouchableOpacity>
            {activeEdit === "loadedNote" && textWindowVisible == true ? (
              <TextInput
                style={styles.input}
                onChangeText={(text)=>handleChange(setLoadedNote, text)}
                placeholder="Add note"
                value={loadedNote}
                onEndEditing={()=>closeWindow()}
                autoFocus={true}
              ></TextInput>
            ) : null}
            <Text>
              <Text>{"\n"} </Text>
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                saveEdit(),
                setNoteWindowVisible(false),
                setTextWindowVisible(false),
                  setModalListVisible(!modalListVisible)
              }}
            >
              <Text style={styles.buttonText}>Done
              {"\n"}</Text>
            </TouchableOpacity>
            <Text>
            <TouchableOpacity
            style={styles.button}
            onPress={(index)=>makeFavorite(index)}><Text style={styles.buttonText}>{loadedFavorite == true ? <Text>Unfavorite</Text> : <Text>Add to Favorites</Text>}</Text>
            </TouchableOpacity>
            <Text>        </Text>
            <TouchableOpacity
            style={styles.button}
            onPress={(index)=>deleteAlert(index)}><Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            </Text>
          </View>
        </ScrollView>
      </Modal>
    </ScrollView>
  );
}
