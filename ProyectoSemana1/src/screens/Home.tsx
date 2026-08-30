import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { RootStackParamList } from "../navigation/StackNavigator";

type HomeProps = NativeStackScreenProps<RootStackParamList, "HomeScreen">;

export default function Home({ route, navigation }: HomeProps) {
const { email } = route.params;

return (
  <View style={styles.container}>
    <Text style={styles.title}>
      Bienvenido, {email}
    </Text>

    <Button
      title="Ver demostración de useEffect"
      onPress={() => navigation.navigate("UseEffectScreen")}
    />
  </View>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: "center",
justifyContent: "center",
padding: 20,
},

title: {
fontSize: 20,
marginBottom: 25,
},
});
