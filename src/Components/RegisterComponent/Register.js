import React, { Component } from 'react'
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import RadioButton from '../CustomRadioButton/RadioButton'

import Icon from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-picker';

import Fire from '../../../Fire';
import {options} from './GenderOptions'

class Register extends React.Component {
    state = {
        photo: null, //or null
        mail: '',
        password: '',
        name: '',
        gender: '',
        photouri: ''
    }
    handleChoosePhoto = () => {
        const options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({ photouri: response.uri, photo: response });
            }
        })
    }
    currentChoose = (key) => {
        console.log(key)
        this.setState({
            gender: key
        })
    }
    createNewUser = async () => {
        const response = await fetch(this.state.photouri)
        const blob = await response.blob()
        console.log(blob)
        Fire.shared.createNewUser(this.state.mail, this.state.password, this.state.name, this.state.gender, blob)
    }
    controlNewUser = () => {
        if (this.state.mail.search('edu') != -1) {
            this.createNewUser()
            alert('REGISTER IS SUCCESS. PLEASE VERIFY E-MAIL ADDRESS')
            this.props.navigation.navigate('Login')
        } else alert('Please enter useable format informations')
    }

    render() {
        const { photo } = this.state;
        const navigation = this.props.navigation
        return (

            <ImageBackground source={require('../../Commons/BACKGROUND.png')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1 }}>
                <KeyboardAvoidingView behavior='height' style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text style={{ color: 'white', fontSize: 36, marginLeft: 24, marginTop: 'auto' }}>New User</Text>
                    <TouchableOpacity
                        onPress={() => this.handleChoosePhoto()}
                    >
                        <Icon
                            name='ios-camera'
                            color='white'
                            size={36}
                        />
                    </TouchableOpacity>
                    {photo && (
                        <Image
                            source={{ uri: photo.uri }}
                            style={{ width: 121, height: 121, marginTop: 8, borderRadius: 180 }}
                        />
                    )}
                </KeyboardAvoidingView>
                <KeyboardAvoidingView behavior='height' style={{ flex: 0.35, justifyContent: 'space-around',alignItems:'center'}}>
                    <View style={{backgroundColor:'white',flexDirection:'row',width:300,justifyContent:'space-between',borderRadius:180}}>
                        <Icon
                        style={{marginLeft:12,marginTop:5}}
                        name='ios-mail'
                        size = {36}
                        color = '#E53055'
                        />
                    <TextInput
                        onChangeText={value => this.setState({ mail: value })}
                        placeholder='E-mail'
                        style={{width: 250}}
                    />
                    </View>
                    <View style={{backgroundColor:'white',flexDirection:'row',width:300,justifyContent:'space-between',borderRadius:180,marginTop:36}}>
                    <Icon
                        style={{marginLeft:12,marginTop:5}}
                        name='ios-key'
                        size = {36}
                        color = '#E53055'
                        />
                    <TextInput
                        placeholder='Password'
                        onChangeText={value => this.setState({ password: value })}
                        secureTextEntry={true}
                        style={{width: 250}}
                    />
                    </View>
                    <View style={{backgroundColor:'white',flexDirection:'row',width:300,justifyContent:'space-between',borderRadius:180,marginTop:36}}>
                    <Icon
                        style={{marginLeft:12,marginTop:5}}
                        name='ios-person'
                        size = {36}
                        color = '#E53055'
                        />
                    <TextInput
                        placeholder='Name'
                        onChangeText={value => this.setState({ name: value })}
                        style={{width: 250}}
                    />
                    </View>
                </KeyboardAvoidingView>

                <KeyboardAvoidingView behavior='padding' style={{ flexDirection: 'column', flex: 0.2, alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25 }}>I'm a</Text>
                    <RadioButton options={options} currentChoose={(key) => this.currentChoose(key)} />
                </KeyboardAvoidingView>
                <KeyboardAvoidingView behavior='height' style={{ flex: 0.25, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                        onPress={() => this.controlNewUser()}
                        style={{ backgroundColor: '#E53055', width: 256,height:64,alignItems: 'center', borderRadius: 180, borderTopLeftRadius: 0,justifyContent:'center'}}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24 }}>REGISTER</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>

            </ImageBackground>

        )
    }

}


export default Register;

