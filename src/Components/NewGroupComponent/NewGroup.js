import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    StatusBar,
} from 'react-native'

class NewGroup extends React.Component{
    render(){
        return(
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
    container : {
        flex:1
    }
})

export default NewGroup

