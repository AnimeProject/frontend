import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {handleLogin, getUserData, resetRegister} from '../store/actions/userActions'
import { useHistory } from 'react-router-dom'
import { MDBInput, MDBCard, MDBBtn, MDBSpinner } from 'mdb-react-ui-kit';

function Login(props) {
    const initialLogin = {username: '', password: ''}
    const [input, setInput] = useState(initialLogin)
    const {push} = useHistory()
    
    useEffect(() => {
        props.resetRegister();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // useEffect(() => {
    //     if(props.isLoggedIn){
    //         props.getUserData(props.id)
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[props.isLoggedIn])

    useEffect(() => {
        if(props.isLoggedIn){
            push('/dashboard')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.isLoggedIn])
    
    // Form fun
    const submitHandler = (event) => {
        event.preventDefault()
        props.handleLogin(input)
        setInput(initialLogin)
    }

    const changeHandler = (event) => {
        const {name, value} = event.target;
        setInput({...input, [name]: value})
    }
    return (
        <div className='d-flex justify-content-center align-self-center pt-3'>
            <MDBCard className='d-flex justify-content-center align-self-center'
            alignment='center' style={{width: '50rem', height: '50vh'}}>
                    <h2>Login Below</h2>
                    <form alignment='center' style={{maxWidth: '100%'}}>
                        <MDBInput 
                            label='Username'
                            type='text'
                            name='username'
                            onChange={changeHandler}
                            value={input.username}
                        />
                        <br/>
                        <MDBInput 
                            label='Password'
                            type='password'
                            name='password'
                            onChange={changeHandler}
                            value={input.password}
                        />
                        <br/>
                        <MDBBtn onClick={submitHandler}>Submit</MDBBtn>
                    </form>
                    <br/>
                    <p>Don't have an account? <Link to = '/register'>Sign Up Here</Link></p>
                    <div className = 'text-danger'>
                        {props.errors}
                    </div>
                    <p className = 'text-warning'>I'm currently using the free version of Heroku, so your first time logging in may take a little long due to servers starting.</p>
                    {props.loading && 
                        <div className='d-flex justify-content-center'>
                            <MDBSpinner alignment='center' role='status'>
                                <span className='visually-hidden'>Loading...</span>
                            </MDBSpinner>
                        </div>
                    }
            </MDBCard>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        isLoggedIn: state.authReducer.isLoggedIn,
        userFetched: state.authReducer.userFetched,
        loading: state.authReducer.loading,
        errors: state.authReducer.errors,
        id: state.authReducer.user.user_id
    }
}

export default connect(mapStateToProps, {handleLogin, getUserData, resetRegister})(Login)