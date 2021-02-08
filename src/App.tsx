import React from "react";

import { BrowserRouter as Router } from "react-router-dom";

import RootRouter from "./router";
import CalendarProvider from "./context/Calendar/CalendarProvider";
import CreateEventProvider from "./context/CreateEvent/CreateEventProvider";
import InitAppProvider from "./context/InitAppProvider";
import Footer from "./atoms/Footer";
import GoogleSignInProvider from "./context/GoogleSignInContext/GoogleSignInProvider";

const App = () => (
  <>
    <Router>
      <GoogleSignInProvider>
        <InitAppProvider>
          <CreateEventProvider>
            <CalendarProvider>
              <RootRouter />
            </CalendarProvider>
          </CreateEventProvider>
          <Footer />
        </InitAppProvider>
      </GoogleSignInProvider>
    </Router>
  </>
);

export default App;
