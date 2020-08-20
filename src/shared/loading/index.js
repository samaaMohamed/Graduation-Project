import React, { Component } from "react";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

export default class Loading extends Component {
  render() {
    let { isLoading } = this.props;

    return (
      <>
        <Modal
          open={isLoading}
          onClose={() => (isLoading = false)}
          center
          styles={{
            modal: {
              animation: `${
                isLoading ? "customEnterAnimation" : "customLeaveAnimation"
              } 500ms`,
            },
          }}
        >
          <p className="m-5 text-center">Loading...</p>
        </Modal>
      </>
    );
  }
}
