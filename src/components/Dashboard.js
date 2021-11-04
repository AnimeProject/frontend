import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {fetchUserAnimes} from '../store/actions/userActions'
import ListEntry from './ListEntry'
import { Link } from 'react-router-dom';

function Dashboard(props) {
    useEffect(() => {
        props.fetchUserAnimes(props.user.animes)
    }, [])
    
    if(props.loading){
        return <h1>loading...</h1>
    }

    if(props.errors.length !== 0){
        return <h1>Houston we have a problem.</h1>
    }

    return (
        <div>
            <h1>{props.user.username}</h1>
            <h2>Friends: {props.user.friends.map(friend => {
                return <Link to={`/list/${friend}`}>{friend}</Link>
            })}</h2>
            {props.user.animes.length === props.userAnimes.length ? props.user.animes.map((user, idx) => {
                return <ListEntry key={user.anime_id} user={user} idx={idx}/>
            }) : <h2>Loading Anime Data...</h2>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        id: state.authReducer.user.user_id,
        user: state.authReducer.user,
        userAnimes: state.authReducer.userAnimes,
        loading: state.authReducer.loading,
        errors: state.authReducer.errors,
    }
}

export default connect(mapStateToProps, {fetchUserAnimes})(Dashboard)
