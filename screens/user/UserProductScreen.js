import React from 'react';
import { View, StyleSheet, FlatList, Button, Alert } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';


const UserProductScreen = (props) => {

    const userProducts = useSelector((state)=>{
        return state.products.userProducts;
    })

    const dispatch = useDispatch();

    const editProductHandler = (id)=>{
        props.navigation.navigate('EditProduct',{
            productId: id
        })
    }

    const deleteHandler = (id)=> {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?',[
            {text: 'No', style: 'default'},
            {
                text: 'Yes', 
                style: 'destructive', 
                onPress: ()=>{
                dispatch(productsActions.deleteProduct(id));
                }
            }
        ]);
    }

    return (
       <FlatList
            data={userProducts}
            keyExtractor={(item)=>item.id}
            renderItem={itemData=><ProductItem
                image = {itemData.item.imageUrl}
                title = {itemData.item.title}
                price = {itemData.item.price}
                onSelect={()=>{
                    editProductHandler(itemData.item.id);
                }}
            />}
        >
                <Button color={Colors.primary} title="Edit" onPress={() =>{
                    editProductHandler(itemData.item.id);
                }}/>
                <Button color={Colors.primary} title="Delete" onPress={()=>{
                    deleteHandler(itemData.item.id);
                }}
                />
        </FlatList>
    )
}

export default UserProductScreen;

UserProductScreen.navigationOptions = (navData)=>{
    return {
        headerTitle: 'Your Products',
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
        headerRight: ()=> (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title="Add"
                iconName="ios-create"
                onPress={
                    ()=>{
                        navData.navigation.navigate('EditProduct');
                    }
                }
                />
            </HeaderButtons>
        ),
    }
}

const styles = StyleSheet.create({

});