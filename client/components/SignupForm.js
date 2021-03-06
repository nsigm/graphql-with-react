import React, { Component } from "react";
import AuthForm from "./AuthForm";
import { graphql } from "react-apollo";
import mutation from "../mutations/Signup";
import query from "../queries/CurrentUser";
import { hashHistory } from "react-router";

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
  }

  componentWillUpdate(nextProps) {
    if (nextProps.data.user && !this.props.data.user) {
      hashHistory.push("/dashboard");
    }
  }

  onSubmit({ email, password }) {
    this.props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query }],
      })
      .catch((res) => {
        const errors = res.graphQLErrors.map((err) => err.message);
        this.setState({ errors });
      });
  }

  render() {
    return (
      <div className="container">
        <h3>Signup</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(query)(graphql(mutation)(SignupForm));
