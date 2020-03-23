import React from 'react'
import { View, Text, Button, ImageBackground, Image, Picker, StatusBar, ActivityIndicator } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import Fire from '../../../Fire';


class ChatPage extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: (navigation.state.params || {}).name || 'Chat!',
    });
    state = {
        messages: [],
        isLoading: true,
        selectedGroup: '',
        groups : [],
    }
    get user() {
        return {
            avatar: Fire.shared.profilePicture,
            name: Fire.shared.userName,
            _id: Fire.shared.uid,

        };
    }
    getGroups = async() =>{
        await Fire.shared.ListGroup()
        this.setState({
            groups : Fire.shared.groupsName
        })
        this.setState({isLoading : false})
    }
    _groupList = () => { //TODO REMOVE EMPTY ELEMENT IN ARRAY
        return this.state.groups.map((x, i) => { //TODO YEARS LIST
            return (<Picker.Item key={i} value={i} label={x} />)
        })  
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
            <ImageBackground
                source={require('../../Commons/BACKGROUND.png')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1 }}
            >
                <StatusBar
                    backgroundColor='#222223'
                    hidden={false}
                />
                <View style={{ width: '100%', height: 50, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', alignItems: 'center', backgroundColor: 'white', borderRadius: 180 }}>
                        <Picker
                            selectedValue={this.state.selectedGroup}
                            onValueChange={(val) => this.setState({ selectedGroup: val })}
                            style={{ height: 50, width: '80%', backgroundColor: 'white' }}
                        >
                            {this._groupList()}
                        </Picker>
                    </View>
                </View>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={Fire.shared.send}
                    user={this.user}
                    renderUsernameOnMessage={true}
                    showUserAvatar={true}
                />

            </ImageBackground>
        )
    }

    componentDidMount(){
        this.getGroups()
        Fire.shared.on(message =>
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            }))
        );
    }
    componentWillUnmount() {
        Fire.shared.off();
    }



}


export default ChatPage;