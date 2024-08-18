import React from 'react';
import { Image, View } from 'react-native';

export function Erro(){
    return (
        <View>
          <Image source={require('../utils/Erro.svg')}  />
        </View>
    );
};