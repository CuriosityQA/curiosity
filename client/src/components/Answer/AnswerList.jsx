import React, { Component } from 'react';
import { getAnswers } from '../../queries/queries.js';
import { graphql, withApollo, compose } from 'react-apollo';
import CreateAnswer from './CreateAnswer.jsx';
import AnswerItem from './AnswerItem.jsx';

class AnswerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      questionId: '',
      skip: 0,
    };
    this.getNextAnswers = this.getNextAnswers.bind(this);
  }
  componentDidMount() {
    this.setState({ questionId: this.props.id });
  }
  getNextAnswers = async () => {
    let skip = this.state.skip === 0 ? this.props.data.answers.length : this.state.skip;
    await this.props.client
      .query({
        query: getAnswers,
        variables: {
          questionId: this.state.questionId,
          limit: 15,
          skip: Math.max(this.state.skip, skip),
        },
      })
      .then(({ data }) => {
        let newProps =
          this.state.answers.length > 0
            ? this.state.answers.concat(data.answers)
            : this.props.data.answers.concat(data.answers);
        let next;
        data.answers.length ? (next = skip + 15) : (next = this.state.answers.length);
        this.setState({ answers: newProps, skip: next }, () => {});
      })
      .catch(err => console.log('error in nextquestions', err));
  };

  displayAnswers() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    } else {
      let answers = this.state.answers.length > 0 ? this.state.answers : this.props.data.answers;
      return answers.map(
        answer => {
          if (!answer.answerChosen) {
            return (
              <AnswerItem
                key={answer.id}
                refetch={this.props.refetch}
                answerId={answer.id}
                qOwnerId={this.props.qOwnerId}
                loggedId={this.props.loggedId}
                isPaid={this.props.isPaid}
                user={this.props.user}
                questionId={this.props.id}
                bounty={this.props.bounty}
              />
            );
          }
        },
        () => {
          this.setState({ answers: answers });
        },
      );
    }
  }
  render() {
    return (
      <div>
        <div>{this.displayAnswers()}</div>
        <div>
          <button onClick={this.getNextAnswers}>Load more...</button>
        </div>
        <div>
          {this.props.signedIn ? (
            <CreateAnswer
              data={this.props.data}
              user={this.props.user}
              questionId={this.props.questionId}
            />
          ) : (
            <button onClick={() => alert('Please log into your account to be able to answer!')}>
              Respond
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default compose(
  withApollo,
  graphql(getAnswers, {
    options: props => {
      return {
        variables: {
          questionId: props.id,
          skip: 0,
          limit: 15,
        },
      };
    },
  }),
)(AnswerList);
