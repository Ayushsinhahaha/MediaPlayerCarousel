import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {songs} from './src/data';
import Controller from './src/Controller';
import TrackPlayer, {Capability} from 'react-native-track-player';

const {width, height} = Dimensions.get('window');

const App = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function toggle() {
    if (isPlaying) {
      setIsPlaying(false);
      TrackPlayer.pause();
    } else {
      setIsPlaying(true);
      TrackPlayer.play();
    }
  }

  useEffect(() => {
    setUpTrackPlayer();
    return () => {
      // TrackPlayer.destroy;
    };
  }, []);

  const setUpTrackPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      TrackPlayer.updateOptions({
        capabilities: [Capability.Play, Capability.Pause],
      });
      await TrackPlayer.add([{url: require('./assets/songs/ColdMess.mp3')}]);
    } catch (error) {
      console.log(error);
    }
  };

  const slider = useRef(null);

  useEffect(() => {
    scrollX.addListener(({value}) => {
      // console.log('scroll x', value / width);
      const index = Math.round(value / width);
      setIndex(index);
      console.log(index);
    });
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={styles.container}>
        <Image source={item.image} style={styles.image} />
      </View>
    );
  };

  const goNext = () => {
    slider.current.scrollToOffset({
      offset: (index + 1) * width,
    });
  };
  const goPrev = () => {
    slider.current.scrollToOffset({
      offset: (index - 1) * width,
    });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <SafeAreaView>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={songs}
          ref={slider}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
        />
      </SafeAreaView>
      <View style={{marginTop: 50}}>
        <Text style={styles.titleSong}>{songs[index].title}</Text>
        <Text style={styles.title}>{songs[index].artist}</Text>
      </View>
      <Controller
        onNext={goNext}
        onPrev={goPrev}
        playPauseIcon={isPlaying ? 'pause-circle' : 'play'}
        playPause={() => {
          toggle();
        }}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: 300,
  },
  container: {
    alignItems: 'center',
    width: width,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
  },
  titleSong: {
    textAlign: 'center',
    fontSize: 36,
    fontWeight: '900',
  },
});
