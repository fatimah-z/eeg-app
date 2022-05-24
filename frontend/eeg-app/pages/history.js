import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View, Button} from 'react-native';
import { TextInput } from 'react-native-paper';

export default function history() {
    const[fname,setfname]= useState('')
  return (
    <View >
        <TextInput
        label = "FirstName"
        value = {fname}
        onChangeText={text=> setfname(text)}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  
});
