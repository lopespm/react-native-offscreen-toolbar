import React, { Component } from 'react';
import { StyleSheet, View, Animated, StatusBar } from 'react-native';
import PropTypes from 'prop-types';

const STATUS_BAR_HEIGHT = StatusBar.currentHeight;

class OffscreenToolbar extends Component {
    static propTypes = {
        toolbar: PropTypes.func.isRequired,
        scrollableOverlay: PropTypes.func,
        scrollable: PropTypes.func.isRequired,
        toolbarHeight: PropTypes.number.isRequired,
        scrollablePaddingTop: PropTypes.number.isRequired,
    };

    static defaultProps = {
        toolbarHeight: 56,
        scrollablePaddingTop: 56 + 8,
    };

    constructor(props) {
        super(props);

        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);

        this.state = {
            scrollAnim,
            offsetAnim,
            clampedScroll: Animated.diffClamp(
                Animated.add(
                    scrollAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                        extrapolateLeft: 'clamp',
                    }),
                    offsetAnim,
                ),
                0,
                props.toolbarHeight,
            ),
        };
    }

    clampedScrollValue = 0;
    offsetValue = 0;
    scrollValue = 0;

    componentDidMount() {
        this.state.scrollAnim.addListener(({ value }) => {
            const diff = value - this.scrollValue;
            this.scrollValue = value;
            this.clampedScrollValue = Math.min(
                Math.max(this.clampedScrollValue + diff, 0),
                this.props.toolbarHeight
            );
        });
        this.state.offsetAnim.addListener(({ value }) => {
            this.offsetValue = value;
        });
    }

    componentWillUnmount() {
        this.state.scrollAnim.removeAllListeners();
        this.state.offsetAnim.removeAllListeners();
    }

    onScrollEndDrag = () => {
        this.scrollEndTimer = setTimeout(this.onMomentumScrollEnd, 250);
    };

    onMomentumScrollBegin = () => {
        clearTimeout(this.scrollEndTimer);
    };

    onMomentumScrollEnd = () => {
        const statusAndToolbarHeight = this.props.toolbarHeight + STATUS_BAR_HEIGHT;
        const targetOffset = this.isToolbarNearHidingPosition()
            ? this.offsetValue + statusAndToolbarHeight
            : this.offsetValue - statusAndToolbarHeight ;

        Animated.timing(this.state.offsetAnim, {
            toValue: targetOffset,
            duration: 350,
        }).start();
    };

    isToolbarNearHidingPosition() {
        const toolbarHeight = this.props.toolbarHeight;
        const statusAndToolbarHeight = this.props.toolbarHeight + STATUS_BAR_HEIGHT;
        return this.scrollValue > statusAndToolbarHeight &&
            this.clampedScrollValue > (toolbarHeight) / 2;
    }

    scrollableWithScrollHooks = () => {
        const scrollable = this.props.scrollable();
        return React.cloneElement(
            scrollable,
            {
                scrollEventThrottle: 1,
                onMomentumScrollBegin: this.onMomentumScrollBegin,
                onMomentumScrollEnd: this.onMomentumScrollEnd,
                onScrollEndDrag: this.onScrollEndDrag,
                onScroll: Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }]),
                contentContainerStyle: { paddingTop: this.props.scrollablePaddingTop },
                style: { ...scrollable.props.style },
            },
        );
    }

    render() {
        const toolbarHeight = this.props.toolbarHeight;
        const toolbarTranslationY = this.state.clampedScroll.interpolate({
            inputRange: [0, toolbarHeight],
            outputRange: [0, -toolbarHeight],
            extrapolate: 'clamp',
        });

        return (
            <View style={styles.container}>
                {this.scrollableWithScrollHooks()}
                {this.props.scrollableOverlay ? this.props.scrollableOverlay() : null}
                <Animated.View style={[styles.toolbarContainer, { transform: [{ translateY: toolbarTranslationY }] }]}>
                    {this.props.toolbar()}
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbarContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
});

export default OffscreenToolbar;
