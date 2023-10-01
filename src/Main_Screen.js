import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

const Main_Screen = () => {
  const [Value, setValue] = useState('');
  const [todoList, settodoList] = useState([]);

  useEffect(() => {
    Load_Item();
  }, []);

  const Add_Item = async () => {
    if (Value) {
      const newTasks = [
        ...todoList,
        {id: Math.floor(Math.random() * 100 + 1), title: Value},
      ];
      await AsyncStorage.setItem('TASKS', JSON.stringify(newTasks));
      settodoList(newTasks);
      setValue('');
    } else {
      console.warn('Filed is empty');
    }
  };
  const Load_Item = async () => {
    const itemsArray = JSON.parse(await AsyncStorage.getItem('TASKS'));
    if (itemsArray) {
      settodoList(itemsArray);
      console.log('settt huwa');
    } else {
      console.log('Nahi huwa');
    }
  };

  const Edit_Task = id => {};
  const Delete_Task = async id => {
    const Delete = todoList.filter(item => item.id !== id);
    await AsyncStorage.setItem('TASKS', JSON.stringify(Delete));
    settodoList(Delete);
  };

  const clearTodos = () => {
    Alert.alert('Confirm', 'Clear todo list?', [
      {
        text: 'Yes',
        onPress: () => {
          settodoList([]);
          AsyncStorage.clear();
        },
      },
      {text: 'No'},
    ]);
  };
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 20,
          marginHorizontal: 10,
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 20,
          padding: 10,
        }}>
        <Text style={{fontSize: 20, fontWeight: '500', color: 'black'}}>
          {item.title}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => Edit_Task(item.id)}>
            <Image
              style={{width: 35, height: 35, marginRight: 15}}
              source={require('../src/images/edit.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Delete_Task(item.id)}>
            <Image
              style={{width: 35, height: 35, tintColor: 'red'}}
              source={require('../src/images/delete.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={'#73e600'} />
      <View>
        <Header />
        {todoList.length !== 0 ? (
          <FlatList
            data={todoList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        ) : (
          <LottieView
            source={require('../src/images/no_item.json')}
            style={{width: '100%', height: '80%'}}
            autoPlay
            loop
          />
        )}
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
            width: '75%',
            borderRadius: 30,
            padding: 15,
          }}
          placeholder="Add Your Task..."
          value={Value}
          onChangeText={text => setValue(text)}
        />
        <TouchableOpacity onPress={() => Add_Item(Value)}>
          <Image
            style={{width: 50, height: 50, marginLeft: 5}}
            source={require('../src/images/add.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => clearTodos()}>
          <Image
            style={{width: 50, height: 50, tintColor: 'red'}}
            source={require('../src/images/clear.png')}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Main_Screen;
