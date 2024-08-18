import { Rows } from 'phosphor-react-native';
import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#242A32',
        padding: 20,
    },

    HeaderText: {
        fontSize: 22,
        fontWeight: 'bold',
        lineHeight: 45,
        color: '#ffff',
        marginTop: 20,
    },

    ContainerInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 20,
    },

    Input: {
        width: '100%',
        height: 42,

        fontSize: 14,
        backgroundColor: '#67686D',
        color: '#ffff',
        letterSpacing: 1,
        borderRadius: 16,
        paddingLeft: 25,
    },

    options: {
        paddingEnd: 10,
        color: '#ffff',
        fontSize: 14,
        fontWeight: 'regular',
        letterSpacing: 1,
        marginTop: 10,
        marginBottom: 10,
    },

    Alta: {

    },

    Rows: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
}); 