import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'


import MainPage from '../MainPageComponent/MainPage'
import ChatPage from '../ChatPageComponent/ChatPage'
import SearchPage from '../SearchPage/SearchPage'
import ProfilePage from '../ProfilePage/ProfilePage'


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator()


class AppTabsScreen extends React.Component {

    render() {
        return (
            <Tab.Navigator tabBar={props => <MyTabBar {...props} />} initialRouteName='MainPage'>
                <Tab.Screen
                    name="MainPage"
                    component={MainPage}
                />
                <Tab.Screen
                    name="SearchPage"
                    component={SearchPage}
                />
                <Tab.Screen
                    name="ChatPage"
                    component={ChatPage}
                />
                <Tab.Screen
                    name="ProfilePage"
                    component={ProfilePage}
                />
            </Tab.Navigator>
        )
    }

}

function SelectImage(label) {
    switch (label) {
        case 'MainPage':
            return (<Image style={{ width: 25, height: 25 }}
                source={require('../../Commons/TabsImage/HOME.png')} />)
        case 'ChatPage':
            return (<Image style={{ width: 25, height: 25 }}
                source={require('../../Commons/TabsImage/CHAT.png')} />)
        case 'SearchPage':
            return (<Image style={{ width: 25, height: 25 }}
                source={require('../../Commons/TabsImage/SEARCH.png')} />)
        case 'ProfilePage':
            return (<Image style={{ width: 25, height: 25 }}
                source={require('../../Commons/TabsImage/PROFILE.png')} />)
    }
}

function MyTabBar({ state, descriptors, navigation }) {
    return (
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1, height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 1,backgroundColor: isFocused? '#97c0de' : 'white' }}
                    >
                            {SelectImage(label)}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}



export default AppTabsScreen;