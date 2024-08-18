
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MagnifyingGlass } from "phosphor-react-native"; // Corrigido: Remover importação não usada
import { api } from "../../Services/Api";
import { CardTop } from "../Components/CardTop/CardTop";
import { CardDestaques } from "../Components/CardPopular/CardDestaques";
import { CardPlaying } from "../Components/CardNowPlaying/Cardplaying";
import { Styles } from "./styles";
import { CardUp } from "../Components/CardUpcoming/CardUp";
import { Erro } from "../utils/erro";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
}

export default function Home() {
    //filmes destaques
    const [discoveryMovies, setDiscoveryMovies] = useState<Movie[]>([]);
    //filmes upcoming
    const [discoveryMoviesUpComing, setDiscoveryMoviesUpComing] = useState<Movie[]>([]);
    //filmes top rated
    const [discoveryMoviesTopRated, setDiscoveryMoviesTopRated] = useState<Movie[]>([]);
    //filmes popular
    const [discoveryMoviesPopular, setDiscoveryMoviesPopular] = useState<Movie[]>([]);
    //a pagina inicial é 1
    const [page, setPage] = useState(1);
    //loading
    const [loading, setLoading] = useState(false);
    //pesquisa
    const [search, setSearch] = useState("");
    //resultado da pesquisa
    const [searchResultMovie, setSearchResultMovie] = useState<Movie[]>([]);
    //se não houver resultado
    const [noResultSearch, setNoResultSearch] = useState(null);
    //opções
    const [optionPrimary, setOptionPrimary] = useState(null);
    const [optionSecond, setOptionSecond] = useState(null);
    const [optionThird, setOptionThird] = useState(null);
    const [optionFourth, setOptionFourth] = useState(null);

    //useEffect para carregar os filmes ao iniciar o app
    useEffect(() => {
        loadMoreData();
    }, []);

    useEffect(() => {
        loadMoreDataUpComing();
    }, []);

    useEffect(() => {
        loadMoreDataTopRated();
    }, []);

    useEffect(() => {
        loadMoreDataPopular();
    }, []);

    //resetar opções para valores funcionarem corretamente, e esse usecallback é para não ficar criando novas funções toda vez que o componente for renderizado
    const resetOptions = useCallback(() => {
        setOptionPrimary(false);
        setOptionSecond(false);
        setOptionThird(false);
        setOptionFourth(false);
    }, []);

    //verificar as opções que quando forem ativadas irão exibir a lista de filmes e outras não
    const abrirPrimary = useCallback(() => {
        resetOptions();
        setOptionPrimary(true);
    }, [resetOptions]);

    const abrirSecond = useCallback(() => {
        resetOptions();
        setOptionSecond(true);
    }, [resetOptions]);

    const abrirThird = useCallback(() => {
        resetOptions();
        setOptionThird(true);
    }, [resetOptions]);

    const abrirFourth = useCallback(() => {
        resetOptions();
        setOptionFourth(true);
    }, [resetOptions]);

    

    //opções do menu
    const menuOptions = [
        { id: '1', title: 'Now playing', function: abrirPrimary },
        { id: '2', title: 'Upcoming', function: abrirSecond },
        { id: '3', title: 'Top rated', function: abrirThird },
        { id: '4', title: 'Popular', function: abrirFourth },
    ];

    //popular a lista de filmes
    const loadMoreData = async () => {
        setLoading(true);
        try {
            const response = await api.get('/movie/popular', {
                 params: {
                     page 
                    } 
                });

            setDiscoveryMovies(prevMovies => [...prevMovies, ...response.data.results]);
            setPage(prevPage => prevPage + 1);

        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };
    //filmes upcoming
    const loadMoreDataUpComing = async () => {
        setLoading(true);
        try {
            const response = await api.get('/movie/upcoming', {
                 params: {
                     page 
                    } 
                });

            setDiscoveryMoviesUpComing(prevMovies => [...prevMovies, ...response.data.results]);
            setPage(prevPage => prevPage + 1);

        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };
    //filmes top rated
    const loadMoreDataTopRated = async () => {
        setLoading(true);
        try {
            const response = await api.get('/movie/top_rated', {
                 params: {
                     page 
                    } 
                });

            setDiscoveryMoviesTopRated(prevMovies => [...prevMovies, ...response.data.results]);
            setPage(prevPage => prevPage + 1);

        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };
    //filmes popular
    const loadMoreDataPopular = async () => {
        setLoading(true);
        try {
            const response = await api.get('/movie/popular', {
                 params: {
                     page 
                    } 
                });

            setDiscoveryMoviesPopular(prevMovies => [...prevMovies, ...response.data.results]);
            setPage(prevPage => prevPage + 1);

        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };
    
    //pesquisar filmes
    const searchMovie = async (query: string) => {
        setLoading(true);
        try {
            const response = await api.get('/search/movie', {
                 params: {
                     query 
                    } 
                });

            if (response.data.results.length === 0) {
                setNoResultSearch(true);
            } else {
                setSearchResultMovie(response.data.results);
            }
        } catch (error) {
            console.error("Failed to fetch search results", error);
        } finally {
            setLoading(false);
        }
    };
    //pesquisar
    const handleSearch = (text: string) => {
        setSearch(text);
        if (text.length > 2) {
            searchMovie(text);
        } else {
            setSearchResultMovie([]);
        }
    };

    //aparecerá resultado apos 2 caracteres 
    const movieData = search.length > 2 ? searchResultMovie : [];

    //reder dso componentes
    const RenderPlaying = ({ item }: { item: Movie }) => (
        <CardPlaying data={item} onPress={() => item.id } />
    );

    const RenderUp = ({ item }: { item: Movie }) => (
        <CardUp data={item} onPress={() => item.id } />
    );

    const RenderTop = ({ item }: { item: Movie }) => (
        <CardTop data={item} onPress={() => item.id } />
    );

    const RenderPopular = ({ item }: { item: Movie }) => (
        <CardDestaques data={item} onPress={() => item.id } />
    );

    return (
        <View style={Styles.Container}>
            <Text style={Styles.HeaderText}>What do you want to watch?</Text>

            <View style={Styles.ContainerInput}>
                <TextInput
                    style={Styles.Input}
                    placeholder="Search"
                    placeholderTextColor={'#fff'}
                    value={search}
                    onChangeText={handleSearch}
                />
                <MagnifyingGlass size={20} color="#fff" style={{ position: 'absolute', right: 10 }} />
            </View>

            <View>
                <FlatList
                    data={discoveryMoviesTopRated}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <CardDestaques  data={item} />}
                />
            </View>

            <View>
                <FlatList
                    data={menuOptions}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    contentContainerStyle={{ justifyContent: 'space-between' }}
                    renderItem={({ item }) => (
                        //retorna a item que puxa a fuction
                        <TouchableOpacity onPress={item.function}>
                            <Text style={Styles.options}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => <View style={{ width: 10 }} />} // Espaçamento entre os itens
                />
            </View>

            <View style={Styles.Alta}> 
            {/*quando fizer a busca de filmes ira aparecer os cards */
            movieData.length > 0 && movieData.map(movie => (
                <FlatList
                    data={movieData}
                    key={movie.id}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={RenderPlaying}
                    numColumns={3} // 3 colunas
                    scrollEnabled={true}
                    columnWrapperStyle={Styles.Rows} // Estilo para as colunas
                    onEndReached={loadMoreData} // Carregar mais dados ao rolar
                    onEndReachedThreshold={0.5} // Definindo quando carregar mais
            />
            ))}
            
            {loading && <ActivityIndicator size={50} color="#02966e" />} 

            {/**/}
            {optionPrimary && discoveryMovies.length > 0 && discoveryMovies.map(movie =>(
                <FlatList
                data={discoveryMovies}
                key={movie.id}
                keyExtractor={(item) => item.id.toString()}
                renderItem={RenderPlaying}
                numColumns={3} // 3 colunas
                scrollEnabled={true}
                columnWrapperStyle={Styles.Rows} // Estilo para as colunas
                onEndReached={loadMoreData} // Carregar mais dados ao rolar
                onEndReachedThreshold={0.5} // Definindo quando carregar mais
                />
             ))
            }

            {/*se a segunda opção for ativada irá exbir a lista de filmes upcoming */}
            {optionSecond && discoveryMoviesUpComing.length > 0 && discoveryMoviesUpComing.map(movie =>(
                <FlatList
                data={discoveryMoviesUpComing}
                key={movie.id}
                keyExtractor={(item) => item.id.toString()}
                renderItem={RenderUp}
                numColumns={3} // 3 colunas
                columnWrapperStyle={Styles.Rows} // Estilo para as colunas
                scrollEnabled={true}
                onEndReached={loadMoreDataUpComing} // Carregar mais dados ao rolar
                onEndReachedThreshold={0.5} // Definindo quando carregar mais
                />
             ))
            }
             
            {/*se a terceira opção for ativada irá exbir a lista de filmes top rated */}
             {optionThird && discoveryMoviesTopRated.length > 0 && discoveryMoviesTopRated.map(movie =>(
                <FlatList
                data={discoveryMoviesTopRated}
                key={movie.id}
                keyExtractor={(item) => item.id.toString()}
                renderItem={RenderTop}
                numColumns={3} // 3 colunas
                scrollEnabled={true}
                columnWrapperStyle={Styles.Rows} // Estilo para as colunas
                onEndReached={loadMoreDataTopRated} // Carregar mais dados ao rolar
                onEndReachedThreshold={0.5} // Definindo quando carregar mais
                />
             ))
            }

            {/*se a quarta opção for ativada irá exbir a lista de filmes popular */}             
            {optionFourth && discoveryMoviesPopular.length > 0 && discoveryMoviesPopular.map(movie =>(
                <FlatList
                data={discoveryMoviesPopular}
                key={movie.id}
                keyExtractor={(item) => item.id.toString()}
                renderItem={RenderPopular}
                numColumns={3} // 3 colunas
                scrollEnabled={true}
                columnWrapperStyle={Styles.Rows} // Estilo para as colunas
                onEndReached={loadMoreDataPopular} // Carregar mais dados ao rolar
                onEndReachedThreshold={0.5} // Definindo quando carregar mais
                />
             ))
            }
            {noResultSearch && <Erro/>}
        </View>
        </View>
    );
};