import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import bodyStyles from './bodyStyle';

function Body() {
  const [greet, setGreet] = useState('');

  const handleChange = () => {
    console.warn("Hello Aniket Nice Progress");
    setGreet('Hello Shraddha Welcome to ISeeAI');
  }
  return (
    <>
      <View style={bodyStyles.imgBox}>
        <Text style={bodyStyles.welcome}>Welcome to ISeeAI</Text>
        <TouchableOpacity onPress={handleChange}>
            <Image style={[bodyStyles.img]} source={require('../Images/microphone.png')} />
        </TouchableOpacity>
        <Text style={bodyStyles.textBox}>{greet}</Text>
      </View>
    </>
  )
}

export default Body
