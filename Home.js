import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, Button } from 'react-native'
import React from 'react'
import Dialog from "react-native-dialog";
import { useState } from 'react'

const Home = (props) => {
  const nav = props.navigation
  const [listShop, setlistShop] = useState([{ id: 0, nameShop: "Khanh", address: "Ha Noi", phoneNum: "0123323123", logoShop: './assets/shops.png', statusShop: true }])
  const [hide, setHide] = useState(false)
  const changeMyprofile = () => {
    nav.navigate('MyProfile')
  }
  const changeManage = () => {
    nav.navigate('ManageShop',{listShop: listShop})
  }
  const options = () => {
    setHide(true)
  }
  setTimeout(options, 3000)
  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('./assets/market.png')}
      />
      {hide ? <View style={styles.boxOptions}>
        <TouchableOpacity style={styles.btn} onPress={changeMyprofile}>
          <Text style={styles.text}>Thông tin cá nhân</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.mLeft]} onPress={changeManage}>
          <Text style={styles.text}>Quản lý người dùng</Text>
        </TouchableOpacity>
      </View> : <>
        <View style={styles.boxOptions}>
          <TouchableOpacity style={styles.btn2}>
            <Text style={styles.text}> </Text>
          </TouchableOpacity>
        </View>
      </>}
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B3E5FC',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tinyLogo: {
    width: 200,
    height: 200,
    marginBottom: 20
  },
  boxOptions: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  btn: {
    backgroundColor: '#FFA726',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn2: {
    borderRadius: 15,
    padding: 10,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20
  },
  mLeft: {
    marginLeft: 15,
  },
})