import React, { Component } from 'react'
import api from '../services/api'
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native'

export default class Main extends Component {
    //status bar title
    static navigationOptions = {
        title: "JS Hunt",
    };

    //Variaveis states server carregam automaticamente
    state = {
        productInfo: {}, //outras infos da API.data
        docs: [], //dados em Docs da API
        page: 1,  //paginas
    };

    componentDidMount(){ // Executa assim que a aplicação inicia 
        this.loadProducts();
    }

    //Caregando os dados da API no state da aplicação
    loadProducts = async(page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const {docs, ...productInfo} = response.data;

        this.setState({
            docs: [...this.state.docs, ...docs], 
            productInfo,
            page
        }); //unindo duas listas para evitar que uma sobre escreva a outra
    };

    loadMore = () => { // Carregar o resto dos containers para e tela 
        const {page, productInfo} = this.state;

        if(page === productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    }

    renderItem = ({item}) => ( //bloco de cada item da list
        <View style = {styles.productContainer}>
            <Text style = {styles.productTitle}>{item.title}</Text>
            <Text style = {styles.productDescription}>{item.description}</Text>

            <TouchableOpacity 
            style = {styles.productButon} 
            onPress={() => {
                this.props.navigation.navigate("Product", {product: item})
            }}
            >
                <Text style = {styles.productButtonText}>Acessar</Text>
            </TouchableOpacity>
        </View>
    )

    render() {
        return (
            <View style={styles.container}>
                <FlatList //tipo de lista
                    contentContainerStyle={styles.list}
                    data={this.state.docs}
                    keyExtractor={item => item._id}
                    renderItem = {this.renderItem}
                    onEndReached = {this.loadMore} //quando chegar no final da lista ele vai carregar o resto
                    onEndReachedThreshold={0.1} //quando chegar perto do final ele carregará a 90%
                    />
            </View>
        )
    }
}


const styles = StyleSheet.create({ //designer da aplicação
    container:{
        flex:1,
        backgroundColor:"#fafafa",
    },
    list:{
        padding:20,
    },
    productContainer:{
        backgroundColor:'#FFF',
        borderWidth:1,
        borderColor:"#DDD",
        borderRadius:5,
        padding:20,
        marginBottom:20,
    },
    productTitle:{
        fontSize:18,
        fontWeight:"bold",
        color:"#333"
    },
    productDescription:{
        fontSize:16,
        color:"#999",
        marginTop:5,
        lineHeight:24
    },
    productButon:{
        height:42,
        borderRadius:5,
        borderWidth:2,
        borderColor:"#da552f",
        backgroundColor:"transparent",
        justifyContent:"center",
        alignItems:"center",
        marginTop:10,
    },
    productButtonText:{
        fontSize:16,
        color:"#DA552F",
        fontWeight:"bold",
    }
})
