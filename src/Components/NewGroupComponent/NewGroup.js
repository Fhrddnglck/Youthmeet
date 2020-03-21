import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    StatusBar,
    Image,
    TextInput,
    Picker,
    ActivityIndicator,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const url = 'https://raw.githubusercontent.com/anilozmen/TR-iller-universiteler-JSON/master/province-universities.json'
let Universitys = []
class NewGroup extends React.Component {
    state = {
        universitys: [],
        isLoading: true,
        selectedUniversity : '',
        selectedType : '',
    }
    getUniversitys = async () => {
        await fetch(url).then((res) => {
            return res.json()
        }).then(data => {
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].universities.length; j++) {
                    this.state.universitys.push(data[i].universities[j].name)
                }
            }
            this.setState({
                isLoading: false
            })
            //console.log(data[0].universities[2].name)
        })
    }
    componentDidMount() {
        this.getUniversitys()
    }
    _unitList = () => { //TODO REMOVE EMPTY ELEMENT IN ARRAY
        return (this.state.universitys.map((x, i) => { //TODO YEARS LIST
            return (<Picker.Item key={i} value={x} label={x} />)
        }))
    }
    render() {
        if (this.state.isLoading) {
            return (
                <ImageBackground source={require('../../Commons/BACKGROUND.png')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1 }}>
                    <StatusBar
                        backgroundColor='#222223'
                        hidden={false}
                    />
                    <ActivityIndicator />
                </ImageBackground>
            )
        }
        return (
            <ImageBackground source={require('../../Commons/BACKGROUND.png')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1 }}>
                <StatusBar
                    backgroundColor='#222223'
                    hidden={false}
                />
                <View style={{ flexDirection: 'row', flex: 0.3 }}>
                    <Text style={{ fontSize: 36, fontWeight: 'bold', marginTop: 'auto', color: 'white' }}>New Group</Text>
                    <Image
                        style={{ borderRadius: 180, width: 189, height: 189, backgroundColor: 'white' }}
                    />
                </View>
                <View style={{ marginTop: 16, alignItems: 'center', justifyContent: 'space-between', flex: 0.4 }}>
                    <TextInput
                        selectionColor='red'
                        style={{ backgroundColor: 'white', borderRadius: 180, width: '64%', paddingLeft: 25 }}
                        placeholder='Group Name'
                    />
                    <View style={{backgroundColor:'white',width:'50%',alignItems:'center',borderRadius:180}}>
                    <Picker

                        style={{ height: 50, width: '50%', backgroundColor: 'white' }}
                    >
                        <Picker.Item label="Okul" value="okul" />
                        <Picker.Item label="Etklinlik" value="etkinlik" />
                        <Picker.Item label="Gezi" value="gezi" />
                        <Picker.Item label="Arkadaşlık" value="arkadaslik" />
                    </Picker>
                    </View>
                    <View style={{backgroundColor:'white',width:'80%',alignItems:'center',borderRadius:180}}>
                    <Picker
                        style={{ height: 50, width: '85%', backgroundColor: 'white' }}
                    >
                        {this._unitList()}
                    </Picker>
                    </View>
                </View>
                <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <TouchableOpacity
                        style={{ marginBottom: 36, backgroundColor: '#E53055', borderRadius: 30, width: '50%', justifyContent: 'center', alignItems: 'center', height: 49 }}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25, padding: 25 }}>CREATE</Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default NewGroup

