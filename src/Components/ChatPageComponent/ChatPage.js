import React, { Component } from 'react'
import { View, Text, Button, ImageBackground, Image } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import Fire from '../../../Fire';


class ChatPage extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: (navigation.state.params || {}).name || 'Chat!',
    });

    state = {
        messages: [],
    }

    get user() {
         return {
             avatar : Fire.shared.profilePicture,
             name: Fire.shared.userName,
             _id: Fire.shared.uid,
             
         };
    }

    render() {
        // console.log(this.props.route.params)
        //  const route = this.props.route
        //  const { name } = route.params
        return (
            <ImageBackground
                source={require('../../Commons/BACKGROUND.png')} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1 }}
            >
                <GiftedChat
                    messages={this.state.messages}
                    onSend={Fire.shared.send}
                    user={this.user}
                    renderUsernameOnMessage={true}
                    showUserAvatar = {true}
                />

            </ImageBackground>
        )
    }

    componentDidMount() {
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