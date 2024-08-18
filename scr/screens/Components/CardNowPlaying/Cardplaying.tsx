import { Image, Pressable } from "react-native";
import { Style } from "../CardTop/Styles";

interface Movie {
    id: number;
    poster_path: string;
}

interface MovieProps {
    data: Movie;
    onPress?: () => void;
}

export function CardPlaying({ data, onPress }: MovieProps) {
    return (
        <Pressable style={Style.Popular} onPress={onPress}>
            <Image
                style={Style.Image}
                source={{
                    uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
                }}
            />
        </Pressable>
    );
};
