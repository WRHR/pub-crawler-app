import React, {Component} from 'react'

export default class Login extends Component {
    state = {
        needsLogin: false,
        formUrl: 'http://localhost:3000/login',
        username: '',
        password: '',
        submitButtonValue: 'Login',
        alerts: []
    }

    componentDidMount(){
        localStorage.removeItem('token')
        this.props.setUser({})
    }

    login = () => {
        this.setState({
            formUrl: 'http://localhost:3000/login',
            submitButtonValue: 'Login',
            alerts: []
        })
    }

    signUp = () => {
        this.setState({
            formUrl: 'http://localhost:3000/users/',
            submitButtonValue:'Sign Up',
            alerts:[]
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleClick= (event) => {
        event.preventDefault()
        this.setState({needsLogin: !this.state.needsLogin})
        this.state.needsLogin ? this.login() :this.signUp()  
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const {username, password} = this.state
        let user = {username, password}

        fetch(this.state.formUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({user})
        })
            .then(response => response.json())
            .then(results => {
                if(results.errors){
                    this.setState({alerts: results.errors})
                } else {
                    localStorage.setItem('token', results.token)
                    this.props.setUser(results.user)
                    this.props.history.push('/')
                }
            })
    }

    showAlerts = () => this.state.alerts
        .map((alert, index) => <p className='alert' key={index}>{alert}</p>)
    

    render(){
        const {username, password, submitButtonValue, alerts, needsLogin} = this.state
        return(
            <div className='form-container'>
                <h1 className='logo'>Pub Crawler</h1>
                <form onSubmit={this.handleSubmit}>
                    <h2>{needsLogin ? "Sign Up" : "Log In"}</h2>
                    <label>Username:</label>
                    <input name='username' value={username} onChange={this.handleChange}/>
                    <label>Password:</label>
                    <input name='password' value={password} onChange={this.handleChange}/>
                    {alerts ? this.showAlerts() : null}
                    <input className='login-buttons' type='submit' value={submitButtonValue}/>
                    <p>or</p>
                    <button className='login-buttons' onClick={this.handleClick}>
                        {needsLogin ? "Back to Log In" : "Sign Up New User"}
                    </button>
                </form>
            </div>
        )
    }
}