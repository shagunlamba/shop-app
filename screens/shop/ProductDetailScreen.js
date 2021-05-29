import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Button, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';


const ProductDetailScreen = (props) => {

    const productID = props.navigation.getParam('productID');

    const selectedProduct = useSelector((state)=>{
        const ans = state.products.availableProducts.find((prod)=>{
            if(prod.id === productID)
             {   
                 return prod;
             }
        });
        return ans;
    });

    const dispatch = useDispatch();


    return (
        <ScrollView>
            <View>
                <View style={styles.imgContainer}>
                    <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
                </View>
                <View style={styles.scroll}>
                    <View style={styles.actions}>
                        <Button 
                            color={Colors.primary} 
                            title="Add to Cart" 
                            onPress={
                                ()=>{
                                    dispatch(cartActions.addToCart(selectedProduct))
                                }
                            }/>
                    </View>
                </View>
                <Text style={styles.price}>
                    ${selectedProduct.price.toFixed(2)}
                </Text>
                <Text style={styles.desc}>
                    {selectedProduct.description}
                </Text>
            </View>
        </ScrollView>
    )
}

export default ProductDetailScreen;


ProductDetailScreen.navigationOptions = (navData)=> {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}

const styles = StyleSheet.create({ 
   imgContainer: {
      marginLeft: Dimensions.get('window').width * 0.05
   },
   image: {
      width: '95%',
      height: 300
   },
   price: {
      fontSize: 20,
      color: '#888',
      textAlign: 'center',
      marginVertical: 20,
      fontFamily: 'open-sans-bold'
   }, 
   desc: {
      fontSize: 14,
      textAlign: 'center',
      marginHorizontal: 20,
      fontFamily: 'open-sans'
   },
   actions: {
       marginVertical: 10,
       textAlign: 'center',
       width: 150,
       flexDirection: 'row',
       justifyContent: 'center'
   }, 
   scroll: {
       alignItems: 'center'
   }
});