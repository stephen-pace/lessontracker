import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';


class Nav extends Component {
    constructor () {
        super ()
        this.state = {
            nameOfUser: '',
            pic: ''
        }
    }


    componentDidMount = () => {
        axios.get('/api/users').then(res=>{
            
            this.setState({nameOfUser: res.data })
        })
    }

    render(){
    
    let displayNav = () => {
        if(this.props.location.pathname === '/'){
            return 
        } else {
            return displayNav = 
            <div className="navbar">
            Welcome {this.state.nameOfUser}


            </div>
        }
    }
    return (
        <div>{displayNav()}</div>
    )
}
}


export default withRouter(Nav)

