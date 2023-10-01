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
  Modal,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

const Main_Screen = () => {
  const [Value, setValue] = useState('');
  const [todoList, settodoList] = useState([]);
  const [modal, setmodal] = useState(false);
  const [modal_value, setmodal_value] = useState('');
  const [New_Arr, setNew_Arr] = useState([]);

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

  const Edit_Task = item => {
    setNew_Arr({id: item.id, title: item.title});
    setmodal_value(item.title);
    setmodal(true);
  };

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

  const Update_Value = async () => {
    const Update = todoList.map(item => {
      if (item.id === New_Arr.id) {
        return {...item, title: modal_value};
      }
      return item;
    });
    settodoList(Update);
    await AsyncStorage.setItem('TASKS', JSON.stringify(Update));
    setmodal(false)
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
          <TouchableOpacity onPress={() => Edit_Task(item)}>
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
      {modal ? (
        <Modal animationType="slide" transparent={true}>
          <View style={styles.modalView}>
            <TextInput
              value={modal_value}
              onChangeText={text => {
                setmodal_value(text);
              }}
              style={{
                height: 50,
                borderWidth: 1,
                borderColor: 'black',
                width: '100%',
                borderRadius: 30,
                padding: 15,
              }}
              placeholder="Enter something..."
            />
            <TouchableOpacity onPress={() => Update_Value()}>
              <Text style={{marginTop: 10, color: 'green'}}>Save</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      ) : (
        ''
      )}
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
const styles = StyleSheet.create({
  modalView: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '40%',
    left: '15%',
    marginHorizontal: '10%',
    elevation: 5,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
});
