import { View, Text } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style={{justifyContent:'center',alignItems:'center', backgroundColor:'#73e600', height: 80, borderBottomEndRadius:100, borderBottomStartRadius:100}}>
      <Text style={{fontSize:30, color:'black', fontWeight:'900'}} >TODO LIST</Text>
    </View>
  )
}

export default Header