import { Pressable } from "react-native";
import { Image } from "react-native";
import { Style } from "./Styles";

// vamos fazer com quer presionado a img, ela nos leve ao componente do seu filme

interface Movie {
    id: number;
    poster_path: string;
}

//
interface MovieProps {
    data: Movie;
    //uma função ao pressionar, opcional "?". que retorna a nada
    onPress?: () => void;
}

//vamos fazer com que receba essas proprieades, TODAS  usando o "rest"
export function CardMovie({ data, ...rest }: MovieProps) {
    return (
        <Pressable {...rest} style={Style.CardMovies}>
            <Image source={
                {uri: `https://www.themoviedb.org/t/p/w500${data.poster_path}`}
            } style={Style.Image} />
        </Pressable>
    );
};
