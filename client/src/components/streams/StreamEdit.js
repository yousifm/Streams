import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import { fetchStream, editStream } from "../../actions";
import { redirectToNoAccess } from "../../redirection";
import Loader from "../Loader";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    if (!(this.props.stream && this.props.isSignedIn !== null)) {
      return <Loader />;
    }

    if (this.props.stream.userId !== this.props.currentUserId) {
      redirectToNoAccess();
    }

    console.log(this.props.userId);
    return (
      <div>
        <h3>Stream Edit</h3>
        <StreamForm
          initialValues={_.pick(this.props.stream, ["title", "description"])}
          onSubmit={this.onSubmit}
        />
      </div>
    );
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
  {
    fetchStream,
    editStream
  }
)(StreamEdit);
