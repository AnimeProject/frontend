import {connect} from 'react-redux';
import {useState, useEffect} from 'react';
import {updateAnime, deleteAnime, fetchUserAnime} from '../store/actions/userActions'
import { MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBCardTitle, MDBBtn, MDBIcon, MDBSpinner} from 'mdb-react-ui-kit';
import schema from '../validation/postUpdateSchema'
import {reach} from 'yup'

function ListEntry({userAnimes, idx, user, updateAnime, deleteAnime, fetchUserAnime}) {
    // Form Values 
    const initialState = {
        user_id: 0,
        anime_id: 0,
        completed: 0,
        rating: user.animes[idx].rating,
    }
    const [formValues, setFormValues] = useState(initialState)
    const [formErrors, setFormErrors] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [editing, setEditing] = useState(false)


    useEffect(() => {
        fetchUserAnime(user.animes[idx].anime_id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        schema.isValid(formValues).then(valid => setDisabled(!valid))
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [formValues])

    // Form fun
    const onChange = (event) => {
        const {name, value} = event.target;
        validate(name, value)
        setFormValues({...formValues, [name]: value})
    }

    const validate = (name, value) => {
        reach(schema, name)
            .validate(value)
            .then(() => setFormErrors({...formErrors, [name]: '' }))
            .catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}))
    }

    // Onclicks for buttons
    const update = (event) => {
        event.preventDefault()
        const newAnime = {
            user_id: user.user_id,
            anime_id: user.animes[idx].anime_id,
            completed: parseInt(formValues.completed),
            rating: parseInt(formValues.rating),
            idx: idx,
        }
        updateAnime(user.animes[idx].list_id, newAnime);
        edit()
    }

    const edit = () => {
        const value = !editing
        setEditing(value)
    }
    const del = () => {
        deleteAnime(user.animes[idx].list_id, user.animes[idx].anime_id)
    }

    return(
        <div className='p-3 d-flex justify-content-center'>
            {userAnimes.length !== user.animes.length ? 
                <div className='text-center'>
                    <MDBSpinner role='status'>
                        <span className='visually-hidden'>Fetching Anime...</span>
                    </MDBSpinner>
                </div> 
                : 
                <MDBCard className='border' style={{ maxWidth: '80%' }} alignment='center'>
                <MDBRow className='g0'>
                    <MDBCol md='2'>
                        <MDBCardImage src={userAnimes[idx].image_url} alt='...' fluid />
                    </MDBCol>
                    <MDBCol md='10'>
                    <MDBCardBody>
                        <MDBCardTitle>
                            {userAnimes[idx].title}
                        </MDBCardTitle>
                        <MDBCardText>
                            {userAnimes[idx].synopsis}
                        </MDBCardText>
                        {editing 
                            ? <form> 
                                <label>Completed:</label>
                                <select name='completed' onChange={onChange} value={formValues.completed}>
                                    <option value='1'>Yes</option>
                                    <option value='0'>No</option>
                                </select>
                                <label>Rating:</label>
                                <input 
                                    placeholder={user.animes[idx].rating}
                                    name='rating' 
                                    onChange={onChange} 
                                    value={formValues.rating}
                                />
                                <MDBBtn disabled={disabled} className='mx-3' onClick={update}>
                                    Update
                                </MDBBtn>
                                <MDBIcon 
                                    fas icon="undo" 
                                    onClick={edit} 
                                    style={{cursor: 'pointer'}}
                                />
                                <p className='text-danger'>{formErrors.rating}</p>
                            </form>
                            : <div className='d-inline-flex'>
                                <h4 className='mx-2'>Completed: {user.animes[idx].completed === 1 ? <>Yes</> : <>No</>}</h4>
                                <h4 className='mx-2'>Rating: {user.animes[idx].rating}</h4>
                                <MDBIcon 
                                    className='m-1'
                                    far icon="edit" 
                                    onClick = {edit} 
                                    size='lg'
                                    color='primary'
                                    style={{cursor: 'pointer'}}
                                />
                                <MDBIcon 
                                    className='m-1'
                                    far icon="trash-alt" 
                                    onClick = {del} 
                                    size='lg'
                                    style={{cursor: 'pointer'}}
                                />
                            </div>
                            }
                        </MDBCardBody>
                    </MDBCol>
                </MDBRow>
            </MDBCard>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userAnimes: state.authReducer.userAnimes,
        user: state.authReducer.user,
        loading: state.authReducer.loading,
    }
}

export default connect(mapStateToProps, {fetchUserAnime, updateAnime, deleteAnime})(ListEntry)
