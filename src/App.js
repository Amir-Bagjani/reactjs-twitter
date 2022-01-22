import { Switch, Route, Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useStyle } from './hooks/useStyle'
//components
import RightSidebar from "./components/RightSidebar";
import LeftSidebar from "./components/LeftSidebar";
import TweetsByUser from "./pages/tweetsByUser/TweetsByUser";
import HomePage from "./pages/home/HomePage";
import TweetHashTagPage from "./pages/tweetByHashtag/TweetHashTagPage";
import NotFound from "./components/NotFound";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";

//styles
import "./App.css";

function App() {
  const { user, authIsReady } = useAuthContext();
  const { showR, showL, closeModal } = useStyle()
  return (
    <div className="App">
      {authIsReady && (
        <>
        {(showR || showL) && <div onClick={()=>closeModal()} className="backDrop"></div>}
          {user && (
            <div style={{ transform: showL ? `translateX(0)`: null}} className="left">
              <LeftSidebar />
            </div>
          )}
          <div className="center">
            <Switch>
              <Route exact path="/">
                {user ? <HomePage /> : <Redirect to="/login" />}
              </Route>
              <Route path="/hashtags/:hashtag">
                {user ? <TweetHashTagPage /> : <Redirect to="/login" />}
              </Route>
              <Route path="/users/:user/:id">
                {user ? <TweetsByUser /> : <Redirect to="/login" />}
              </Route>
              <Route path="/login">
                {user ? <Redirect to="/" /> : <LoginPage />}
              </Route>
              <Route path="/signup">
                {user ? <Redirect to="/" /> : <SignupPage />}
              </Route>
              <Route path="*">
                {user ? <NotFound /> : <Redirect to="/login" />}
              </Route>
            </Switch>
          </div>
          {user && (
            <div style={{ transform: showR ? `translateY(0)`: null}}  className="right ">
              <RightSidebar />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
