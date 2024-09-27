import React, { useContext, useEffect } from 'react';
import Routing from './Pages/Routing';
import { DataContext } from './Components/DataProvider/DataProvider';
import { Type } from './Utility/action.type.js';
import { auth } from './Utility/firebase.js';

// resume 2.7 - from start  :
function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          dispatch({
            type: Type.SET_USER,
            user: authUser
          });
        } else {
          dispatch({
            type: Type.SET_USER,
            user:null,
          });
        
      } 
    });
  }, []);

  return <Routing />;

}

export default App;