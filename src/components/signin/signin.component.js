import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, signInWithGoogle} from '../../firebase/firebase.utils';
import './signin.styles.scss';

class Signin extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		}
	}

	handleChange = (event) => {
		const {name, value} = event.target;
		this.setState({[name]: value})
	}

	handleSubmit = async event => {
		event.preventDefault();

		const { email, password } = this.state;

		try {
			await auth.signInWithEmailAndPassword(email, password);
			this.setState({email: '', password: ''});
		} catch (error) {
			console.log(error);
		}

		this.setState({email: '', password: ''})
	}

	render() {
		return (
			<div className='sign-in'>
				<h2>I already have an account</h2>
				<span>Sign in with your account</span>

				<form onSubmit={this.handleSubmit}>
					<FormInput 
					  name='email' 
					  type='email' 
					  value={this.state.email} 
					  handleChange={this.handleChange}
					  label="email"
					  required />
					<FormInput
					  name='password' 
					  type='password' 
					  value={this.state.password} 
					  handleChange={this.handleChange}					  
					  label="password"
					  required />
					<div className='button'>	
						<CustomButton type='submit'>Sign in</CustomButton>
						<CustomButton type='button'
									  onClick={signInWithGoogle} isGoogleSignIn>
									  Sign in with google
						</CustomButton>
					</div>						
				</form>	
			</div>
			)
	}
}

export default Signin;