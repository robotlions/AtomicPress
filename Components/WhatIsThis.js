import React from "react";
import {
  Text,
  ScrollView,
  Linking,
} from "react-native";
import {styles} from "../styles";



export default function WhatIsThis() {


    return(
        
<ScrollView>
    <Text style={styles.whatIsThisTitle}>What Is This?</Text>
    <Text style={styles.whatIsThisText}>Atomic Press is a free app for generating, editing and storing recipes for the AeroPress
        coffee maker.
    {"\n"}
    </Text>
    <Text style={styles.whatIsThisText}>These recipes are generated from randomized variables, so sometimes the results will be absolutely bonkers.
      Feel free to edit the recipes or to reroll from scratch. Have fun!
    </Text>

    <Text style={styles.whatIsThisSubhead}>{"\n"}Making Sense of the Recipes</Text>
    <Text style={styles.whatIsThisHeadline}>Ratio</Text>
    <Text style={styles.whatIsThisText}>   {"\u2b24"} Grams of coffee to milliliters of water.</Text>
    <Text style={styles.whatIsThisText}>   {"\u2b24"} <Text style={styles.italic}>Dilute to share: </Text>After brewing, add water to make multiple cups.</Text>
    <Text style={styles.whatIsThisText}>   {"\u2b24"} <Text style={styles.italic}>Dilute for Americano: </Text>After brewing, add water to make single cup of desired strength.</Text>
    <Text style={styles.whatIsThisText}>   {"\u2b24"} <Text style={styles.italic}>Drink as espresso: </Text>Drink the resulting brew straight, not diluted.
    {"\n"}
    </Text>

    <Text style={styles.whatIsThisHeadline}>Grind Size/Brew Time </Text>
    <Text style={styles.whatIsThisText}>   {"\u2b24"} <Text style={styles.italic}>Grind Size: </Text>Hoo boy, grind size is a big topic. Check out <Text style={{color: '#ea861a'}}
      onPress={() => Linking.openURL('https://www.homegrounds.co/coffee-grind-chart/')}>
   this grind-size chart from Homegrounds
</Text></Text>

    <Text style={styles.whatIsThisText}>   {"\u2b24"} <Text style={styles.italic}>Brew Time: </Text>Generally, these brew times will work with the paired grind size,
    but play around with it.
    {"\n"}</Text>
    
    <Text style={styles.whatIsThisHeadline}>Agitation </Text>
    <Text style={styles.whatIsThisText}>   {"\u2b24"} <Text style={styles.italic}>Swirl: </Text><Text>Swirl entire AeroPress three or four times to ensure all grounds are immersed.</Text></Text>
    <Text style={styles.whatIsThisText}>   {"\u2b24"} <Text style={styles.italic}>Stir: </Text><Text>The AeroPress comes with a really nifty stirring paddle.</Text></Text>
    
    <Text style={styles.whatIsThisText}>   {"\u2b24"} <Text style={styles.italic}>Shake: </Text><Text>Shake, rattle and/or roll.</Text>
    {"\n"}
    </Text>
    <Text style={styles.whatIsThisHeadline}>Brew style</Text>
    <Text style={styles.whatIsThisText}>   {"\u2b24"} <Text style={styles.italic}>Upright:</Text> Filter-end pointing down into cup with plunger moving in downward motion.</Text>
    <Text style={styles.whatIsThisText}>   {"\u2b24"} <Text style={styles.italic}>Inverted:</Text> Filter-end pointing upward with AeroPress resting on plunger-end.
    {"\n"}
    </Text>
    <Text style={styles.whatIsThisHeadline}>About</Text>
    <Text style={styles.whatIsThisText}>v. 1.1.2</Text>

    <Text style={styles.whatIsThisText}>Based on the original AeroPress Recipe Dice concept by
    <Text style={{color: '#ea861a'}}
      onPress={() => Linking.openURL('http://jameshoffmann.co.uk')}>
  James Hoffmann
</Text>
    {"\n"}</Text>
    <Text style={styles.whatIsThisText}>Check out AeroPress at</Text>
    <Text style={{color: '#ea861a'}} onPress={()=>Linking.openURL("http://www.aeropress.com")}>aeropress.com
    {"\n"}</Text>
      <Text style={styles.whatIsThisText}>Copyright 2024 by 
      
      <Text style={{color: '#ea861a'}} onPress={()=>Linking.openURL("https://robotlions.com")}> Robot Lions
    {"\n"}</Text>Not in any way officially associated with AeroPress.</Text>
    </ScrollView>
    );
}