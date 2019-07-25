import React, {Component} from 'react';
import {Dimensions, AsyncStorage, Text,ScrollView , View, ImageBackground, StyleSheet, I18nManager, TouchableWithoutFeedback} from 'react-native';
import RNFetchBlob from "react-native-fetch-blob";
const fs = RNFetchBlob.fs;


import { _retrieveData, IsFound } from './helpers/Functions'

import { QuranTrans } from './helpers/data';


import ListTransItem from './helpers/ListTransItem'

import { Actions } from 'react-native-router-flux';


import Store from './store/store';




I18nManager.allowRTL(false);

fw = Dimensions.get('screen').width;
fh = Dimensions.get('screen').height;


export default class ListTrans extends Component {

// componentWillMount() {
//     IsFound("Quran_trans_default").then(vi => {

//         console.log('we found here', vi)

//         Store.dispatch({
//             type: 'addState',
//             tag: "Quran_trans_default",
//             tagValue: vi,
//         })

//         Store.dispatch({
//             type: 'addState',
//             tag: "ListTransRefrest",
//             tagValue: this.ListTransRefrest,
//         })


//     })
// }


    render() {
    return (
      <ScrollView style={{
          flex : 1,
      }}>

      <View style={{
          alignItems: 'center',
          marginTop: 25,
      }}>
            <Text style={{
                fontSize: 22,
            }}>List of Translate Quran</Text>
      </View>


      <View>

          {QuranTrans.map( (d, i) => {

         
           return <ListTransItem key={i} data_={d} ___Index_={i} />

          })}
      </View>



        
      </ScrollView>
    )
  }
}
