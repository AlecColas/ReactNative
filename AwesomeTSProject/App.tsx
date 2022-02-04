/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};
// récupère les données brutes depuis le serveur
const getWeatherDataAsync = async (
  latitudeQuery: string,
  longitudeQuery: string,
) => {
  const longitude = parseFloat(longitudeQuery);
  const latitude = parseFloat(latitudeQuery);
  try {
    //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    const requestURL = 'http://api.openweathermap.org/data/2.5/weather?';
    const apiKey = 'd4ee1d5eb29009f743e4f5f7065d6797';
    console.log(
      `${requestURL}lat=${latitudeQuery}&lon=${longitudeQuery}&appid=${apiKey}`,
    );
    const response = await fetch(
      `${requestURL}lat=${latitudeQuery}&lon=${longitudeQuery}&appid=${apiKey}`,
    );

    const jsonResponse = await response.json();
    console.log(response);
    console.log(jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.log(error);
  }
  return;
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [latitude, setLatitude] = useState('37.3229978');
  const [longitude, setLongitude] = useState('-122.0321823');
  let jsonData;
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <TextInput
          style={{height: 40}}
          placeholder="Type the latitude here"
          onChangeText={newLatitude => setLatitude(newLatitude)}
          defaultValue={latitude}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Type the latitude here"
          onChangeText={newLongitude => setLongitude(newLongitude)}
          defaultValue={longitude}
        />
        <Button
          title="Search"
          onPress={() => {
            jsonData = getWeatherDataAsync(latitude, longitude);
          }}
        />

        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Summary">
            Edit <Text style={styles.highlight}>App.tsx</Text>{' '}
            {jsonData?.current?.weather?.description} to change this screen and
            then come back to see your edits.
          </Section>
          <Section title="Location"></Section>
          <Section title="Details"></Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
