import { ActivityIndicator, ActivityIndicatorBase, FlatList, Text, TextInput, View } from "react-native";
import { Styles } from "./styles";
import { MagnifyingGlass } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { api } from "../../Services/Api";
import { CardMovie } from "../Components/CardMovie/Card";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
}

export default function Home() {
    // a tipagem desse useStates vai ser o Movie
    const [discoverymovies, setDiscoveryMovies] = useState<Movie[]>([]);

    //state para atualização da rolagem, aqui sera as telas de mais filmes
    const [page, setpage] =useState(1);

    //função para o loading
    const [loading, setloading] = useState(false);

    //vamos ter que fazer duas funções para que o valor mude, e outra para buscar atravez da API
    const [Search, setSearch] = useState("");

    //um estado para se tiver resultados
    const [SearchResultMovie, setSearchResultMovie] = useState<Movie[]>([]);

    //um estado para se caso não tiver resultado
    const [noResultSearch, setnoResultSearch] = useState(false);


    // Este trecho de código está usando o hook useEffect para chamar a função loadMoreData quando o componente é montado.
    // O hook useEffect recebe dois argumentos: uma função de retorno e um array de dependências.
    // Neste caso, a função de retorno está chamando a função loadMoreData.
    // O array de dependências está vazio, o que significa que a função de retorno será chamada apenas uma vez, quando o componente for montado.
    // Isso garante que a função loadMoreData seja chamada imediatamente após o componente ser renderizado.
    // O objetivo deste código é buscar dados de uma API e atualizar o estado discoverymovies com os dados da resposta.
    // Ao chamar a função loadMoreData no hook useEffect, os dados serão buscados e o estado será atualizado quando o componente for montado.
    // Isso permite que o componente exiba os dados buscados quando for renderizado.
    useEffect(() => {
        loadMoreData();
    }, []);

    //função assncrona  de equicição da api
    const loadMoreData = async () => {
        setloading(true);
        const response = await api.get('/movie/popular', {
            params: { 
              page,
                
            }} 
        );
                        //todos os resultados que ja existe, e os novos resultados
        setDiscoveryMovies([...discoverymovies, ...response.data.results]);
        setpage(page + 1);
        setloading(false);
    };


    //enviando o valor para a API
    const SearchMovie = async (query: string) => {
        setloading(true);
        const response = await api.get('/search/movie', {
            params: { 
              query,
                
            }} 
        );
        if (response.data.results.length === 0) {
            //se não existe resultado então :
            setnoResultSearch(true)
        }else{
            //se tiver resultado :
            setSearchResultMovie(response.data.results);
        }
        setloading(true)
    }

    //pegando o valor que escrever
    
    const handleSearch = (text: string) => {
        setSearch(text);
        if (text.length > 2) {
            SearchMovie(text);
        } else {
            setSearchResultMovie([]);
        }
    };

    //caso não tenho resultado ira aparecer os filmes populares
    const movieData = SearchMovie.length> 0 ? SearchResultMovie : discoverymovies;

    return (
        <View style={Styles.Container}>
            <Text style={Styles.HeaderText}>What do you want to watch?</Text>
            <View style={Styles.ContainerInput}>
                <TextInput 
                style={Styles.Input} 
                placeholder="Search" 
                placeholderTextColor={'#fff'}
                value={Search}
                onChangeText={handleSearch}
                />
                <MagnifyingGlass size={20} color="#ffff" style={{position: 'absolute', right: 10, }} />
            </View>
            <View style={Styles.Alta}>
                 <FlatList
                   data={movieData} 
                   numColumns={3}
                   renderItem={({ item }) => (
                       <CardMovie data={item} />
                   )}
                   showsVerticalScrollIndicator={false}
                   contentContainerStyle={{
                    paddingBottom: 100,
                    paddingTop: 30,
                   }}
                   //quando chegar no final da listagem era acionar a function para carregar mais
                   onEndReached={() => { loadMoreData() }}
                   //quando chegar na metade da lista ele ira fazer a render
                   onEndReachedThreshold={0.5}
                   />
                   {loading && <ActivityIndicator size={50} color="#02966e5" />}
                 
            </View>
        </View>
    );
}