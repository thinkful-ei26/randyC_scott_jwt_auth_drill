import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';

import HeaderBar from './header-bar';
import LandingPage from './landing-page';
import Dashboard from './dashboard';
import RegistrationPage from './registration-page';
import {refreshAuthToken,clearAuth} from '../actions/auth';
import WarningWindow from './warning_window';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            userActive: true,
            time: 'hello',
            warning: 'no warning'
 
        }
 
    }
     

    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically
            this.startPeriodicRefresh();
            // this.startFiveMinuteTimer();
        } else if (prevProps.loggedIn && !this.props.loggedIn) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }
    }

    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            10 * 60 * 1000 // 10 minutes
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }

        clearInterval(this.refreshInterval);
    }


    //Method to start 5 minute interval
    startFiveMinuteTimer(){

        if(this.props.loggedIn){

            if(this.props.warning !== 'no warning'){

                this.setState({
    
                    warning: 'no warning'
    
                })
    
              }
    
              console.log('new 5 minute interval started!');
    
              this.fiveMinuteTimer = setInterval(
                () =>  {
                    //alert("You are about to be logged out due to inactivity....");
                    console.log('You now have 1 minute');
                    this.setState({
    
                        warning: 'warning'
    
                    })
                    this.startOneMinuteTimer();
                },
                1 * 60 * 1000//set to 1 minute -- should be set to 5 minutes
            );
     

        }

          


    }

    //Method to stop 5 minute interval
    stopFiveMinuteTimer(){


        if(this.props.loggedIn){

            console.log('>>> current timer: ',this.fiveMinuteTimer);

            console.log('5 minute interval stopped!');
            clearInterval(this.fiveMinuteTimer);
     
            this.startFiveMinuteTimer();


        }

         
       

    }
   

    startOneMinuteTimer(){

        if(this.props.loggedIn){

            console.log('new 1 minute interval started!');
 
        () => this.props.dispatch(clearAuth())

        this.oneMinuteTimer = setInterval(
          () =>  {
              this.props.dispatch(clearAuth());//log user out
              //alert("You have been logged out due to inactivity. You must log back in.");
              console.log('Time is up logged out!');
              this.setState({

                warning: 'logged out'

            })
            
          },
          1 * 60 * 1000
      );



        }


        
  }

    


    render() {
        return (
            <div className="app" onClick ={() => {console.log('button clicked!!!'); this.stopFiveMinuteTimer() }} onMouseMove ={() => {console.log('mouse moved!!!');this.stopFiveMinuteTimer() }}>
                <HeaderBar time = {this.state.time} />
                <Route exact path="/"  component={LandingPage} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/register" component={RegistrationPage} />
                <WarningWindow warning ={this.state.warning}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
