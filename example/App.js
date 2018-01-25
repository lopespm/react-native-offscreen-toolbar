import React from 'react';
import { StyleSheet, View, Text, ToolbarAndroid, FlatList } from 'react-native';
import OffscreenToolbar from 'react-native-offscreen-toolbar';

const TOOLBAR_HEIGHT = 56;
const DUMMY_DATA = new Array(50).fill({}).map((elem, index) => ({key: `List Item ${index}`}));

export default class App extends React.Component {
    render() {
        const toolbar = () => (<ToolbarAndroid style={styles.toolbar} title={'RN Offscreen Toolbar Demo'} titleColor= {'#ffffff'} />);
        const listItem = ({item}) => <Text style={styles.listItem}>{item.key}</Text>;
        const scrollable = () => (<FlatList data={DUMMY_DATA} renderItem={listItem}/>);
        return (
            <View style={styles.container}>
                <OffscreenToolbar
                    toolbar={toolbar}
                    scrollable={scrollable}
                    toolbarHeight={TOOLBAR_HEIGHT}
                    scrollablePaddingTop={TOOLBAR_HEIGHT + 8}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbar: {
        backgroundColor: '#03A9F4',
        height: TOOLBAR_HEIGHT,
        alignSelf: 'stretch',
    },
    listItem: {
        height: 48,
        paddingLeft: 16,
        paddingRight: 16,
        textAlignVertical: 'center',
        fontSize: 16,
    }
});
