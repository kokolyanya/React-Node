import React, {Component} from 'react';
import './AddUser.css';

class AddUser extends Component {
  constructor(props){
    super(props);
    this.state={
      group:"",
      id:"",
      userName:"",
      email:"",
      password:"",
      password2:""
  
    }
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
      body: JSON.stringify({group:this.state.group, id:this.state.id, userName:this.state.userName, email:this.state.email, password:this.state.password, password2:this.state.password2})
    }
    fetch("http://localhost:8081/addUser",requeteOption)
    .then(reponse=>reponse.json())
    .then(data=>{
      if(data.success){
        this.props.cacher();
        this.props.nouveau();
      }
    })
    .catch((err)=>{
      alert("error"+err.message)
    })
  }
  render(){
    return (
        <form className="InputUser" method="post" onSubmit={(e)=>{this.handleSubmit(e)}}> 
        <div className="Group"> 
          Group :  
        <select className="InputGroup" name="group" id="pays" required onChange={ (event)=>{this.onChange(event)}}>
          <option value="">-- Choisir group --</option>
          <option value="G1">Group1</option>
          <option value="G2">Group2</option>
          <option value="G3">Group3</option>
        </select>
          {/* ID : <input className="InputNumber" placeholder="ID" type="number" required name='id' onChange={ (event)=>{this.onChange(event)}}/>  */}
        </div> 
        <input className="InputText" placeholder="Enter your username" type="text" required name='userName' onChange={ (event)=>{this.onChange(event)}}/>
        <input className="InputText" placeholder="Enter your e-mail address" type="email" required name='email' onChange={ (event)=>{this.onChange(event)}}/> 
        <input className="InputText" placeholder="Enter your password" type="password" required name='password' onChange={ (event)=>{this.onChange(event)}}/> 
        <input className="InputText" placeholder="Confirm your password" type="password" required name='password2' onChange={ (event)=>{this.onChange(event)}}/> 
        <div className="Submit"> 
          <button className="cancel" onClick={this.props.cacher}>CANCEL</button> 
          <button className="ok" type='submit'>ADD</button> 
        </div> 
      </form>
    );
  }
    
}

export default AddUser;