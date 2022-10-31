import React, {useEffect, useState} from 'react';
import {View, TextInput, Text, Button, FlatList} from 'react-native';
// Import the functions you need from the SDKs you need

import * as firebase from 'firebase/app';
import {getDatabase, onValue, ref, set} from 'firebase/database';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCt09GXyzGao6S7LqETxXJ7UFX4Gw-QK6U',
  authDomain: 'pam-proyecto-clase-2.firebaseapp.com',
  databaseURL: 'https://pam-proyecto-clase-2-default-rtdb.firebaseio.com',
  projectId: 'pam-proyecto-clase-2',
  storageBucket: 'pam-proyecto-clase-2.appspot.com',
  messagingSenderId: '704008722181',
  appId: '1:704008722181:web:30af3b2e24f5674413896c',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = getDatabase(app);

let personas = {};
const dbRef = ref(db, 'personas/');
onValue(dbRef, async snapshot => {
  personas = await snapshot.val();
  personas.shift();
  console.log(personas);
});
/*
let perros = {};
const dbRef2 = ref(db, 'perros/');
onValue(dbRef2, async snapshot => {
  perros = await snapshot.val();
  perros.shift();
  console.log(perros);
});
*/
const Screen = () => {
  const renderItem = ({item}) => <Text>{item.nombre}</Text>;
  const [nombrePersona, setNombrePersona] = useState('');
  const [nombrePerro, setNombrePerro] = useState('');
  const [rtData, setRtData] = useState([]);

  const CreatePersona = nombre => {
    let last = personas.length + 1;
    db = getDatabase();
    set(ref(db, 'personas/' + last), {
      id: last,
      nombre: nombre,
    });

    setNombrePersona('');
    console.log('Persona ' + nombre + ' agregada correctamente');
  };
  /*
  const CreatePerro = nombre => {
    //let last = perros.length + 1;
    const perroId = 1;
    db = getDatabase();
    set(ref(db, 'perros/' + perroId), {
      nombre: nombre,
    });

    setNombrePerro('');
    console.log('Perro ' + nombre + ' agregado correctamente');
  };
  */
  /*
        <TextInput
          placeholder="Ingrese nombre persona"
          onChangeText={text => setNombrePersona(text)}
        />

        <Button
          title="Crear persona"
          onPress={nombrePersona => CreatePersona(nombrePersona)}
        />

                <TextInput
          placeholder="Ingrese nombre perro"
          onChangeText={text => setNombrePerro(text)}
        />
        <Button
          title="Crear perro"
          onPress={nombrePerro => CreatePerro(nombrePerro)}
        />
                <FlatList
          style={{height: 100, borderWidth: 5}}
          keyExtractor={item => item.id}
          data={perros}
          renderItem={renderItem}
        />
         <FlatList
          style={{height: 100, borderWidth: 5}}
          keyExtractor={item => item.id}
          data={personas}
          renderItem={renderItem}
        /> */
  return (
    <View style={{flexDirection: 'column'}}>
      <Text style={{flex: 1, borderWidth: 5}}>PERSONAS</Text>
    </View>
  );
};

export default Screen;
