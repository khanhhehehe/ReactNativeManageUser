import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const MyProfile = (props) => {
  const nav = props.navigation
  const changeManage = () => {
    nav.navigate('ManageShop')
  }
  return (

    <View style={styles.container}>
      <View style={styles.boxImg}>
        <Image
          style={styles.tinyLogo}
          source={require('./assets/pts.png')}
        />
      </View>
      <View style={styles.boxInfo}>
      <View>
        <Text style={styles.text}>Họ tên: Nguyễn Quốc Khánh</Text>
      </View>
      <View>
        <Text style={styles.text}>Mã sinh viên: PH27525</Text>
      </View>
      </View>

      <TouchableOpacity style={styles.btn} onPress={changeManage}>
        <Text style={styles.text}>Quản lý</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MyProfile

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#81D4FA',
    flex: 1,
    padding:10
  },
  tinyLogo: {
    width: 150,
    height: 150,
    borderRadius:150/2
  },
  boxImg:{
    justifyContent:'center',
    alignItems:'center',
  },
  boxInfo:{
    backgroundColor:'#FFAB40',
    padding:15,
    borderRadius:10,
    marginTop:20
  },
  text: {
    color: '#fff',
    fontWeight:'bold',
    fontSize:22
  },
  btn:{
    backgroundColor:'#EF6C00',
    justifyContent:'center',
    alignItems:'center',
    padding:8,
    borderRadius:10,
    marginTop:10
  }
})