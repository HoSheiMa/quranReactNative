/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Dimensions, AsyncStorage, Text, Animated, Easing, View,ScrollView, ImageBackground, StyleSheet, I18nManager, TouchableWithoutFeedback} from 'react-native';
import RNFetchBlob from "react-native-fetch-blob";
const fs = RNFetchBlob.fs;
import Isiwper from './helpers/Siwper'

import Swiper from 'react-native-swiper';

import { _retrieveData, IsFound, _storeData } from './helpers/Functions'

import { QuranTrans, pagenum, pagenumData} from './helpers/data';

import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import Store from './store/store';

I18nManager.allowRTL(false);

fw = Dimensions.get('screen').width;
fh = Dimensions.get('screen').height;



export default class AppI extends Component{

  state= {
    activePageView: 0,
    maxPages: 604,
    drawer : false,
    drawerTop : new Animated.Value(0 - fh),
    bottomTools: new Animated.Value(-55),
    bookmark1A: new Animated.Value(0),
    bookmark1B: new Animated.Value(0),
    bookmark2A: new Animated.Value(0),
    bookmark2B: new Animated.Value(0),
    
    bottomToolsShow: false,
    bookmarkToolsShow: false,
  }

  componentWillMount () {


    

  

    Store.dispatch({
      type: 'addState',
      tag: 'activeIn',
      tagValue: 0,
    })

   
    
    
  }
  
  
  componentDidMount() {

    
    this.state.drawerA = Animated.timing(this.state.drawerTop, {
      toValue: 0,
      easing: Easing.ease,
      duration: 600,
    })
    this.state.drawerB = Animated.timing(this.state.drawerTop, {
      toValue: 0 - fh,
      easing: Easing.ease,
      duration: 600,
    })


    this.state.toolsA = Animated.timing(this.state.bottomTools, {
      toValue: 15,
      easing: Easing.bounce,
      duration: 600,
    })

    this.state.toolsB = Animated.timing(this.state.bottomTools, {
      toValue: -55,
      easing: Easing.bounce,
      duration: 600,
    })


    Store.dispatch({
      type: 'addState',
      tag: 'BottomToolsState',
      tagValue: false,
    });

    
    Store.dispatch({
      type: 'addState',
      tag: 'fadeInBottomTools',
      tagValue: this.state.toolsA,
    });

    Store.dispatch({
      type: 'addState',
      tag: 'fadeOutBottomTools',
      tagValue: this.state.toolsB,
    });



    this.state.bookmark1Acontroll = Animated.timing(this.state.bookmark1A, {
      toValue:  -60,
      easing: Easing.bounce,
      duration: 600,
    })

    this.state.bookmark1Bcontroll = Animated.timing(this.state.bookmark1B, {
      toValue: 30 ,
      easing: Easing.bounce,
      duration: 600,
    })

    this.state.bookmark2Acontroll = Animated.timing(this.state.bookmark2A, {
      toValue: -60,
      easing: Easing.bounce,
      duration: 600,
    })

    this.state.bookmark2Bcontroll = Animated.timing(this.state.bookmark2B, {
      toValue: -30,
      easing: Easing.bounce,
      duration: 600,
    })

    this.state.bookmark1AcontrollC = Animated.timing(this.state.bookmark1A, {
      toValue:  0,
      easing: Easing.ease,
      duration: 300,
    })

    this.state.bookmark1BcontrollC = Animated.timing(this.state.bookmark1B, {
      toValue: 0 ,
      easing: Easing.ease,
      duration: 300,
    })

    this.state.bookmark2AcontrollC = Animated.timing(this.state.bookmark2A, {
      toValue: 0,
      easing: Easing.ease,
      duration: 300,
    })

    this.state.bookmark2BcontrollC = Animated.timing(this.state.bookmark2B, {
      toValue: 0,
      easing: Easing.ease,
      duration: 300,
    })


  }
  
    
  render() {
    return (

      <View style={{
        flex: 1,
         zIndex: 9999999,
      }}>
      
       <Swiper
       style={{
       }}
       ref="QuranIndex"


      //  buttonWrapperStyle={
      //   {backgroundColor: 'transparent', flexDirection: 'row', position: 'absolute', top: 0, left: 0, flex: 1, paddingHorizontal: 0, paddingVertical: 0, justifyContent: 'space-between', alignItems: 'center'}	
      //  }
      //  nextButton={
      //  <View style={{
      //    height: '100%',
      //    width: 40,
      //    backgroundColor: 'transparent',
      //  }}></View>
      //  }
      // prevButton={
      //   <View style={{
      //     height: '100%',
      //     width: 40,
      //     backgroundColor: 'transparent',
      //     }}>
      //   </View>
      //   }

        /** 
        this test buttoms
        */
      
       loop={false}
       onMomentumScrollEnd={(e,v,c) => {
         this.setState({
          activePageView :v['index']
         })
        //  console.log(e, v, c);

         Store.dispatch({
           type: 'addState',
           tag: 'activeIn',
           tagValue: v['index']
         })
       }}
        showsPagination={false} showsButtons={false}> 

        {
          // when user scroll the focus page will active & and page after it active too and page before it active too
          // to make scroll more smoth than active just focus page 
          [...Array(604)].map((d,v) => {
            if (this.state.activePageView == v ||
            (this.state.activePageView+1) == (v) ||
             (this.state.activePageView-1) == (v)
            ) {
              return <Isiwper key={v} IndexPage={`Quran_${v}`} />;
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
       

        <Animated.View style={{
          width: fw,
          position: 'absolute',
          bottom:this.state.bottomTools,
          flexDirection: 'row',          
          justifyContent :'center',
          alignItems: 'center',
          zIndex: 3,
        }}>


        <TouchableWithoutFeedback onPress={
          () => {

            _storeData('Quran_BookMark', Store.getState().AppSetState.activeIn  == null ? "0" : `${Store.getState().AppSetState.activeIn}` );
       
        }}>

       <View style={{
         width: 50,
         height: 50,
         zIndex: 99999,
         borderRadius: 50,
         backgroundColor: '#fff',
         elevation: 3,
       
        margin: 2,
         justifyContent :'center',
          alignItems: 'center',
       }}> 

        <Icon
        
          name='bookmark'
          type='font-awesome'
          color='red'/>

       </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={
          () => {
            console.log('Hello from here ')
            _retrieveData("Quran_BookMark").then(d => {
              console.log(d)
              this.refs.QuranIndex.scrollBy(d[0] == false ? 0 : parseInt (d[1]) )
              }) 
          }

        }
        >

       <View style={{
         width: 50,
         height: 50,
         zIndex: 99999,
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
          color='red'/>

       </View>
        </TouchableWithoutFeedback>


        
<TouchableWithoutFeedback onPress={
          () => {

            
            IsFound('Quran_trans_default').then(v => {


              console.log(v);
              if (v == null || v == "null") {

                // go to list
                Actions.ListTrans();

              } else {
              

              for (i in QuranTrans) {
                if (QuranTrans[i]['IdExistName'] == v) {
                  Actions.ShowTrans({
                    data_: QuranTrans[i],
                  })
                }
              }
                

                // go to dirct default 
              }

              })

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
        
          name='book'
          type='font-awesome'
          color='#EC7084'/>

       </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {
          this.state.drawerA.start()
        }}>
        

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
        
          name='list'
          type='font-awesome'
          color='#41343D'/>

       </View>
       </TouchableWithoutFeedback>

        </Animated.View>

        <Animated.View style={{
          flex : 1,
          zIndex: 6,
          height: fh,
          width: fw,
          position: 'absolute',
          left: 0,
          top: this.state.drawerTop ,
          backgroundColor: '#FFF',
          alignItems: 'center',
        }}>

<Text style={{
          fontSize: 22,
          marginTop: 20,
        }}>فهرس</Text>
        <Text style={{
          fontSize: 13,
          marginBottom: 20,
        }}>Index</Text>
<ScrollView style={{
  height: fh * .8,
  maxHeight: fh * .8
}}>

        { pagenum.map((d, i) => {

          {/* console.log(d); */}
          return  <TouchableWithoutFeedback onPress={() => {
            this.refs.QuranIndex.scrollBy(d - 1)

              this.state.drawerB.start();
          }}>

           <View style={{
            width: fw,
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderColor: '#eee',
            padding: 8,
            flexDirection: 'row'
          }}>
              <Icon
        
        name='arrow-left'
        type='font-awesome'
        color='#41343D'/>

          <View>
          <Text style={{
              fontSize: 19,
            }}>{pagenumData[i][4]}</Text>
              <Text style={{
              fontSize: 13,
            }}>{pagenumData[i][5]}</Text>
          </View>

          </View>
          </TouchableWithoutFeedback>

        }) }
</ScrollView>

        <View style={{
          width: fw,
          justifyContent: 'center',
        }}>
          <Icon
          
          size={32}
          name='close'
          onPress={() => {
            this.state.drawerB.start()
          }}
          type='font-awesome'
          color='#EC7084'/>
        </View>

        </Animated.View>

      </View>

    );
  }
}

