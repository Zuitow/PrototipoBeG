import { NavigationContainer } from "@react-navigation/native"; //
import { createNativeStackNavigator } from "@react-navigation/native-stack"; //

//Páginas
import Home from "./src/pages/Home";
import Drinks from "./src/pages/Drinks";
import DrinksList from "./src/pages/DrinkList";
import DrinkDetails from "./src/pages/DrinkDetails";
import Profile from "./src/pages/Perfil";

// Importando "Comunicante" com o servidor BackEnd


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        {/* Define uma tela com o nome "Home" e associa o componente Home a ela. */}
        <Stack.Screen name="Drinks" component={Drinks} />
        {/* Define uma tela com o nome "Sobre" e associa o componente Sobre a ela. */}
        <Stack.Screen name="DrinksList" component={DrinksList} />
        {/* Define uma tela com o nome "Sobre" e associa o componente Sobre a ela. */}
        <Stack.Screen name="DrinkDetails" component={DrinkDetails} />
        {/* Define uma tela com o nome "Sobre" e associa o componente Sobre a ela. */}
        <Stack.Screen name="Profile" component={Profile} />
        {/* Define uma tela com o nome "Sobre" e associa o componente Sobre a ela. */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
