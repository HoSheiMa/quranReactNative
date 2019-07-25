import React, { Component } from 'react'
import { View, Text, I18nManager} from 'react-native'
import { Scene, Router, ActionConst} from 'react-native-router-flux';
I18nManager.allowRTL(false);

import RNFetchBlob from "react-native-fetch-blob";
import { AsyncStorage } from 'react-native';

const fs = RNFetchBlob.fs;

console.disableYellowBox = true;


import Intro from './App/Intro';

import AppI from './App/App';

import ListTrans from './App/ListTrans';

import ShowTrans from './App/ShowTrans';


export default class App extends Component {

  componentDidMount() {
    // d = RNFetchBlob.fs.dirs.DocumentDir;
    // console.log('we work now here',d );

    // RNFetchBlob.fs.readFile(d + "/Quran_0.jpg", "base64").then(f => console.log("this in file", f)).catch(ee => console.log(ee))
    // RNFetchBlob.fs.createFile(d + "/xxx.txt", "Hello world", "" ).then(cd => {


    //   console.log("after created" ,cd)

    // }).catch(e => console.log(e));

  }
  render() {
    return (
      <Router>

        <Scene key="root">



          <Scene key="Intro" component={Intro} hideNavBar={true} type={ActionConst.RESET}></Scene>

          <Scene key="AppI"  component={AppI} hideNavBar={true} type={ActionConst.RESET} ></Scene>
        
        
          <Scene key="ListTrans"  component={ListTrans} hideNavBar={true} ></Scene>

          <Scene key="ShowTrans"  component={ShowTrans} hideNavBar={true} ></Scene>

      
        </Scene>
        
      </Router>
    )
  }
}
