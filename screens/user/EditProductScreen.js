import React , {useState} from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, FlatList, Button } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import {useSelector } from 'react-redux';

const EditProductScreen = (props) => {

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state=> state.products.userProducts.find((prod)=>{
        if(prod.id===prodId){
            return prod;
        }
    }));


    const [title, setTitle] = useState(editedProduct? editedProduct.title: '');
    const [imageUrl, setImageUrl] = useState(editedProduct? editedProduct.imageUrl: '');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState(editedProduct? editedProduct.description: '');

    // props.navigation.goBack();

    

    return (
        <ScrollView>
        <View style={styles.form}>
            <View style={styles.formControl}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} value={title} onChange={(text)=>setTitle(text)}/>
            </View>

            <View style={styles.formControl}>
                <Text style={styles.label}>Image URL</Text>
                <TextInput style={styles.input} value={imageUrl} onChange={(text)=>setImageUrl(text)}/>
            </View>

            {editedProduct? null:   <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput style={styles.input} value={price} onChange={(text)=>setPrice(text)}/>
                </View>
            }

            <View style={styles.formControl}>
                <Text style={styles.label}>Description</Text>
                <TextInput style={styles.input} value={desc} onChange={(text)=>setDesc(text)}/>
            </View>
        </View>

        </ScrollView>
    )
}

EditProductScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productId')?
        'Edit Product': 'Add Product',
        headerRight: ()=> (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title="Save"
                iconName="ios-checkmar"
                onPress={
                    ()=>{
                    }
                }
                />
            </HeaderButtons>
        ),
    }
}

export default EditProductScreen;

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});