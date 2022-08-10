import React, {Component} from 'react';
import './SignIn.css';

class SignIn extends Component {
  constructor(props){
    super(props);
    this.state={
      username:"",
      password:""
    }
  }
  
  handleSubmit=(e)=>{
    e.preventDefault();
    const requeteOption={
      method:'POST',
      body: JSON.stringify({username:this.state.username, password:this.state.password})
    }
    let nom=this.state.username;
    fetch("http://localhost:8081/signin",requeteOption)
    .then(reponse=>reponse.json())
    .then(data=>{
      if(data.find){
        this.props.changeName(nom);
        this.props.connection('/connected')   /*connection est un attribut dans App.js*/
      }
    })
    .catch((err)=>{
      alert("error"+err.message)
    })
    this.inputUsername.value="" /* nettoyage */
    this.inputPassword.value="" /* nettoyage */
    this.setState({             /* nettoyage */
      username:"",
      password:""
    })
  }

  onChange=(event)=>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render(){
    return (
    <div className='SignIn'>
            <form className='App-header' onSubmit={(e)=>{this.handleSubmit(e)}}>
                <h1 className='Titre1'>Welcome to your application !!!</h1>
                <input placeholder='Username' type='text' name="username" required onChange={ (event)=>{this.onChange(event)}} ref={el => this.inputUsername = el}/> 
                {/* on donne un attribut name pour pouvoir l'utiliser dans la fonction onChange() */}
                {/* ref donne un autre nom a l'element, ici inputUsername, on peut l'utiliser dans handleSubmit */}
                <input placeholder='Password' type='password' required name="password" onChange={ (event)=>{this.onChange(event)}} ref={el => this.inputPassword = el}/>
                <a href="/">Forgot password</a>
                <button className='signIn btn' type='submit'>SIGN IN</button>
                <p>or</p><a href='/signup' className='createAccount btn'>CREATE AN ACCOUNT</a>
          </form>
    </div>
    );
  }
}

export default SignIn;

