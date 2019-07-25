/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Dimensions, AsyncStorage, Text, View, ImageBackground, StyleSheet, I18nManager, TouchableWithoutFeedback} from 'react-native';
import RNFetchBlob from "react-native-fetch-blob";
const fs = RNFetchBlob.fs;
import Isiwper from './helpers/Siwper'

import Swiper from 'react-native-swiper';

import { _retrieveData, IsFound, _storeData } from './helpers/Functions'

import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import Store from './store/store';

I18nManager.allowRTL(false);

fw = Dimensions.get('screen').width;
fh = Dimensions.get('screen').height;




export default class ShowTrans extends Component {

  state = {
    initIndex : 0,
    star: false,
    activePageView: 0,
  }

  componentWillMount() {

    _retrieveData('Quran_trans_default').then(v => {


      if (v[0] == true) {

        if (v[1] == this.props.data_['IdExistName']) {

            this.setState({
              star: true
            })
          
        }

      }

      })


    _retrieveData(this.props.data_['ControllName']).then(d => {
      if (d[0] == true) {
        
        data = JSON.parse(d[1]);
        activeIn = Store.getState().AppSetState.activeIn;


        for (i in data) {
          // 0 from
          // 1 to
          // 2 go

          if (data[i][0] == activeIn ||
             data[i][0] < activeIn && data[i][1] > activeIn ||
              activeIn == data[i][1]) {

                // this.setState({
                //   initIndex :,
                // })

                this.refs.ScrollTo.scrollBy( data[i][2])
          }
        }
      }
    })

  }
  render() {
    return (
      <View style={{
        flex: 1,
      }}>
      

       <Swiper
       loop={false}

       onMomentumScrollEnd={(e,v,c) => {
         
         this.setState({
          activePageView :v['index']
         })
       
       }}
       ref='ScrollTo'
       index={this.state.initIndex}
        showsPagination={false} showsButtons={true}> 

        {
          [...Array(this.props.data_['size'])].map((d,v) => {
            if (this.state.activePageView == v ||
            (this.state.activePageView+1) == (v) ||
             (this.state.activePageView-1) == (v) ){


          return <Isiwper key={v} IndexPage={`${this.props.data_['IdNmae']}${v}`} />;
             } else {
              return <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>Loading...</Text>

              </View>;

             }

          })

          
        
        }
        

       </Swiper>
       

      
     <View style={{
       width: fw,
       height: 60,
       position: 'absolute',
       bottom: 15,
       flexDirection:'row',

       justifyContent :'center',
          alignItems: 'center',
     }}>

<TouchableWithoutFeedback onPress={
          () => {

            IsFound('Quran_trans_default').then(v => {


              if (v == null) {

                // go to list
                Actions.ListTrans();

              } else {
                Actions.ListTrans();

                // go to dirct default 
              }

            })



          }
        }>

       <View style={{
         width: 50,
         height: 50,
         margin: 2,
         borderRadius: 50,
         backgroundColor: '#fff',
         elevation: 3,
          justifyContent :'center',
          alignItems: 'center',
       }}> 

        <Icon
        
          name='book'
          type='font-awesome'
          color='#EC7084'/>

       </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={
          () => {

           
           Newv = this.state.star == false ? this.props.data_['IdExistName'] : null;
           Newd = !this.state.star;

              this.setState({
                star: Newd,
              })
           console.log(Newd, Newv)
            _storeData('Quran_trans_default', `${Newv}`).then((d) => {
              console.log(d);
            }).catch((e) => {
              console.log('error', e)
            })
          }
        }>

       <View style={{
         width: 50,
         height: 50,
         borderRadius: 50,
         margin: 2,

         backgroundColor: '#fff',
         elevation: 3,
          justifyContent :'center',
          alignItems: 'center',
       }}> 

        <Icon
        
          name='star'
          type='font-awesome'
          color={this.state.star == false? "#eee":"#6ED6D4"}/>

       </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={
          () => {
            Actions.AppI();

               



          }
        }>

       <View style={{
         width: 50,
         height: 50,
         borderRadius: 50,
         backgroundColor: '#fff',
         elevation: 3,
         margin: 2,

          justifyContent :'center',
          alignItems: 'center',
       }}> 

        <Icon
        
          name='arrow-right'
          type='font-awesome'
          color='#41343D'/>

       </View>
        </TouchableWithoutFeedback>
     </View>
      </View>
    );
  }
}

