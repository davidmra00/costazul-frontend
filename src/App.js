import AppRouter from "./routers/AppRouter";
import store from "./store/store";
import {Provider} from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {
  return (
    <div className="App u-body u-xl-mode">
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
