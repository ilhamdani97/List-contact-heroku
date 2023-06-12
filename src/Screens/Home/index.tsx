import React, { useEffect, useState } from 'react';
import {ActivityIndicator, Alert, Button, Dimensions, FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { CardAdd, CardProfile} from '../../components';
import { deletDataUser, editDataUser, getDataUser, getDetailUser, postDataUsers } from '../../services';
import Modal from "react-native-modal";
import { useDispatch, useSelector } from 'react-redux';
import { setListUser } from '../../redux/actions/list';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const Home = () => {
    const dispatch = useDispatch();
    const dataList = useSelector((store: any) => store.listUser);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [disableButton, setDisableButton] = useState<boolean>(false);
    const [dataEdit, setDataEdit] = useState<dataProps>({
        id: '',
        firstName: '',
        lastName: '',
        age: '',
        photo: ''
    })

    const handleGetData = async () => {
        const response = await getDataUser();
        dispatch(setListUser(response.data))

    }
    type dataProps = {
        id: string;
        firstName: string;
        lastName: string;
        age: string;
        photo: string;
    }
    const checkValidate = () => {
        const ageNumber  = parseInt(age);
        if(firstName && lastName && age && image) 
            setDisableButton(false)
        else setDisableButton(true);

        if(dataEdit.id) {
            if(dataEdit.lastName === lastName && 
                dataEdit.firstName === firstName && 
                dataEdit.age === ageNumber.toString() &&
                dataEdit.photo === image) {
                
                setDisableButton(true);
            } else setDisableButton(false)
        }
            
    }

    const resetData = () => {
        setFirstName('');
        setLastName('');
        setAge('');
        setImage('');
        setDataEdit({
            id: '',
            firstName: '',
            lastName: '',
            age: '',
            photo: ''
        })
    }

    const postDataUser = async () => {
        const payload = {
            firstName: firstName,
            lastName: lastName,
            age: parseInt(age),
            photo: image
          }
        const response = await postDataUsers(payload)
        if(response) {
            Alert.alert('Berhasil Menyimpan Data', 'Anda Berhasil Menyimpan Data', [
                {
                    text: 'OK',
                    onPress: () => {
                        setShowModal(false)
                        handleGetData();
                        resetData();
                    }
                }
            ])
        }

        else 
            Alert.alert('Gagal Menyimpan Data', 'Anda Gagal Menyimpan Data', [
                {
                    text: 'OK'
                }
            ])
    }

    const handleEditData = async (id: string) => {
        const response = await getDetailUser(id)
        const payload = await response.data;
        setDataEdit(payload);
        setShowModal(true);
    }

    const handleEditDataSave = async(id: string) => {
        const payload = {
            firstName: firstName,
            lastName: lastName,
            age: parseInt(age),
            photo: image
          }
        const response = await editDataUser(id,payload)
        if(response) {
            Alert.alert('Berhasil Edit Data', 'Anda Berhasil Edit Data', [
                {
                    text: 'OK',
                    onPress: () => {
                        setShowModal(false)
                        handleGetData();
                        resetData();
                    }
                }
            ])
        }

        else 
            Alert.alert('Gagal Edit Data', 'Anda Gagal Edit Data', [
                {
                    text: 'OK'
                }
            ])
    }

    const handleDeleteData = async (id: string) => {
        const response = await deletDataUser(id);

        if(response)
            Alert.alert('Berhasil Menghapus Data', 'Anda Berhasil Menghapus Data', [
                {
                    text: 'OK',
                    onPress: () => {
                        handleGetData();
                    }
                }
            ])
        else 
            Alert.alert('Gagal Menghapus Data', 'Anda Gagal Menghapus Data', [
                {
                    text: 'OK'
                }
            ])
    }

    useEffect(() => {
        handleGetData();
    },[])

    useEffect(() => {
        checkValidate();
    },[firstName, lastName, age, image]);

    useEffect(()=> {
        setFirstName(dataEdit.firstName);
        setLastName(dataEdit.lastName);
        setAge(dataEdit.age ? dataEdit.age.toString() : '');
        setImage(dataEdit.photo);
    }, [dataEdit])
    
    type ItemProps = {
        id: string;
        firstName: string;
        lastName: string;
        age: string;
        image: string;
    }

    
    const RenderItem = ({
        id,
        firstName,
        lastName,
        age,
        image
    }: ItemProps) => (
        <CardProfile
            name={`${firstName} ${lastName}`}
            age={age}
            image={image}
            onClcikDelete={() => handleDeleteData(id)}
            onClickEdit={() => handleEditData(id)}
        />
    )

    const RenderEmpty = () => (
        <View style={[styles.containerEmpty, styles.horizontal]}>
            <ActivityIndicator size="large" />
        </View>
    )

    return (
        <SafeAreaView>
                {dataList && (
                    <CardAdd onClick={()=> setShowModal(true)}/>
                )}
               <FlatList
                    style={{marginBottom: 160}}
                    data={dataList.listUser}
                    columnWrapperStyle={styles.rowList}
                    renderItem={({item}) => <RenderItem id={item.id} firstName={item.firstName} lastName={item.lastName} age={item.age} image={item.photo}/>}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    ListEmptyComponent={RenderEmpty()}
                />

            <View>
                <Modal isVisible={showModal}>
                    <View style={styles.contentModal}>
                        <View style={styles.containerHeaderModal}>
                            <Text style={styles.titleModal}>Data User</Text>
                            <TouchableOpacity onPress={()=> setShowModal(false)}>
                                <Image style={styles.imageClose} source={require('../../assets/image/closeIcon.png')}/>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={styles.input}
                            onChangeText={setFirstName}
                            value={firstName}
                            placeholder="First Name"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setLastName}
                            value={lastName}
                            placeholder="Last Name"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setAge}
                            value={age}
                            placeholder="Age"
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setImage}
                            value={image}
                            placeholder="Url Image"
                        />
                        <View style={styles.buttonModal}>
                            <Button
                                title="Save"
                                onPress={() => dataEdit.id ? handleEditDataSave(dataEdit.id) : postDataUser()}
                                disabled={disableButton}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
                
        </SafeAreaView>
    );
};
 
export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    rowList: {
        flex: 1,
        justifyContent: 'space-between',
    },
    containerEmpty: {
        flex: 1,
        marginTop: '60%',
        justifyContent: 'center',
      },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    contentModal: {
        backgroundColor: '#fff',
        width: SCREEN_WIDTH - 38,
        padding: 16,
        paddingBottom: 32,
        borderRadius: 12
    },
    containerHeaderModal: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    titleModal: {
        fontSize: 18,
        fontWeight: '600'
    },
    imageClose: {
        width: 18,
        height: 18,
        marginTop: 4
    },
    input: {
        height: 44,
        marginTop: 16,
        borderWidth: 1,
        padding: 10,
        borderRadius: 12
    },
    buttonModal: {
        borderRadius: 12,
        marginTop: 24
    }
})