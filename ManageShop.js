import { FlatList, StyleSheet, Text, TouchableOpacity, View, Alert, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { API_SHOPS } from './api'
import { API_DELETE } from './api'
import { useIsFocused } from '@react-navigation/native'
import axios from 'axios'

const ManageShop = (props) => {
    const nav = props.navigation;
    const isFocus = useIsFocused()
    const [isLoading, setLoading] = useState(true)
    const [listShop, setlistShop] = useState([])
    const aniLoading = () => {
        return <ActivityIndicator style={styles.boxAll} size={'large'} />
    }
    const getShops = async () => {
        await fetch(API_SHOPS)
            .then(res => res.json())
            .then(data => {
                setlistShop(data)
                setLoading(false)
                console.log("---------------------------------------");
                console.log(data);
            })
    }
    useEffect(() => {
        getShops();
    }, [isFocus]);
    const deleteShop = (deleteId) => {
        Alert.alert('Xóa', 'Bạn chắc chắn muốn xóa không?', [
            {
                text: 'Cancel',
                onPress: () => { },
            },
            {
                text: 'OK', onPress: () => {
                    fetch(`${API_DELETE}/?userNum=${deleteId}`, { method: 'GET' }).then(res => { getShops() })
                }
            },
        ]);
    }
    const changeUpdateShop = (editItem) => {
        nav.navigate('UpdateShop', { editItem })
    }
    const changeAddShop = () => {
        nav.navigate('AddShop')
    }
    const itemDetail = (itemId) => {
        const itemTemp = listShop[itemId - 1]
        Alert.alert('Thông tin chi tiết cửa hàng', "Cửa hàng: " + itemTemp.nameShop + "\nĐịa chỉ: " + itemTemp.address + "\nSố điện thoại: " + itemTemp.phoneNum + `\nTrạng thái: ${itemTemp.statusShop ? 'Đang hoạt động' : 'Tạm đóng cửa'}`, [
            {
                text: 'OK', onPress: () => { }
            },
        ]);
    }
    function getImageSource(item) {
        return  require('./assets/user.png');
    }
    return (
        <View style={styles.container}>
            <View style={styles.boxAll}>
                {isLoading ? aniLoading() :
                    <FlatList data={listShop}
                        renderItem={({ item }) => <>
                            <TouchableOpacity style={styles.boxItem} onPress={() => itemDetail(item._id)}>
                                <Image
                                    style={styles.imgItem}
                                    source={getImageSource(item)} />
                                <View>
                                    <Text style={styles.text}>{item.name}</Text>
                                    <Text style={styles.textNum}>{item.email}</Text>
                                    {/* <Text style={styles.textNum2}>{item.name}</Text> */}
                                    <View style={styles.boxSetting}>
                                        <TouchableOpacity onPress={() => changeUpdateShop(item)}>
                                            <Image
                                                style={styles.fix}
                                                source={require('./assets/setting.png')} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => deleteShop(item._id)}>
                                            <Image
                                                style={styles.fix}
                                                source={require('./assets/delete.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </>}
                        keyExtractor={(item) => item._id} />}
            </View>
            <TouchableOpacity onPress={changeAddShop}>
                <Image
                    style={styles.add}
                    source={require('./assets/plus.png')} />
            </TouchableOpacity>
        </View>
    )
}
export default ManageShop

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        flex: 1
    },

    imgItem: {
        height: 80,
        width: 80,
        marginRight: 10
    },
    boxItem: {
        flexDirection: 'row',
        backgroundColor: '#303F9F',
        padding: 10,
        borderRadius: 10,
        marginBottom: 15
    },
    text: {
        color: '#fff',
        fontSize: 27,
        fontWeight: 'bold',
    },
    textNum: {
        color: '#fff',
        fontSize: 19,
        fontWeight: '700'
    },
    textNum2: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700'
    },
    statusChecked: {
        width: 17,
        height: 17,
        backgroundColor: '#00E676',
        borderRadius: 10,
        marginRight: 5
    },
    statusNChecked: {
        width: 17,
        height: 17,
        backgroundColor: '#FF5252',
        borderRadius: 10,
        marginRight: 5
    },
    boxStatus: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    fix: {
        width: 24,
        height: 24,
        marginLeft: 10
    },
    boxSetting: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '85%'
    },
    add: {
        width: 50,
        height: 50
    },
    boxAll: {
        flex: 1
    },
    txtDetail: {
        fontSize: 20
    }
})