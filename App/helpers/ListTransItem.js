import React, {Component} from 'react';
import {Dimensions, AsyncStorage, Text,ScrollView , View, ImageBackground, StyleSheet, I18nManager, TouchableWithoutFeedback} from 'react-native';
import RNFetchBlob from "react-native-fetch-blob";
const fs = RNFetchBlob.fs;

import { _retrieveData, IsFound, _storeData } from './Functions'


import { Icon } from 'react-native-elements'

import { Actions } from 'react-native-router-flux';


export default class ListTransItem extends Component {

    state= {
        downloaded: false,
        loading: true,
    }

    componentWillMount() {
        console.log(this.props)
        vi = Store.getState().AppSetState.Quran_trans_default;

        IsFound(this.props.data_['IdExistName']).then(v => {

            console.log(v);
        
            if (v != null) {

                    console.log('dde', vi)
                    if (vi != null) {


                        this.setState({
                            downloaded: true,
                            loading: false,
                        })
                    } else {
                        if (vi == this.props.data_['IdNmae'] ) {
                            this.setState({
                                downloaded: true,
                            loading: false,

                            })
                        } else {
                            this.setState({
                                downloaded: true,
                            loading: false,

                            })
                        }
                    }


            

            } else {
                this.setState({
                    downloaded: false,
                    loading: false,
                })

            }
        });      
    }


    
  render() {
    return (

             <TouchableWithoutFeedback onPress={() => {
                  this.state.downloaded == true ? 
                    Actions.ShowTrans(this.props)
                  : ''
             }}>
         <View style={{
            margin: 10,
            alignItems: 'center',
            alignContent: 'space-between',
            flexDirection: 'row',
            justifyContent: 'space-between'

        }}>
            <Text style={{
                fontSize: 16,

            }}>{this.props.data_['Title']}</Text>

            {
                this.state.loading == false ?
                <View style={{
                flexDirection: 'row',
            }}>

{
                    this.state.downloaded == true ? 
                    <View style={{
                    margin: 2,

                }}>

<Icon
                    name='eye'
                    type='font-awesome'
                    color={  '#EC7084'}
                     />
                </View> :
                <View></View>
                }

                {
                    this.state.downloaded == false ? 
                    <View style={{
                    margin: 2,

                }}>

<Icon
                    name='download'
                    type='font-awesome'
                    color='#aaa'
                    onPress={() => {
                        Actions.Intro({
                            downloadTransIndex: this.props.___Index_,
                        })
                    }} />
                </View> :
                <View></View>
                }
            </View>
            : <View><Text>Loading...</Text></View>
            }
        </View>
        </TouchableWithoutFeedback>
   
    )
  }
}
