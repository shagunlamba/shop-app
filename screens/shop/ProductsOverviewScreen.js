import React from 'react';
import { FlatList, Platform, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = (props) => {

    const products = useSelector((state)=>{
        return state.products.availableProducts;
    });

    const dispatch = useDispatch();


    const selectItemHandler = (id, title)=> {
        props.navigation.navigate({
            routeName: 'ProductDetail',
            params: {
                productID: id,
                productTitle: title
            }
        })
    }

    return (
            <FlatList 
                data={products} 
                keyExtractor={(item)=> item.id} 
                renderItem={(itemData)=>{
                    return <ProductItem 
                                imageUrl={itemData.item.imageUrl}
                                title={itemData.item.title}
                                price={itemData.item.price}
                                onSelect={
                                    () =>
                                    {
                                        selectItemHandler(itemData.item.id, itemData.item.title)
                                    }
                                }
                            >
                                    <Button color={Colors.primary} title="View Details" onPress={
                                        () =>
                                        {
                                        selectItemHandler(itemData.item.id, itemData.item.title)
                                        }
                                    }/>
                                    <Button color={Colors.primary} title="To Cart" onPress={()=>{
                                        useDispatch(cartActions.addToCart(itemData.item))
                                    }}/>
                            </ProductItem>
                }}
            />
    )
}

export default ProductsOverviewScreen;

ProductsOverviewScreen.navigationOptions = (navData)=> {
    return {
    headerTitle: 'All Products',
    headerLeft: ()=> (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
            title="Menu"
            iconName="ios-menu"
            onPress={
                ()=>{
                    navData.navigation.toggleDrawer();
                }
            }
            />
        </HeaderButtons>
    ),
    headerRight: ()=>( <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
            title="Cart"
            iconName="ios-cart"
            onPress={
                ()=>{
                    navData.navigation.navigate({
                        routeName: 'Cart'
                    })
                }
            }
            />
    </HeaderButtons>
    )
    }
}

