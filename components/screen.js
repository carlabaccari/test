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

let personas = {};
let perros = {};

const Screen = () => {
  const renderItem = ({item}) => <Text>{item.nombre}</Text>;
  const [nombrePersona, setNombrePersona] = useState('');
  const [nombrePerro, setNombrePerro] = useState('');
  let db = getDatabase(app);
  useEffect(() => {
    let dbRef = ref(db, 'personas/');
    onValue(dbRef, async snapshot => {
      personas = await snapshot.val();
      personas.shift();
      console.log(personas);
    });
  }, [db]);

  useEffect(() => {
    let dbRef2 = ref(db, 'perros/');
    onValue(dbRef2, async snapshot => {
      perros = await snapshot.val();
      perros.shift();
      console.log(perros);
    });
  }, [db]);
  const CreatePersona = nombre => {
    let lastpersonas = personas.length + 1;
    db = getDatabase();
    set(ref(db, 'personas/' + lastpersonas), {
      id: lastpersonas,
      nombre: nombre,
    });

    //console.log('Persona ' + nombre + ' agregada correctamente');
  };

  const CreatePerro = nombre => {
    let lastperros = perros.length + 1;
    db = getDatabase();
    set(ref(db, 'perros/' + lastperros), {
      id: lastperros,
      nombre: nombre,
    });
    //console.log('Perro ' + nombre + ' agregado correctamente');
  };

  return (
    <View style={{flexDirection: 'column', height: '100%'}}>
      <View style={{flex: 1, borderWidth: 5, alignItems: 'center'}}>
        <Text>PERSONAS</Text>
        <TextInput
          style={{borderWidth: 5}}
          placeholder="Ingrese nombre persona"
          onChangeText={text => setNombrePersona(text)}
        />

        <Button
          title="Crear persona"
          onPress={() => CreatePersona(nombrePersona)}
        />
        <FlatList
          style={{height: 100, width: '100%', borderWidth: 2}}
          keyExtractor={item => item.id}
          data={personas}
          renderItem={renderItem}
        />
      </View>
      <View style={{flex: 1, borderWidth: 5, alignItems: 'center'}}>
        <Text>Perros</Text>
        <TextInput
          style={{borderWidth: 5}}
          placeholder="Ingrese nombre perro"
          onChangeText={text => setNombrePerro(text)}
        />
        <Button title="Crear perro" onPress={() => CreatePerro(nombrePerro)} />
        <FlatList
          style={{height: 100, width: '100%', borderWidth: 2}}
          keyExtractor={item => item.id}
          data={perros}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default Screen;
