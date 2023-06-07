import React from 'react';
import {View, Image, StyleSheet, Text , TouchableOpacity } from 'react-native';

interface Props {
    onClick: ()=> void
}
const CardAdd = ({
    onClick= ()=> {}
}: Props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onClick}>
            <Image style={styles.imagePlus} source={require('../../assets/image/plusIcon.png')}/>
        </TouchableOpacity>
    )
}

export default CardAdd;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        margin: 8,
        height: 64,
        paddingBottom: 8,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#808080',
        borderRadius: 12
    },
    imagePlus: {
        marginTop: 4,
        width: 40,
        height: 40
    }
})
