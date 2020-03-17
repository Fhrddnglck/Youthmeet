import React,{Component} from 'react'
import {View,StyleSheet,ImageBackground,StatusBar,Text,TextInput,TouchableOpacity} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import Fire from '../../../Fire';

class ForgotPass extends React.Component{
    state = {
        email : ''
    }
    ResetPassword = async() =>{
        await Fire.shared.sendResetPassword(this.state.email)
        this.props.navigation.navigate('Login')
    }
    render(){
        return(
            <ImageBackground source={require('../../Commons/BACKGROUND.png')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1 }}>
                <StatusBar
                    backgroundColor='#222223'
                    hidden={false}
                />
                <View style={{flex:1,alignItems:'center'}}>
                <View style={{backgroundColor:'white',width:'70%',height:'8%',flexDirection:'row',borderRadius:180,justifyContent:'space-around',marginTop:64}}>
                    <View style={{justifyContent:'center'}}>
                    <Icon
                    name = 'ios-mail'
                    size={36}
                    color = '#E53055'
                    />
                    </View>
                    <TextInput
                    onChangeText = {(val)=>this.setState({email:val})}
                    placeholder = 'Please entry your e-mail'
                    style={{width:'80%'}}
                    />
                </View>
                <TouchableOpacity
                onPress = {()=>this.ResetPassword()}
                style={{width:'50%',height:'8%',backgroundColor:'#E53055',alignItems:'center',justifyContent:'center',borderRadius:180,marginTop:36}}
                >
                    <Text style={{fontWeight:'bold',fontSize:16,color:'white',textAlign:'center',padding:5}}>RESET{'\n'}PASSWORD</Text>
                </TouchableOpacity>
                </View>
                </ImageBackground>
        )
    }
}



const styles = StyleSheet.create({

})

export default ForgotPass;