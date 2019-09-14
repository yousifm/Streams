import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchStream, deleteStream } from "../../actions";
import { redirectToList, redirectToNoAccess } from "../../redirection";
import Loader from "../Loader";
import Modal from "../Modal";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onDeleteClick = () => {
    this.props.deleteStream(this.props.match.params.id);
  };

  renderModal() {
    const actions = (
      <>
        <button className="ui red button inverted" onClick={this.onDeleteClick}>
          Delete
        </button>
        <Link to="/" className="ui primary button inverted">
          Cancel
        </Link>
      </>
    );

    return (
      <div>
        <Modal
          title="Delete Stream?"
          content={`Are you sure you want to delete the stream titled "${this.props.stream.title}"?`}
          actions={actions}
          onDismiss={redirectToList}
        />
      </div>
    );
  }

  render() {
    if (this.props.isSignedIn === null) {
      return <Loader />;
    } else if (
      this.props.stream &&
      this.props.stream.userId !== this.props.currentUserId
    ) {
      redirectToNoAccess();
    }
    return this.renderModal();
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { fetchStream, deleteStream }
)(StreamDelete);
