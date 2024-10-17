import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';

const Controller = ({onNext, onPrev}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrev}>
        <IonIcon name="play-skip-back" size={45} />
      </TouchableOpacity>
      <TouchableOpacity>
        <IonIcon name="pause-circle" size={45} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onNext}>
        <IonIcon name="play-skip-forward" size={45} />
      </TouchableOpacity>
    </View>
  );
};

export default Controller;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});
