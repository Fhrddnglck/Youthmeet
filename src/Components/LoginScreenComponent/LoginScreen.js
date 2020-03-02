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



class LoginScreen extends React.Component {
    
    state = {
        mail : '',
        password : ''
    }
     signUser = () =>{
        console.log(this.state.mail,this.state.password)
        var user =  Fire.shared.loginUser(this.state.mail,this.state.password)
         if(user === []) return
         console.log(Fire.shared.isVerified())
         if(Fire.shared.isVerified()){
              console.log('girdim abi')
             this.props.navigation.navigate('MainPage')
         }
         else {
             console.log('SIGN FONKSITON HATASI')
             alert('NOT VERIFIED')
        }
    }
    navigateMainPage = ()=>{
        this.props.navigation.navigate('MainPage')
    }
    
    render() {
       
        const navigation = this.props.navigation;
        return (
            <ImageBackground source={require('../../Commons/BACKGROUND.png')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1 }}>
                <StatusBar
                    backgroundColor='#222223'
                    hidden={false}
                />
                <View style={{ flex: 0.3 }} />
                <View style={{ flex: 0.2 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 25, marginLeft: 36, color: 'white' }}>Login to {'\n'} your account</Text>
                </View>

                <View style={{ flex: 0.3, alignItems: 'center', flexDirection: 'column', justifyContent: 'space-around' }}>
                    <TextInput
                        onChangeText = {(value)=>this.setState({mail:value})}
                        style={{
                            backgroundColor: 'white',
                            borderRadius: 180,
                            width: '75%',
                            height: 70,
                            padding: 16,
                            fontSize: 15,
                            fontWeight: 'bold',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 11,
                            },
                            shadowOpacity: 0.57,
                            shadowRadius: 15.19,
                            elevation: 23
                        }}
                        placeholder='john@gmail.com'
                        placeholderTextColor='black'
                    />
                    <TextInput
                    onChangeText = {(value)=>this.setState({password:value})}
                        style={{
                            backgroundColor: 'white',
                            borderRadius: 180,
                            width: '75%',
                            height: 70,
                            padding: 16,
                            fontSize: 15,
                            fontWeight: 'bold',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 11,
                            },
                            shadowOpacity: 0.57,
                            shadowRadius: 15.19,
                            elevation: 23
                        }}
                        placeholder='********'
                        placeholderTextColor='black'
                        secureTextEntry={true}
                    />

                </View>


                <View style={{ flex: 0.1, flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
                    <Text style={{ color: 'white', marginLeft: 36 }}>Remember me</Text>
                    <Switch
                        thumbColor='white'
                        style={{ width: 50, height: 25}}
                    />
                </View>
                <View style={{ flex: 0.3, alignItems: 'center', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                    <TouchableOpacity
                    onPress = {()=>this.signUser()}
                    >
                        <View style={[styles.ButtonDesign, { backgroundColor: '#E53055' }]}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 30 }}>LOGIN</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ fontWeight: '100', color: 'white' }}>Forgot Password?</Text>

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


export default LoginScreen;