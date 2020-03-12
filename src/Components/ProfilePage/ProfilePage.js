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
import Fire from '../../../Fire';
import Icon from 'react-native-vector-icons/Ionicons'

class ProfilePage extends React.Component {
    LogOut = ()=>{
        Fire.shared.signOut()
        this.props.navigation.navigate('First')
    }
    render() {
        const navigation = this.props.navigation;
        console.log(Fire.shared.profilePicture)
        return (

            <ImageBackground source={require('../../Commons/BACKGROUND.png')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1 }}>
                <StatusBar
                    backgroundColor='#222223'
                    hidden={false}
                />
                <View style={{flexDirection:'row'}}>
                    <View>
                        <Image
                        source = {{uri:Fire.shared.profilePicture}}
                        style={{borderRadius:180,backgroundColor:'white',width:120,height:120,marginLeft:8,marginTop:8}}
                        />
                    </View>
                    <View style={{alignItems:'center',marginTop:16}}>
        <Text style={{fontWeight:'bold',fontSize:25,color:'white'}}>{Fire.shared.userName}</Text>
        <Text style={{color:'white',marginTop:16,marginLeft:8}}>{Fire.shared.email}</Text>
                    </View>
                </View>
                <View style={{alignItems:'center',marginTop:16}}>
                    <TouchableOpacity
                    style={{flexDirection:'row',alignItems:'center',backgroundColor:'#7646FF',width:'50%',borderRadius:5,height:50,justifyContent:'space-evenly'}}
                    >
                        <Icon
                        name='md-settings'
                        size={36}
                        color = 'white'
                        />
                        <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>SETTINGS</Text>
                    </TouchableOpacity>
                </View>
                <View style={{alignItems:'center',marginTop:'auto'}}>
                    <TouchableOpacity
                    onPress = {()=>this.LogOut()}
                    >
                    <Icon
                    name = 'ios-log-out'
                    size = {64}
                    color = 'white'
                    />
                    <Text style={{color:'white',fontWeight:'bold'}}>LOG OUT</Text>
                    </TouchableOpacity>
                </View>

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


export default ProfilePage;