import React from 'react';

export default function WarningWindow(props) {

  console.log('>>> hey warning window: ',props.warning);

//Isssue 1 minute warning messaage 
if(props.warning === 'warning'){

  return (

    <div className="warning">
        Warning: You will logged out in 1 minute due to inactivity....
    </div>
);

}

//Isssue logged out message 
if(props.warning === 'logged out'){

  return (

    <div className="loggedOut">
        You have been logged out, please log back in.
    </div>
);

}
 
  return null;
};