import React from 'react';
import {RCTNativeAppEventEmitter} from 'react-native'
import { WebView } from 'react-native-webview'



const Product = ({navigation}) => {
    const URL = navigation.state.params.product.url;
    return(
        <WebView source={{uri: URL}} />
    )
}

Product.navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.product.title
});


export default Product;
