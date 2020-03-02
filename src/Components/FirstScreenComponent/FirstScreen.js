import React from 'react'
import {
    View,
    Image,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    StatusBar
} from 'react-native'

class FirstScreen extends React.Component {

    render() {
        const navigation = this.props.navigation;
        return (
            <ImageBackground source={require('../../Commons/BACKGROUND.png')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1 }}>
                <StatusBar
                    backgroundColor='#222223'
                    hidden={false}
                />
                <View style={{ flex: 0.4 }}>

                </View>
                <View style={styles.AppName}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../Commons/Header.png')} resizeMode='contain' style={{ width: '70%', height: '70%' }} />
                    </View>
                    <View style={{ marginLeft: 25 }}>
                        <Text style={{ fontWeight: '100', color: '#fff' }}>Join our community{'\n'}and{'\n'}meet new university friends.</Text>
                    </View>
                </View>
                <View style={styles.Buttons}>
                    <TouchableOpacity
                    onPress={()=>navigation.navigate('Login')}
                    >
                        <View style={[styles.ButtonDesign,{backgroundColor:'#E53055'}]}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 30 }}>LOGIN</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress = {()=>navigation.navigate('Register')}
                    >
                        <View style={[styles.ButtonDesign,{backgroundColor:'#fff'}]}>
                            <Text style={{ color: '#E53055', fontWeight: 'bold', fontSize: 30 }}>REGISTER</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </ImageBackground>

        )
    }

}
const styles = StyleSheet.create({
    AppName: {
        flex: 0.5,
    },
    Buttons: {
        flex: 0.4,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    ButtonDesign: {
        borderRadius: 180,
        borderTopLeftRadius: 0,
        height: 80,
        width: 250,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default FirstScreen;