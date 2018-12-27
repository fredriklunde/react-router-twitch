import React from 'react';
import Modal from '../Modal';
import history from '../../history';

const StreamDelete = () => {
    const actions = (
        <React.Fragment>
            <button className="ui button negative">Delete</button>
            <button onClick={() => history.push('/')}className="ui button">Cancel</button>
        </React.Fragment>
    );

    return (
        <div>
            StreamDelete
            <Modal 
                title="Delete Stream"
                content="Are you sure you want to delete this stream?"
                actions={actions}
                dismiss={()=> history.push('/')}
            />
        </div>
        
    );
};

export default StreamDelete;