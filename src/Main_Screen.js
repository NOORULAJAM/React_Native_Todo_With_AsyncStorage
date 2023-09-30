import {View, Text, SafeAreaView, TextInput, Image} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import Item_List from '../components/Item_List';

const Main_Screen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <Header />
        <Item_List />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf: 'center',
          height: 40,
          width: '90%',
          position: 'absolute',
          bottom: 50,
        }}>
        <TextInput
          style={{
            height: 50,
            borderWidth: 1,
            borderColor: 'black',
            width: '85%',
            borderRadius: 30,
            padding:15
          }}
        />
        <Image
          style={{width: 50, height: 50}}
          source={require('../src/images/add.png')}
        />
      </View>
    </SafeAreaView>
  );
};

export default Main_Screen;
