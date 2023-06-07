import React from 'react';
import {View, Image, StyleSheet, Text , TouchableOpacity, Dimensions } from 'react-native';
import Images from '../Images';

interface Props {
    image: string;
    name: string;
    age: string;
    onClickEdit: ()=> void;
    onClcikDelete: () => void;
}
const SCREEN_WIDTH = Dimensions.get('screen').width;
const CardProfile = ({
    image='',
    name='',
    age='',
    onClcikDelete = () => {},
    onClickEdit = () => {},
}: Props) => {
    
    return (
        <View style={styles.container}>
            <Images url={image}/>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subTitle}>{age} Tahun</Text>
            <TouchableOpacity onPress={onClcikDelete} style={styles.containerImageDelete}>
                <Image style={styles.imageAction} source={require('../../assets/image/deleteIcon.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClickEdit} style={styles.containerImageEdit}>
                <Image style={styles.imageAction} source={require('../../assets/image/penIcon.png')}/>
            </TouchableOpacity>
            
        </View>
    )
}

export default CardProfile;

const styles = StyleSheet.create({
    container: {
        width: (SCREEN_WIDTH - 32 ) / 2,
        height: 270,
        margin: 8,
        paddingBottom: 8,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#808080',
        borderRadius: 12
    },
    imageCard: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 24,
        marginTop: 8,
        marginLeft: 8
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 20,
        marginTop: 4,
        marginLeft: 8
    },
    containerImageDelete: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 16
    },
    containerImageEdit: {
        position: 'absolute',
        top: 0,
        right: 0,
        marginRight: 48,
        marginTop: 16
    },
    imageAction:{
        width: 20,
        height: 20
    }
});