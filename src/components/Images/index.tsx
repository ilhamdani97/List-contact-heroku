import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

interface Props {
    url: string;
}
const Images = ({
    url=''
}: Props) => {
    return (
        <View style={styles.container}>
            {url && url.includes('http') ? (
                <Image style={styles.imageCard} source={{uri: url}}/>
            ): (
                <Image style={styles.imageCard} source={require('../../assets/image/userIcon.png')}/>
            )}
            
        </View>
        
    )
}

export default Images;

const styles = StyleSheet.create({
    container: {
      padding: 8,
    },
    imageCard: {
        width: '100%',
        height: 180,
        borderRadius: 12,
        resizeMode: 'cover'
    }
});