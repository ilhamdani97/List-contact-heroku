import React from "react";
import {Text, StyleSheet} from 'react-native';

interface Props {
    children:string;
}
const TextTitle = ({children=''}: Props) => {
    return  <Text style={styles.title}>{children}</Text>
}

export default TextTitle;

const styles = StyleSheet.create({
    container: {
      marginTop: 24
    },
    title: {
      fontSize: 16,
      fontWeight: '700',
      lineHeight: 24
    }
});