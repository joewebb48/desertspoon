import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {userLoggedIn} from '../ducks/reducer'
import {Link} from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';


class Register extends Component {
    constructor(){
        super()

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            calorieGoal: '',
            error: ''
        }
    }
    handleChange = e => {
        let {name, value} = e.target
        this.setState({
            [name]: value
        })
    }
    
    handleKeyPress = (event) => {
        if(event.key==="Enter"){
            axios.post('/auth/register', this.state).then(response => {
                console.log(1111111, response)
                let user = response.data
                this.props.userLoggedIn(user)
            }).catch(error => {
                console.log(error.response)
                toast.error('email already exists')
            })
        }
    }

    handleRegister = () => {
        axios.post('/auth/register', this.state).then(response => {
            console.log(1111111, response)
            let user = response.data
            this.props.userLoggedIn(user)
        }).catch(error => {
            console.log(error.response)
            toast.error('email already exists, or invalid')
        })
    }
    

    
    render(){
        return(
            <div className="login-component">
                
                <Header/>

                <section className="login-container">
                    <div className="user-pass">
                        <div className="group">
                            <input value={this.state.firstName} onChange={this.handleChange} onKeyPress={this.handleKeyPress} type="text" name="firstName" required/>
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Firstname</label>
                        </div> 
                        <div className="group">
                            <input value={this.state.lastName} onChange={this.handleChange} onKeyPress={this.handleKeyPress} type="text" name="lastName" required/>
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Lastname</label>
                        </div> 
                        <div className="group">
                            <input value={this.state.email} onChange={this.handleChange} onKeyPress={this.handleKeyPress} type="email" name="email" required/>
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>E-mail</label>
                        </div>

                        <div className="group">
                            <input value={this.state.password} onChange={this.handleChange} onKeyPress={this.handleKeyPress} type="password" name="password" required/>
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Password</label>
                        </div>
                        <div className="group">
                            <input value={this.state.calorieGoal} onChange={this.handleChange} onKeyPress={this.handleKeyPress}  type="text" name="calorieGoal" required/>
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Daily calorie goal</label>
                        </div>
                        
                    </div>

                    <div className="register-buttons">
                        
                        <button className="cart-button" onClick={this.handleRegister}>Register</button>
                        <Link to="/login"><button className="cart-button">Back</button></Link>
                        {this.state.error}
                    </div>
                </section>

            
            </div>

        )
            



   
}
}

function mapStateToProps(state){
    let {isAuthenticated} = state
    return{
        isAuthenticated
    }
}


export default connect(mapStateToProps, {userLoggedIn})(Register)