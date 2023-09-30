import { View, Text, Image } from 'react-native'
import React from 'react'

const Item_List = () => {
  return (
    <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems:'center',
      marginTop: 20,
      marginHorizontal: 10,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 20,
      padding: 10,
    }}>
    <Text style={{fontSize: 20, fontWeight: '500', color: 'black'}}>
      Hello
    </Text>
    <Image
      style={{width: 40, height: 40, tintColor: 'red'}}
      source={require('../src/images/delete.png')}
    />
  </View>
  )
}

export default Item_List