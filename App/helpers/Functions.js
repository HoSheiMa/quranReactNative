




/**
 * 
 *  Quran System
 *  QuranExist = false || true
 *  Quran_1..2..3..4..5..6..7..8..9..etc
 *  Quran_Page_Contect_1..2..3..4..5..6..7..8..9..etc
 *  Quran_trans_default = "null" or "IdName"
 *  Quran_BookMark
 * 
*/

import RNFetchBlob from "react-native-fetch-blob";
import { AsyncStorage } from 'react-native';

const fs = RNFetchBlob.fs;



export const IsQuranBookDownloaded = async () => { 



    try {
        const value = await AsyncStorage.getItem('QuranExist');
        if (value === null || value == false || value == "false") {
         
         
            return false;
        } else {
            return true;

        }
      } catch (error) {
        // Error retrieving data
      }


    // return false || true

}


export const IsFound = async (Name) => { 



  try {
      const value = await AsyncStorage.getItem(Name);
      return value;
    } catch (error) {
      // Error retrieving data
    }


  // return false || true

}


export const _retrieveData = async (Tag) => {
  try {
    const value = await AsyncStorage.getItem(Tag);
    if (value === null || value == false || value == "false") {
      return [false, value];
    } else {
      return [true, value];
    }
  } catch (error) {
    // Error retrieving data
  }
};


export const _storeData = async (tag, value) => {
    try {
      await AsyncStorage.setItem(tag, value);
      console.log('Done store it');
      return true;
    } catch (error) {
      console.log('error store it');

      // Error saving data
        console.log(error)
        return [false, error];
    }
  };


export const _storeData_file = async (tag, value) => {
  
  
  try{

     d = RNFetchBlob.fs.dirs.DocumentDir;
    console.log('we work now here',d );

    RNFetchBlob.fs.createFile(d + `/${tag}.jpg`, value, "base64" ).then(cd => {


      // RNFetchBlob.fs.readFile(d + "/xxx.txt", "base64").then(f => console.log("this in file", f)).catch(ee => console.log(ee))
      
      console.log('Caching as downloaded!');

      _storeData(tag, 'Downloaded');

      console.log(`after created ${tag}.jpg` ,cd)

    }).catch(e => console.log(e))

  }  catch (error) {
    console.log('error store it');

    // Error saving data
      console.log(error)
      return [false, error];
  }
}


export const DownloadUrlImage = async (nameCache, url)  => {


    // console.log('Here2')

    return _retrieveData(nameCache).then((d) => {
      if (d[0] == false) {

      return RNFetchBlob.config({
        fileCache: true
      }).fetch("GET", `${url}`)
      // the image is now dowloaded to device's storage
      .then(resp => {
        // the image path you can use it directly with Image component
        imagePath = resp.path();
        console.log(imagePath)
        return resp.readFile("base64");
      })
      .then(base64Data => {
        // here's base64 encoded image

        // rimg = "data:image/jpeg;base64," + base64Data;
         rimg = base64Data;

        
        // console.log("source : ",rimg);

        // remove the file from storage
        _storeData_file(nameCache, rimg);
        
        fs.unlink(imagePath);


        return true;

      });
    } else {
      console.log('We Found it downloaded before!');

      return true;
    }
  });

}