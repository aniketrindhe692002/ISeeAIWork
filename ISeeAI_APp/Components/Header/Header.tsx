import React from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet
} from 'react-native';
import styles from './headerStyle';

function Header() {
    return (
        <View style={styles.bg}>
            <Image style={[styles.img]} source={require('../Images/voice.png')} />
            <Text style={styles.logoText}>iSeeAI</Text>
        </View>
    )
}

export default Header
