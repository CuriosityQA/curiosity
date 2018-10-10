import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import { getQuestions } from '../../queries/queries.js';
import { Redirect } from 'react-router-dom';
import QuestionItem from './QuestionItem.jsx';
import _ from 'lodash';

class QuestionList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: null,
			skip: 0,
			questions: []
		};
		this.onSelect = this.onSelect.bind(this);
		this.onScroll = this.onScroll.bind(this);
		this.getNextQuestions = this.getNextQuestions.bind(this);
		this.throttledQuestionCall = _.throttle(this.getNextQuestions, 250, { leading: false });
	}
	componentDidMount() {
		this.getNextQuestions();
		window.addEventListener('scroll', this.onScroll, false);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll, false);
	}

	onScroll = () => {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && this.state.questions.length) {
			window.removeEventListener('scroll', this.onScroll, false);
			this.throttledQuestionCall();
		}
	};

	getNextQuestions = async () => {
		await this.props.client
			.query({
				query: getQuestions,
				variables: {
					limit: 15,
					skip: this.state.skip
				}
			})
			.then(({ data }) => {
				let newProps = this.state.questions.concat(data.questions);
				let next = this.state.skip + 15;
				this.setState({ questions: newProps, skip: next }, () => {
					window.addEventListener('scroll', this.onScroll, false);
				});
			})
			.catch(err => console.log('error in nextquestions', err));
	};

	onSelect(id) {
		this.setState({
			selected: id
		});
	}

	displayQuestions() {
		if (this.props.data.loading) {
			return <div>Loading Questions...</div>;
		} else {
			let data = this.state.questions.length > 1 ? this.state.questions : this.props.data.questions;
			return data.map(post => {
				return (
					<QuestionItem
						key={post.id}
						questionId={post.id}
						onSelect={this.onSelect}
						userId={this.props.userId}
					/>
				);
			});
		}
	}

	render() {
		if (!this.state.selected) {
			return (
				<div>
					<h2>
						<u>Questions</u>{' '}
					</h2>
					<div />
					{this.displayQuestions()}
					<div>
						<h3> You read all of it! Check back later...</h3>
					</div>
				</div>
			);
		} else {
			return <Redirect to={`/questionContent/${this.state.selected}`} />;
		}
	}
}

export default compose(
	withApollo,
	graphql(getQuestions, {
		options: () => {
			return {
				variables: {
					limit: 15,
					skip: 0
				}
			};
		}
	})
)(QuestionList);
