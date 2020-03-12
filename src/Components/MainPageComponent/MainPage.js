import React, { Component } from 'react'
import {
    ImageBackground,
    StatusBar,
    TouchableOpacity,
    View,
    Text
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Fire from '../../../Fire';
class AppTabsScreen extends React.Component {

    componentDidMount(){
        Fire.shared.userNameg() //request userNameq
        Fire.shared.getImage() //request profilePictures
    }
    render() {
        return (

            <ImageBackground source={require('../../Commons/BACKGROUND.png')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1 }}>
                <StatusBar
                    backgroundColor='#222223'
                    hidden={false}
                />
                <View style={{marginLeft:'auto',marginTop:'auto',backgroundColor:'#E53055',borderTopLeftRadius:180}}>
                    <TouchableOpacity
                    style={{width:85,height:85,alignItems:'flex-end',justifyContent:'flex-end'}}
                    >
                    <Icon
                    style={{height:80,marginRight:8}}
                    name='ios-add'
                    size={100}
                    color = 'white'
                    />
                    </TouchableOpacity>
                </View>
            </ImageBackground>

        )
    }

}

export default AppTabsScreen;