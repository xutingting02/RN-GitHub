import React, {useEffect, useState, useLayoutEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
TextInput,
Platform
} from 'react-native';

import { NativeModules } from 'react-native';
const ASPECT_X="2";
const ASPECT_Y="1";
const Crop =  NativeModules.ImageCrop;

const screenW = Dimensions.get('window').width;

const ImageCrop = () => {
  const [result, setResult] = useState('');

  const [aspectX, setAspectX] = useState(ASPECT_X);
  const [aspectY, setAspectY] = useState(ASPECT_Y);

  const changeX = (x) => setAspectX(x);
  const changeY = (y) => setAspectY(y);

  const handleSelectCrop = () => {
        // let x=this.aspectX?this.aspectX:ASPECT_X;
        // let y=this.aspectY?this.aspectY:ASPECT_Y;
        console.log(aspectX)
        console.log(aspectY)
        Crop.selectWithCrop(parseInt(aspectX),parseInt(aspectY)).then(res=> {
            console.log(res);
            setResult(res['imageUrl']?res['imageUrl']:res)
        }).catch(e=> {6
            setResult(e);
        });
    }

    let imgUrl =Platform.OS==='android'? 'file:///' + result:result;
    let imageView=result===""?null:
        <Image
            resizeMode='contain'
            style={{height: 200,width:200}}
            source={{uri: imgUrl}}/>

  return (
    <View style={styles.container}>
        <View
            style={styles.row}
        >
            <Text>宽:</Text>
            <TextInput
                style={styles.input}
                defaultValue={ASPECT_X}
                onChangeText={(x) => changeX(x)}
            />
            <Text>比 高:</Text>
            <TextInput
                style={styles.input}
                defaultValue={ASPECT_Y}
                onChangeText={(y) => changeY(y)}
            />
            <Text
                onPress={()=> handleSelectCrop()}
            >裁切图片</Text>

        </View>
        <Text>{imgUrl}</Text>
        {imageView}
    </View>
  );
};

export default ImageCrop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f2f2',
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  line: {
    flex: 1,
    height: 0.3,
    backgroundColor: 'darkgray',
  },
  item: {
    width: screenW / 2 - 2,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 5,
  },
});