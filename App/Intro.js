import React, { Component } from 'react'
import { View, Text,  Dimensions, ActivityIndicator, ImageBackground, AsyncStorage } from 'react-native'

fw = Dimensions.get('screen').width;
fh = Dimensions.get('screen').height;
import { Scene, Router, Actions} from 'react-native-router-flux';


import { IsQuranBookDownloaded, DownloadUrlImage, _storeData} from './helpers/Functions';
import { QuranLinks, QuranTrans } from './helpers/data';

import RNFetchBlob from "react-native-fetch-blob";

const fs = RNFetchBlob.fs;

export default class Intro extends Component {
  state = {
    downloadingQuran : false,
    downloading_Success: false,
    total_num : 0,
    total_num_success: 0,
  }
  
  componentWillMount() {



    if (this.props.downloadTransIndex == undefined) {

   

  
    


    IsQuranBookDownloaded().then((exist) => {
        if (exist == false) {

          this.setState({
            downloadingQuran: true,
            total_num: QuranLinks.length,
          });

          for (i in QuranLinks) {


            DownloadUrlImage(`Quran_${i}`, QuranLinks[i]).then(success => {
              console.log(`success downlaod : Quran_${i}`);


              if ((this.state.total_num_success + 1) == this.state.total_num) {


                _storeData('QuranExist', 'true').then(sv => {



                  if (sv == true) {

                    this.setState({
                      total_num_success: this.state.total_num_success + 1,
                      downloading_Success: true,
                      downloadingQuran: false,
                    })
    
    
    
                    setTimeout(() => {
                      Actions.AppI()
                    }, 600)
                    
                  
                  }


                })

             
              } else {

               this.setState({
                  total_num_success: this.state.total_num_success + 1,
                })
              }

            })

          }


        } else {
          

          setTimeout(() => {
            Actions.AppI()
          }, 600)
        }
    })

  } else {


    this.state.downloadLinks = QuranTrans[this.props.downloadTransIndex]

    RNFetchBlob.config({
      fileCache: true
    }).fetch("GET", `${this.state.downloadLinks["JsonImageControlDATA"]}`)
    // the image is now dowloaded to device's storage
    .then(resp => {
      return resp.text()
    }).then(rtext => {
      console.log(rtext);
      _storeData(`${this.state.downloadLinks["ControllName"]}`, rtext).then(controljson_downloaded => {
        if (controljson_downloaded== true) {


          RNFetchBlob.config({
            fileCache: true
          }).fetch("GET", `${this.state.downloadLinks["JsonImagesLinks"]}`)
          // the image is now dowloaded to device's storage
          .then(resp2 => {
            return resp2.json()
          }).then(rjson => {

            this.setState({
              downloadingQuran: true,
              total_num: rjson.length,
            });
  


              console.log(rjson, this.state.downloadLinks)
              for (i in rjson) {
                DownloadUrlImage(`${this.state.downloadLinks['IdNmae']}${i}`, rjson[i]).then(success => {

                  if ((this.state.total_num_success + 1) == this.state.total_num) {
    
    
                    _storeData(`${this.state.downloadLinks['IdExistName']}`, 'true').then(sv => {
    
    
                      if (sv == true) {
    
                        this.setState({
                          total_num_success: this.state.total_num_success + 1,
                          downloading_Success: true,
                          downloadingQuran: false,
                        })
        
        
        
                        setTimeout(() => {
                          Actions.AppI()
                        }, 600)
                        
                      
                      }
    
    
                    })
    
                 
                  } else {
    
                   this.setState({
                      total_num_success: this.state.total_num_success + 1,
                    })
                  }
    
                })
              }
            

          })

        }
      })
    })

    
  }


  }
  
  render() {
    return (
      <View style={{
          flex: 1,
      }}>

      <ImageBackground style={{
        width: '100%',
        heigh: '100%',
        flex: 1,
         justifyContent: 'flex-end',
      }}  source={require('../assets/logo.png')}>

      <View style={{
        width: fw,
        height: 100,

      }}>


        <ActivityIndicator size="large" color="red" />



      {this.state.downloadingQuran == true ? 
      <Text style={{
        textAlign: 'center',
        marginTop: 15,
      }}>Download {this.state.total_num_success } / {this.state.total_num}</Text>
       : <View></View>}
       {this.state.downloading_Success == true ? 
      <Text style={{
        textAlign: 'center',
        marginTop: 15,
        color: 'green'
      }}>Download Success</Text>
       : <View></View>}


      </View>
      </ImageBackground>

        
        
      </View>
    )
  }
}
