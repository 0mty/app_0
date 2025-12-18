import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [screen, setScreen] = useState("start");
  const [pot, setPot] = useState(0);
  const [player1Data, setPlayer1Data] = useState(null);
  const [resultInfo, setResultInfo] = useState(null);

  const handleStart = () => {
    setPot(0);
    setPlayer1Data(null);
    setResultInfo(null);
    setScreen("p1");
  };

  const handleP1Submit = (data) => {
    const potAfterP1 = (pot ?? 0) + data.bet;
    const p1 = { ...data, pot: potAfterP1 };
    setPlayer1Data(p1);
    setPot(potAfterP1);
    setScreen("p2");
  };

  const handleP2Submit = (p2data) => {
    const potAfterP2 = (player1Data?.pot ?? 0) + p2data.bet;
    const sum = (player1Data.bootsoo || 0) + (p2data.bootsoo || 0);
    const p1Correct = player1Data.guess === sum;
    const p2Correct = p2data.guess === sum;

    if (p1Correct && !p2Correct) {
      setResultInfo({ winner: 1, pot: potAfterP2, sum });
      setScreen("result");
    } else if (p2Correct && !p1Correct) {
      setResultInfo({ winner: 2, pot: potAfterP2, sum });
      setScreen("result");
    } else {
      setPot(potAfterP2);
      setPlayer1Data(null);
      setScreen("p1");
    }
  };

  const handlePlayAgain = () => {
    setPot(0);
    setPlayer1Data(null);
    setResultInfo(null);
    setScreen("start");
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
