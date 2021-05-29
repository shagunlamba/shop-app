import React from 'react';
import { View, Text, StyleSheet, Image, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';

const ProductItem = (props) => {

    let TouchableCmp = TouchableOpacity;
    if(Platform.OS==='android' && Platform.Version >= 21){
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <TouchableCmp onPress={props.onSelect}>
            <View style={styles.product}> 
                    <View style={styles.imgContainer}>
                        <Image style={styles.image} source={{uri: props.imageUrl }} />
                    </View>
                    <View style={styles.detail}>
                        <Text style={{...styles.title, marginBottom: 1}}>
                            {props.title}
                        </Text>
                        <Text style={styles.price}>
                            ${props.price.toFixed(2)}
                        </Text>
                    </View>
                    <View style={styles.actions}>
                       {props.children}
                    </View>
            </View>
        </TouchableCmp>
    )
}

export default ProductItem;

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20
    },
    imgContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    detail: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    },
    title: {
        fontSize: 18,
        marginVertical: 2,
        fontFamily: 'open-sans-bold'
    },
    price: {
        fontSize: 14,
        color: '#888',
        fontFamily: 'open-sans'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%'
    }
});