import React, { Component } from 'react'
import {View, ImageBackground, Dimensions, TouchableWithoutFeedback} from 'react-native'
import ImageZoom from 'react-native-image-pan-zoom';
import { _retrieveData } from './Functions'
import RNFetchBlob from "react-native-fetch-blob";
import { AsyncStorage } from 'react-native';

import Store from '../store/store';


const fs = RNFetchBlob.fs;

export default class Isiwper extends Component {

    state = {
        img : null,
    }


    componentWillMount() {
    d = RNFetchBlob.fs.dirs.DocumentDir;

    RNFetchBlob.fs.readFile(d + `/${this.props.IndexPage}.jpg`, "base64").then(f =>  {

                this.setState({
                  img:"data:image/jpeg;base64," + f,
                });
    
    }).catch(ee => console.log(ee))

      // old code but this code not work becaosue the image is very very big
      // _retrieveData(`${this.props.IndexPage}`).then((da) => {
      //   console.log(da, this.props.IndexPage);
        
      //       if (da[0] === true) {
      //           console.log('image found !');
      //         this.setState({
      //           img: da[1],
      //         }) 
      //         }
      //   //   return <Isiwper ImageUrl={da[1]} />;
            
      //     })
    }

    
  render() {
    console.log('create here ' + this.props.IndexPage)
    return (
      <View style={{
           flex: 1,
          //  justifyContent: 'center',
          //  alignItems: 'center',
           backgroundColor: '#9DD6EB',
      }}>
         {/* <ImageZoom onClick={
          
           
         }} pinchToZoom={true} cropWidth={Dimensions.get('window').width }
                        cropHeight={Dimensions.get('window').height  }
                        imageWidth={Dimensions.get('window').width   }
                        imageHeight={Dimensions.get('window').height }> */}
                        <TouchableWithoutFeedback onPress={
                          () => {

                        if (Store.getState().AppSetState.BottomToolsState == false) {
                          Store.getState().AppSetState.fadeInBottomTools.start();
                          Store.dispatch({
                          type: 'addState',
                          tag: 'BottomToolsState',
                          tagValue: true,
                        });

                        } else {

                          Store.getState().AppSetState.fadeOutBottomTools.start();

                          
                        Store.dispatch({
                        type: 'addState',
                        tag: 'BottomToolsState',
                        tagValue: false,
                        });


                        }}}>

              <ImageBackground style={{
                width:'100%',
                height:'100%',
              }} source={{uri: this.state.img == null ? '' : this.state.img }} /> 
                        </TouchableWithoutFeedback>
         {/* </ImageZoom> */}
        
      </View>
    )
  }
}
