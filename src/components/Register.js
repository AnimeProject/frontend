import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {reach} from 'yup'
import schema from '../validation/formSchema'
import { handleRegister } from '../store/actions/userActions'
import { useHistory } from 'react-router-dom'
import { MDBInput, MDBCard, MDBBtn } from 'mdb-react-ui-kit';

function Register(props) {
    const initialRegister = {username: '', password: ''}
    const [input, setInput] = useState(initialRegister)
    const [formErrors, setFormErrors] = useState(initialRegister)
    const [disabled, setDisabled] = useState(true);

    const { push } = useHistory();

    useEffect(() => {
        schema.isValid(input).then(valid => setDisabled(!valid))
      }, [input])

    useEffect(() => {
        if(props.isRegistered){
            push('/login')
        }
    },[props.isRegistered])

    // Form Fun
    const submitHandler = async (event) => {
        event.preventDefault()
        const newAccount = {
            username: input.username.trim(),
            password: input.password.trim(),
        }
        props.handleRegister(newAccount)
    }

    const validate = (name, value) => {
        reach(schema, name)
            .validate(value)
            .then(() => setFormErrors({...formErrors, [name]: '' }))
            .catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}))
    }

    const changeHandler = (event) => {
        const {name, value} = event.target;
        validate(name, value)
        setInput({...input, [name]: value})
    }
    
    return (
        <div className='d-flex justify-content-center align-self-center pt-3'>
            <MDBCard className='d-flex justify-content-center align-self-center'
            alignment='center' style={{width: '50rem', height: '50vh'}}>
                    <h2>Welcome to AniMenu!</h2>
                    <form alignment='center' style={{maxWidth: '100%'}}>
                        <MDBInput 
                            label='Username'
                            id='form1'
                            type='text'
                            name='username'
                            onChange={changeHandler}
                            value={input.username}
                        />
                        <div className = 'text-danger'>{formErrors.username}</div>
                        <br/>
                        <MDBInput 
                            label='Password'
                            id='form1'
                            type='text'
                            name='password'
                            onChange={changeHandler}
                            value={input.password}
                        />
                        <div className = 'text-danger'>{formErrors.password}</div>
                        <br/>
                        <MDBBtn disabled={disabled} onClick={submitHandler}>Submit</MDBBtn>
                    </form>
                    <br/>
                    <div className = 'text-danger'>
                        {props.errors}
                    </div>
            </MDBCard>
            </div>
    )
}

const mapStateToProps = (state) => {
    return{
        errors: state.authReducer.errors,
        isRegistered: state.authReducer.isRegistered
    }
}

export default connect(mapStateToProps, {handleRegister})(Register)
