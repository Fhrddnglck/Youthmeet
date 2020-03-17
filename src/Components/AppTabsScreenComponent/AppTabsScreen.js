import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import MainPage from '../MainPageComponent/MainPage'
import SearchPage from '../SearchPage/SearchPage'
import NewGroup from '../NewGroupComponent/NewGroup'
import ChatPage from '../ChatPageComponent/ChatPage'
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
                    name="NewGroup"
                    component={NewGroup}
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
            return (<Icon
                name='ios-home'
                color='white'
                size={36}
            />)
        case 'ChatPage':
            return (<Icon
                name='ios-chatbubbles'
                color='white'
                size={36}
            />)
        case 'NewGroup':
            return (<Icon
                name='ios-add-circle'
                color='white'
                size={36}
            />)
        case 'SearchPage':
            return (<Icon
                name='ios-search'
                color='white'
                size={36}
            />)
        case 'ProfilePage':
            return (<Icon
                name='ios-person'
                color='white'
                size={36}
            />)
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
                        style={{ flex: 0.5, height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: isFocused ? '#535353' : '#1F1C1B' }}
                    >
                        {SelectImage(label)}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}



export default AppTabsScreen;