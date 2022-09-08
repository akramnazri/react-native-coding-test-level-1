import {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable, Modal } from 'react-native';
import * as Yup from "yup";
import { Formik } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';

const ContactUs = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
// this is for validation
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email.")
      .required("Email must be provided."),
    username: Yup.string()
      .required("Username must be provided.")
      .max(50, "Must in 50 letter only")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    birthdate: Yup.date()
      .max(new Date(),"Please select the past date")
      .required("birthdate must be provided.")
  });

  
  return (
    <View style={styles.container}>
        <Formik
            initialValues={{ email: '',username: '', birthdate: new Date() }}
            validationSchema={schema}
            onSubmit={() => setModalVisible(!modalVisible)}
        >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, isValid }) => (
        <>

            <Text style={styles.label}>Username :</Text>
            <TextInput
                name="username"
                placeholder="Username"
                style = {styles.textInput}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                
            />
            {(errors.username && touched.username) &&
            <Text style={{ fontSize: 10, color: 'red' }}>{errors.username}</Text>
            }

            <Text style={styles.label}>Email :</Text>   
            <TextInput
                name="email"
                placeholder="Email"
                style = {styles.textInput}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                
            />
            {(errors.email && touched.email) &&
            <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
            }

         
            <Text style={styles.label}>Date of Birth :</Text>
            <DateTimePicker
                style={styles.datePicker}
                mode={'date'}
                display='default'
                value={values.birthdate}
                onChange={(val) =>
                    setFieldValue("birthdate",new Date(val.nativeEvent.timestamp))}
            />
            {(errors.birthdate && touched.birthdate) &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.birthdate}</Text>
            }       

            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Username : {values.username}</Text>
                            <Text style={styles.modalText}>Email : {values.email}</Text>
                            <Text style={styles.modalText}>Birthdate : {new Date(values.birthdate).toDateString()}</Text>
                            <Pressable
                                style={[styles.buttonModal, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                                >
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}  >
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            
        </>
        )}
    </Formik>
   </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        marginTop: '20%',
        alignItems: 'center',
        alignSelf:'center',
        backgroundColor: 'white',
        padding: 10,
        elevation: 10,
        backgroundColor: '#e6e6e6',
        borderRadius: 10
      },
    textInput: {
      height: 40,
      width: '100%',
      margin: 10,
      backgroundColor: 'white',
      borderColor: 'gray',
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 10,
    },
    datePicker: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        height: 60,
        display: 'flex',
      },
    label: {
        marginTop: 20,  
        alignSelf: 'flex-start'
    },
    button: {
        backgroundColor: '#82CAFF',
        alignItems: 'center',
        color: '#fff',
        height: 40,
        margin:10,
        width:'60%', 
        borderRadius:10

    },
    buttonText:{
        margin :10,
        elevation: 10,
       
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonModal: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#FD1C03",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
  })

export default ContactUs;