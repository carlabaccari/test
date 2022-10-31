import React, {useEffect, useState} from 'react';
import {View, TextInput, Text, Button, FlatList} from 'react-native';
import { firebase } from '@react-native-firebase/database';
import database from '@react-native-firebase/database';

//import { getDatabase, ref, set } from "firebase/database";
import styles from './screen_style.js';



//await database().goOffline();

const reference = firebase
  .app()
  .database('https://pam-proyecto-clase-2-default-rtdb.firebaseio.com/')
  .ref('/users/123');

//const personas = database().ref('https://pam-proyecto-clase-2-default-rtdb.firebaseio.com');
//const perros = getDatabase().ref('/perro/');
/*const Persona = {
  name: 'Persona',
  properties: {
    id: 'int',
    nombre: 'string',
  },
};

const Perro = {
  name: 'Perro',
  properties: {
    id: 'int',
    nombre: 'string',
  },
};
*/
const Screen = () => {
  const renderItem = ({item}) => <Text>{item.nombre}</Text>;
  const [nombrePersona, setNombrePersona] = useState('');
  const [nombrePerro, setNombrePerro] = useState('');
  const [rtData, setRtData] = useState([]);

  const CreatePersona = nombre => {
    let last = personas.length + 1;
    database()
      .ref('/persona/' + last)
      .set({
        id: last,
        nombre: nombre,
      });
    setNombrePersona('');
    console.log('Persona ' + nombre + ' agregada correctamente');
  };
  const CreatePerro = nombre => {
    let last = perros.length + 1;
    database()
      .ref('/perro/' + last)
      .set({
        id: last,
        nombre: nombre,
      });
    setNombrePerro('');
    console.log('Perro ' + nombre + ' agregado correctamente');
  };

  return (
    <View style={styles.container1}>
      <View style={styles.container2}>
        <Text style={styles.text1}>PERSONAS</Text>
        <TextInput
          placeholder="Ingrese nombre persona"
          style={styles.text1}
          onChangeText={text => setNombrePersona(text)}
        />

        <Button
          title="Crear persona"
          style={styles.text1}
          onPress={nombrePersona => CreatePersona(nombrePersona)}
        />
        <View style={styles.container3}>
          <FlatList
            style={styles.flatlist1}
            keyExtractor={item => item.id}
            data={personas}
            renderItem={renderItem}
          />
        </View>
      </View>
      <View style={styles.container2}>
        <Text style={styles.text1}>PERROS</Text>
        <TextInput
          placeholder="Ingrese nombre perro"
          style={styles.text1}
          onChangeText={text => setNombrePerro(text)}
        />
        <Button
          title="Crear perro"
          style={styles.text1}
          onPress={nombrePerro => CreatePerro(nombrePerro)}
        />
        <View style={styles.container3}>
          <FlatList
            style={styles.flatlist1}
            keyExtractor={item => item.id}
            data={perros}
            renderItem={renderItem}
          />
        </View>
      </View>
    </View>
  );
};

export default Screen;
