import React, { Component } from 'react';
import { Route, Redirect, Link } from 'react-router-dom'
import './Survey.css'

import SurveyQuestion from '../SurveyQuestion/SurveyQuestion'
import SurveyNavigation from '../SurveyNavigation/SurveyNavigation'
import SurveySummary from '../SurveySummary/SurveySummary'
import ProgressBar from '../ProgressBar/ProgressBar'

class Survey extends Component {
	state = {
		currentPage: 1,
		maxPageAllowed: 1,
		nextStepEnabled: false,
		questions: [{
			type: 'text',
			question: 'Whats your full name?',
			answer: '',
			placeholder: 'Answer here'
		},
		{
			type: 'text',
			question: 'How are old are you?',
			answer: '',
		},
		{
			type: 'select',
			question: 'Experience',
			answer: '',
			options: [
				'Less than 1 year',
				'1-2 years',
				'3-5 years',
				'More than 5 years'
			]
		},
		{
			type: 'radio',
			question: 'What type of position are you looking for?',
			answer: '',
			options: [
				'Part-time',
				'Full-time',
				'Freelancer',
				'Contractor'
			]
		},
		{
			type: 'text',
			question: 'What is your field of expertice?',
			answer: ''
		},
		{
			type: 'text',
			question: 'What is the expected salary?',
			answer: ''
		}]
	}

	setCurrentPage = page => {
		this.setState({ currentPage: parseInt(page) })
	}

	incrementPage = () => {
		let currentPage = this.state.currentPage + 1
		this.setState({ currentPage: currentPage, maxPageAllowed: currentPage })
	}

	backClickHandler = () => {
		let currentPage = this.state.currentPage
		if(currentPage > 1)
			this.setState({ currentPage: currentPage - 1 });
		this.setState({ nextStepEnabled: true })
	}

	nextClickHandler = () => {
		let currentPage = this.state.currentPage
		let maxPageAllowed = this.state.maxPageAllowed
		if(currentPage < this.state.questions.length + 1)
			this.setState({ 
				currentPage: currentPage + 1,
				maxPageAllowed: maxPageAllowed + 1 
			})

		this.setState({ nextStepEnabled: false })
	}

	handleInputChange = (event, index) => {
		let questions = this.state.questions.map(q => q)
		questions[index].answer = event.target.value

		let nextStepEnabled = event.target.value !== ""

		this.setState({ 
			questions: questions,
			nextStepEnabled: nextStepEnabled
		})
	}

	render() {
		let questions = this.state.questions.map((step, index) => (
			<Route key={index} exact path={"/question/" + (index + 1)} 
				render={props => (index + 1) > this.state.maxPageAllowed ?
				(<Redirect to={{ pathname: "/question/"+this.state.maxPageAllowed }} />) : 
				(<SurveyQuestion index={index}
					{ ...step }
					{ ...props }
					totalPages={this.state.questions.length}
					enterPressed={this.incrementPage}
					setCurrentPage={this.setCurrentPage}
					inputChanged={this.handleInputChange} />)
			} />
		))

		return (
			<div className="container">
				<div className="row">
					<div className="survey col-8 offset-2 my-5">
						<ProgressBar totalPages={this.state.questions.length}
							currentPage={this.state.currentPage} />
						{questions}
						<Route exact path="/" component={() => (
							<div className="text-center">
								<h2>Welcoming message</h2>
								<p>Welcoming text</p>
								<Link className="btn btn-primary" to="/question/1">Start Survey!</Link>
							</div>
						)} />
						<Route exact path="/summary" 
							component={() => (this.state.currentPage < this.state.questions.length) ? 
								(<Redirect to={{ pathname: "/question/"+this.state.currentPage }} />) :
								(<SurveySummary data={this.state.questions}/>)
						} />
						<Route path="/question/" component={() => (
						<SurveyNavigation 
							backClicked={this.backClickHandler} 
							nextClicked={this.nextClickHandler}
							totalPages={this.state.questions.length}
							currentPage={this.state.currentPage}
							nextStepEnabled={this.state.nextStepEnabled} />
						)} />
					</div>
				</div>
			</div>
		);
	}
}

export default Survey