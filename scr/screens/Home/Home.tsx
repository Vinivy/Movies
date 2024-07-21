import { Text, TextInput, View } from "react-native";
import { Styles } from "./styles";


export default function Home() {
    return (
        <View style={Styles.Container}>
            <Text style={Styles.HeaderText}>What do you want to watch?</Text>
            <View>
                <TextInput style={Styles.Input} placeholder="Search" placeholderTextColor={'#fff'}/>
            </View>
            <View style={Styles.Alta}>
                
            </View>
        </View>
    );
}