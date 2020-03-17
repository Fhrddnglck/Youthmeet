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
import AsyncStorage from '@react-native-community/async-storage'
import Fire from '../../../Fire';



class LoginScreen extends React.Component {

    state = {
        mail : '',
        password : '',
        rememberMe : false
    }
    componentDidMount(){
        this.getData()
    }
    storeData = async () => {
        try {
            if(this.state.rememberMe){
                console.log('stroreliyom')
                await AsyncStorage.setItem('storage_Key', this.state.mail)
                await AsyncStorage.setItem('rememberMe',JSON.stringify(this.state.rememberMe))
            }
        } catch (e) {
          // saving error
        }
      }
      getData = async () => {
          console.log('sss')
        try {
          const value = await AsyncStorage.getItem('storage_Key')
          const isRemember = await AsyncStorage.getItem('rememberMe')
          if(value !== null && isRemember==='true') {
              console.log('giriyom')
            // value previously stored
            this.setState({mail:value})
          }
        } catch(e) {
          // error reading value
        }
      }
     signUser = async() =>{
        console.log(this.state.mail,this.state.password)
        this.storeData()
        await Fire.shared.loginUser(this.state.mail,this.state.password)
         console.log(Fire.shared.isVerified())
         if(Fire.shared.isVerified()){
             this.props.navigation.navigate('MainPage')
         }
         else {
             alert('NOT VERIFIED')
        }
    }
    navigateMainPage = ()=>{
        this.props.navigation.navigate('MainPage')
    }
    
    render() {
       
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
                        style={styles.TextInputs}
                        defaultValue = {this.state.mail}
                        placeholder='john@gmail.com'
                        placeholderTextColor='black'
                    />
                    <TextInput
                    onChangeText = {(value)=>this.setState({password:value})}
                        style={styles.TextInputs}
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
                        trackColor = 'yellow'
                        onValueChange = {()=>this.setState({rememberMe:!this.state.rememberMe})}
                        value = {this.state.rememberMe}
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
                    <TouchableOpacity
                    onPress = {()=>this.props.navigation.navigate('ForgotPass')}
                    >
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
    },
    TextInputs : {
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
    }
})


export default LoginScreen;