import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import SignIn from './components/auth/SignIn'
import SuperAdminSignIn from './components/auth/SuperAdminSignIn'
import CreateAdmin from './components/auth/CreateAdmin'
import SignUp from './components/auth/SignUp'
import Content from './components/dashboard/Content'
import LandingPage from './components/pages/LandingPage'
import Dashboard from './components/dashboard/Dashboard'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import EditProfile from './components/profile/EditProfile'
import CreateProfile from './components/profile/CreateProfile'
import PreviewProfileView from './components/profile/PreviewProfileView'
import PublicViewProfile from './components/profile/PublicViewProfile'
import Fireapp from './config/firebaseConfig'
import UpdateTopic from './components/content/UpdateTopic'
import UpdateDeliverable from './components/content/UpdateDeliverable'
import UpdateVideo from './components/content/UpdateVideo'

function App() {
  const auth = Fireapp.auth().currentUser
  return (

    <BrowserRouter>
    <div className="App">
      <Navbar/>
      <Footer/>
      <Switch>
        <Route exact path='/' component = {LandingPage}/>
        <Route path='/signin' component = {SignIn}/>
        <Route path='/signup' component = {SignUp}/>
        <Route exact path='/profiles' component = {Dashboard}/>
        <Route path='/createprofile' component = {CreateProfile}/>
        <Route path='/profile/:name/:id' component = {PublicViewProfile}/>
        <Route path='/editprofile/:name/:id' component = {EditProfile}/>
        <Route path='/generatedProfile/:name/:id' component = {PreviewProfileView}/>
        <Route path='/content' component = {Content}/>
        <Route path='/topic/:id' component = {UpdateTopic}/>
        <Route path='/deliverable/:id' component = {UpdateDeliverable}/>
        <Route path='/video/:id' component = {UpdateVideo}/>
        <Route path='/superadminsignin' component = {SuperAdminSignIn}/>
        <Route path='/createadmin' component = {CreateAdmin}/>

      </Switch>
    </div>
    </BrowserRouter>

  );
}

export default App;
