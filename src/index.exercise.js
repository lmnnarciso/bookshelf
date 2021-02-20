// 🐨 you'll need to import React and ReactDOM up here

// 🐨 you'll also need to import the Logo component from './components/logo'

// 🐨 create an App component here and render the logo, the title ("Bookshelf"), a login button, and a register button.
// 🐨 for fun, you can add event handlers for both buttons to alert that the button was clicked

// 🐨 use ReactDOM to render the <App /> to the root element
// 💰 find the root element with: document.getElementById('root')
import React from "react";
import ReactDOM from "react-dom";
import {Logo} from "./components/logo"

import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";

import '@reach/dialog/styles.css'

const LoginForm = () => {
    return (
        <div>
            <form>
                <label htmlFor="username">
                    Username: 
                </label>
                <input name="username" type="username"/>
                <label htmlFor="password">
                    Password: 
                </label>
                <input name="password" type="password"/>
            </form>
        </div>
    )
}

const App = () => {

    const [showDialog, setShowDialog] = React.useState(false);
    const open = () => setShowDialog(true);
    const close = () => setShowDialog(false);
  

    return <div>
    <Dialog  isOpen={showDialog} onDismiss={close}>
    <LoginForm/>
      <button onClick={close}>Okay</button>
    </Dialog>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={open}>Login</button>
      </div>
      <div>
        <button onClick={() => alert('register clicked')}>Register</button>
      </div>
    </div>
}

ReactDOM.render(<App/>, document.getElementById("root"))