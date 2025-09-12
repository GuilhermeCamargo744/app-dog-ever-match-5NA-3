import axios from 'axios';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export interface Welcome {
    image:       string[];
    id:          number;
    name:        string;
    description: string;
    years:       number;
    contact:     string;
    address:     string;
    gender:      Gender;
    size:        Size;
    createdAt:   Date | null;
    updatedAt:   Date | null;
}

export enum Gender {
    Fêmea = "Fêmea",
    Macho = "Macho",
    Masculino = "Masculino",
}

export enum Size {
    Grande = "Grande",
    Médio = "Médio",
    Pequeno = "Pequeno",
}


export const Home = () => {
    const [valueApi, setValueApi] = useState<Welcome[]>([])

    const requestApi = async () => {
        await axios.get('http://localhost:3000/dogs/getAllDogs').then((resp) => {
            console.log('RESPOSTA DA API', resp)
            setValueApi(resp.data)
        })
    }

    useEffect(() => {
        requestApi()
    }, [])

    console.log("valueApi[0]?.image[0]", valueApi[0]?.image[0])

    return (
        <View style={style.container}>
            <TouchableOpacity style={style.content}>
                <Image
                  source={{uri: valueApi[0]?.image[0]}} 
                  style={{
                    height: '90%',
                    width: '90%',
                    backgroundColor:'red'
                  }}
                  resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        height: '70%',
        width: '80%',
        backgroundColor: '#FFA500',
        alignItems: 'center',
        justifyContent: 'center'
    }
})