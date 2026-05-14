import { Provider } from "react-redux";
import store from "@/store";
import AppNavigator from "@/navigation";

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
      
    </Provider>
  );
};

export default App;