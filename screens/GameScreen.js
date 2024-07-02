import { StyleSheet, Text, View, Alert, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import ComputerNumber from '../components/ComputerNumber';
import CustomButton from '../components/CustomButton';
import { AntDesign } from '@expo/vector-icons';
import ComputerGuess from '../components/ComputerGuess';
let minNumber = 1;
let maxNumber = 100;

export default function GameScreen({ userNumber, onGaveOver }) {
  const initialGuess = generateNumber(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessCounts, setGuessCounts] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGaveOver(guessCounts.length);
    }
  }, [currentGuess, userNumber, onGaveOver]);

  useEffect(() => {
    minNumber = 1;
    maxNumber = 100;
  }, []);

  function nextGuesssHandler(direction) {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert('Hadi Oradan!', 'Yanlış olduğunu bile bile basıyorsun!...', [
        { text: 'Tamam', style: 'cancel' },
      ]);
      return;
    }

    if (direction === 'lower') {
      maxNumber = currentGuess;
    } else {
      minNumber = currentGuess + 1;
    }
    const newRandomNumber = generateNumber(minNumber, maxNumber, currentGuess);
    setCurrentGuess(newRandomNumber);
    setGuessCounts((prevGuess) => [newRandomNumber, ...prevGuess]);
  }

  function generateNumber(min, max, exclude) {
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;

    if (randomNumber === exclude) {
      return randomNumber(min, max, exclude);
    } else {
      return randomNumber;
    }
  }
  return (
    <View style={styles.container}>
      <Title>Bilgisayar Tahmini</Title>
      <ComputerNumber>{currentGuess}</ComputerNumber>
      <View style={styles.card}>
        <Text style={styles.title}>Altında mı üstünde mi?</Text>
        <View style={styles.buttonsContainer}>
          <CustomButton onPress={nextGuesssHandler.bind(this, 'lower')}>
            <AntDesign name="minus" size={24} color="white" />
          </CustomButton>
          <CustomButton onPress={nextGuesssHandler.bind(this, 'greater')}>
            <AntDesign name="plus" size={24} color="white" />
          </CustomButton>
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={guessCounts}
          keyExtractor={(itemData) => itemData}
          renderItem={(itemData) => (
            <ComputerGuess
              roundNumber={guessCounts.length - itemData.index}
              guess={itemData.item}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  title: {
    color: 'white',
    fontSize: 25,
    marginBottom: 15,
  },
  card: {
    backgroundColor: 'orange',
    padding: 16,
    marginTop: 20,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
    marginTop: 10,
  },
});
