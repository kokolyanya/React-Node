import React, {Component} from 'react';
import './NewAccount.css';

class NewAccount extends Component {
  state={
    userName:"",
    email:"",
    password:"",
    password2:""

  }
  onChange=(event)=>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit=(e)=>{
    e.preventDefault();
    const requeteOption={
      method:'POST',
      body: JSON.stringify({userName:this.state.userName, email:this.state.email, password:this.state.password, password2:this.state.password2})
    }
    fetch("http://localhost:8081/signup",requeteOption)
    .then(reponse=>reponse.json())
    .then(data=>{
      if(data.success){
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
  render() {
    return (
      <div className='NewAccount'>
        <form className='InputUser' method="post" onSubmit={(e)=>{this.handleSubmit(e)}}>
          <h1>New user</h1>
          <input className='InputText' placeholder='Enter your username' type='text' required name='userName' onChange={ (event)=>{this.onChange(event)}}/>
          <input className='InputText' placeholder='Enter your e-mail address' type='email' required name='email' onChange={ (event)=>{this.onChange(event)}}/>
          <input className='InputText' placeholder='Enter your password' type='password' required name='password' onChange={ (event)=>{this.onChange(event)}}/>
          <input className='InputText' placeholder='Confirm your password' type='password' required name='password2' onChange={ (event)=>{this.onChange(event)}}/>
          <div className='Submit'>
            <a className='Cancel' href='/signin' >CANCEL</a>
            <button className='SignUp' type='submit'>SIGN UP</button>
          </div>
			  </form>
      </div>
    );
  }
}

export default NewAccount;

