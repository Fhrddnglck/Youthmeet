import React, { Component } from 'react'
import {
    View,
    Image,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    TextInput,
    Switch,
    KeyboardAvoidingView
} from 'react-native'

class AppTabsScreen extends React.Component {

    render() {
        const navigation = this.props.navigation;
        return (

            <ImageBackground source={require('../../Commons/BACKGROUND.png')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1 }}>
                <StatusBar
                    backgroundColor='#222223'
                    hidden={false}
                />

            </ImageBackground>

        )
    }

}


const styles = StyleSheet.create({
    ButtonDesign: {
        borderRadius: 180,
        borderTopLeftRadius: 0,
        height: 80,
        width: 250,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default AppTabsScreen;