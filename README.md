# react-native-offscreen-toolbar [![npm version](https://badge.fury.io/js/react-native-offscreen-toolbar.svg)](https://badge.fury.io/js/react-native-offscreen-toolbar)

Component generalization of [Janic Duplessis' solution](https://medium.com/appandflow/react-native-collapsible-navbar-e51a049b560a) to animate the toolbar off-screen while scrolling, a common [material design pattern](https://material.io/guidelines/patterns/scrolling-techniques.html#scrolling-techniques-behavior)

![simple list demo](https://lopespm.github.io/files/rn-offscreen-toolbar/simplelist_demo.gif) ![spacer](https://user-images.githubusercontent.com/3640622/35420943-3795b3c4-0238-11e8-98c3-8c176c75e1d7.png) ![search demo](https://lopespm.github.io/files/rn-offscreen-toolbar/search_demo.gif)

<sup>Library usage in both the example bundled with the library and in the search screen of a to be released application</sup>


## Installation

`$ npm install react-native-offscreen-toolbar --save`

## Usage

```js
import OffscreenToolbar from 'react-native-offscreen-toolbar';

export default class YourComponent extends React.Component {
    render() {
        const toolbar = () => (<ToolbarAndroid title={'Title'} />);
        const listItem = ({item}) => <Text>{item.key}</Text>;
        const scrollable = () => (<FlatList data={DUMMY_DATA} renderItem={listItem}/>);
        return (
            <View style={styles.container}>
                <OffscreenToolbar
                    toolbar={toolbar}
                    scrollable={scrollable} />
            </View>
        );
    }
}
```

### Properties

| Prop | Description | Default |
|---|---|---|
|**`toolbar`**|Component for the toolbar/navbar. |*None*|
|**`scrollable`**|Component for the scrollable, a `FlatList` or `ScrollView` for example. |*None*|
|**`scrollableOverlay`**|Optional component for the scrollable overlay. |*None*|
|**`toolbarHeight`**|Toolbar height used when calculating the animations. |`56`|
|**`scrollablePaddingTop`**|Since the scrollable is placed behind the toolbar, this padding is typically used to make the scrollable content appear below the toolbar. |`64`|


## Example

* [`Example` project bundled with this module, using a simple FlatList](https://github.com/lopespm/react-native-offscreen-toolbar/tree/master/example)