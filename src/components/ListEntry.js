import {useState, useEffect} from 'react';
import { MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBCardTitle, MDBBtn, MDBIcon, MDBSpinner} from 'mdb-react-ui-kit';
import schema from '../validation/postUpdateSchema'
import {reach} from 'yup'
import axios from 'axios';
import axiosWithAuth from '../utils/axiosWithAuth'

function ListEntry({user}) {
    const initialState = {
        user_id: 0,
        anime_id: 0,
        completed: 0,
        rating: user.rating,
    }
    const [formValues, setFormValues] = useState(initialState)
    const [formErrors, setFormErrors] = useState('')
    const [data, setData] = useState([])
    const [userData, setUserData] = useState(user)
    const [loading, setLoading] = useState(true)
    const [display, setDisplay] = useState(true)
    const [error, setError] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        axios.get(`https://api.jikan.moe/v3/anime/${user.anime_id}`)
        .then(res => {
            setData(res.data)
            setLoading(false)
        })
        .catch(err => {
            setError('Wrong.')
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // CRUD
    const update = (event) => {
        event.preventDefault()
        const newAnime = {
            user_id: user.user_id,
            anime_id: user.anime_id,
            completed: parseInt(formValues.completed),
            rating: parseInt(formValues.rating),
            list_id: user.list_id,
        }
        const {list_id, ...rest} = newAnime
        axiosWithAuth().put(`https://animenu.herokuapp.com/api/lists/${list_id}`, rest)
            .then(res => {
                setUserData(newAnime)
                setError('')
            }).catch(e => {
                setError('Update to database failed')
            })
        edit()
    }

    const del = () => {
        axiosWithAuth().delete(`https://animenu.herokuapp.com/api/lists/${user.list_id}`)
            .then(res => {
                setDisplay(false)
            }).catch(error => {
                setError('Delete from database failed')
            })
    }

    // Enter Editing Mode
    const edit = () => {
        const value = !editing
        setEditing(value)
    }

    // Form Fun
    useEffect(() => {
        schema.isValid(formValues).then(valid => setDisabled(!valid))
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [formValues])

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

    return(
        <>
        {display ? <div className='p-3 d-flex justify-content-center'>
            {loading ? 
                <div className='text-center'>
                    <MDBSpinner role='status'>
                        <span className='visually-hidden'>Fetching Anime...</span>
                    </MDBSpinner>
                </div> 
                : 
                <MDBCard className='border' style={{ maxWidth: '80%' }} alignment='center'>
                <MDBRow className='g0'>
                    <MDBCol md='2'>
                        <MDBCardImage src={data.image_url} alt='...' fluid />
                    </MDBCol>
                    <MDBCol md='10'>
                    <MDBCardBody>
                        <MDBCardTitle>
                            {data.title}
                        </MDBCardTitle>
                        <MDBCardText>
                            {data.synopsis}
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
                                    placeholder={userData.rating}
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
                                <h4 className='mx-2'>Completed: {userData.completed === 1 ? <>Yes</> : <>No</>}</h4>
                                <h4 className='mx-2'>Rating: {userData.rating}</h4>
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
                                {error.length !== 0 ? <h4 className='text-danger'>{error}</h4> : null}
                            </div>
                            }
                        </MDBCardBody>
                    </MDBCol>
                </MDBRow>
            </MDBCard>}
        </div> : <></>}
        </>
    )
}
export default ListEntry