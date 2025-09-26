import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import {style} from './styles'
import AntDesign from '@expo/vector-icons/AntDesign';

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
    const [match, setMatch] = useState([])
    const [showMatch, setShowMatch] = useState(false)

    const requestApi = async () => {
        await axios.get('http://localhost:3000/dogs/getAllDogs').then((resp) => {
            console.log('RESPOSTA DA API', resp)
            setValueApi(resp.data)
        })
    }

    useEffect(() => {
        requestApi()
    }, [])

    const handlePressNo = () => {
        setValueApi((prevState) => prevState.slice(1))
    }

    const handlePressYes = () => {
        setMatch((prevMatch) => [...prevMatch, valueApi[0]])
        setValueApi((prevState) => prevState.slice(1))
    }


    return (
        <View style={style.container}>
            {
                showMatch ? 
                <>
                    <FlatList
                        data={match}
                        renderItem={({item})=> {
                            return (
                                <Image
                                    source={{uri: item?.image[0]}} 
                                    style={{
                                        height: 200,
                                        width: 200,
                                        backgroundColor:'red'
                                    }}
                                    resizeMode='contain'
                                />
                            )
                        }}
                    />
                </> 
                : 
                <>
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
                    <View style={style.contentButton}>
                        <TouchableOpacity onPress={handlePressNo} style={style.buttonNo}>
                            <AntDesign name="close" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handlePressYes} style={style.buttonYes}>
                            <AntDesign name="heart" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </>
            }
            <Button
                title='Ver matchs'
                onPress={() => setShowMatch(!showMatch)}
            />
        </View>
    )
}

