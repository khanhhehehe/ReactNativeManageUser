import { StyleSheet, Text, View, TextInput, Switch, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { API_SHOPS } from './api'
import * as ImagePicker from 'expo-image-picker'
import {API_UPDATEUSER} from './api'

const UpdateShop = (props) => {
    const nav = props.navigation
    const getShop = props.route.params.editItem;
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null)
    const [newnameShop, setnameShopNew] = useState(getShop.email)
    // const [newaddress, setaddressShopNew] = useState(getShop.address)
    const [newphoneNum, setphoneShopNew] = useState(getShop.name)
    const [newlogoShop, setLogo] = useState(getShop.logoShop)
    const changeUpdate = () => {
        if (checkForm()) {
            fetch(`${API_UPDATEUSER}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({idUpUser: getShop._id,emailRes: newnameShop,nameRes: newphoneNum})
                })
                .then((res) => nav.goBack())
                .catch((error) => { console.error(); })
        }
    }
    const checkForm = () => {
        if (!newnameShop || !newphoneNum) {
            Alert.alert('', 'Không được để trống dữ liệu', [
                {
                    text: 'OK', onPress: () => { }
                },
            ]);
            return false;
        }
        return true;

    }

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestCameraPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);
    const chooseImg = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setLogo(result.assets[0].uri);
        }
    }
    if (hasGalleryPermission === false) {
        return <Text>Cần cấp quyền truy cập thư viện ảnh</Text>
    }
    return (
        <View style={styles.containerUpdate}>
            <View style={{ flex: 1 }}>
                <TextInput
                    style={styles.inputUpdate}
                    onChangeText={(text) => { setnameShopNew(text) }}
                    value={newnameShop}
                    placeholder='Email'
                />
                <TextInput
                    style={styles.inputUpdate}
                    onChangeText={(text) => { setphoneShopNew(text) }}
                    value={newphoneNum}
                    placeholder='Họ và tên'
                />
                {/* <TextInput
                    style={styles.inputUpdate}
                    onChangeText={(text) => { setaddressShopNew(text) }}
                    value={newaddress}
                    placeholder='Password'
                /> */}
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <TouchableOpacity style={{ padding: 10, backgroundColor: '#2196F3' }} onPress={chooseImg}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>Thay ảnh người dùng</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.boxImgPre}>
                    {newlogoShop && <Image source={{ uri: newlogoShop }} style={styles.imgPreview} />}
                </View>
            </View>
            <View style={styles.boxSaveUpdate}>
                <TouchableOpacity style={styles.btnSaveUpdate} onPress={() => { changeUpdate() }}>
                    <Text style={styles.textSaveUpdate}>Lưu</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default UpdateShop

const styles = StyleSheet.create({
    containerUpdate: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#9575CD',
        flex: 1
    },
    inputUpdate: {
        marginVertical: 8,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#fff'
    },
    btnSaveUpdate: {
        borderRadius: 10,
        backgroundColor: '#CDDC39',
        padding: 10,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxSaveUpdate: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    textSaveUpdate: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
    },
    switch: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B2EBF2',
        paddingRight: 13,
        flexDirection: 'row'
    },
    textSwitch: {
        marginLeft: 12,
        color: '#01579B',
        fontSize: 20,
        fontWeight: 'bold',
    },
    boxSwitch: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10,
        marginBottom: 25
    },
    boxImgPre: {
        alignItems: 'center',
        justifyContent: 'center',
        padding:8,
        backgroundColor:'#fff'
    },
    imgPreview: {
        width: 200,
        height: 200
    },
})