import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import { fetchStream, deleteStream } from '../../actions';
import history from '../../history';

class StreamDelete extends React.Component {
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }

    renderActions() {
        return (
            <React.Fragment>
                <button className="ui button negative">Delete</button>
                <Link to="/" className="ui burron">Cancel</Link>
            </React.Fragment>
        );
    }
    
    renderContent() {
        if(!this.props.stream){
            return 'Are you sure you wan to delete this stream?'
        }
        return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`
    }

    render(){
        console.log(this.props)
        return (
            <div>
                StreamDelete
                <Modal 
                    title="Delete Stream"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    dismiss={()=> history.push('/')}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);