import React, { Component } from 'react';
import t from 'prop-types';
import styles from './SurveyQuestion.css';

class SurveyQuestion extends Component {

	constructor(props) {
		super(props);
		this.inputRef = React.createRef();
	}

	componentDidMount = () => {
		this.inputRef.current.focus()

		if(this.props.match) {
			let queryId = this.props.match.path.split('/')[2]
			this.props.setCurrentPage(queryId)
		}
	}

	keyPressed = event => {
		if(event.key === 'Enter' && event.target.value !== '') {
			this.props.enterPressed()
			if(this.props.index + 1 === this.props.totalPages)
				this.props.history.push('/summary')
			else
				this.props.history.push('/question/'+(this.props.index + 2))
		}
	}

	render() {
		let answers = {}

		switch(this.props.type) {
			case('text'):
				answers = <input type="text"
					className="form-control"
					ref={this.inputRef}
					placeholder={this.props.placeholder}
					value={this.props.answer}
					onChange={event => this.props.inputChanged(event, this.props.index)}
					onKeyUp={event => this.keyPressed(event) } />
				break;
			case('select'):
				answers = (
					<select className="form-control"
						onChange={event => this.props.inputChanged(event, this.props.index)}
						defaultValue={this.props.answer}
						ref={this.inputRef}
						onKeyUp={event => this.keyPressed(event) } >
						{this.props.options.map((option, i) =>
							<option key={i} value={option}>
								{option}
							</option>
						)}
					</select>
				)
				break;
			case('radio'):
				answers = this.props.options.map(option => (
					<div key={option} className="form-check text-left my-3">
						<input value={option}
						ref={this.inputRef}
							onChange={event => this.props.inputChanged(event, this.props.index)}
							onKeyUp={event => this.keyPressed(event) }
							checked={option === this.props.answer}
							id={option}
							type="radio"
							name="customRadio"
							className="form-check-input" />
						<label className="form-check-label" htmlFor={option}>{option}</label>
					</div>
				))
				break;
			default:
				answers = null
		}

		return (
			<div className={styles.SurveyQuestion}>
				<div className="form-group">
					<h5 className="mb-5">{this.props.question}</h5>
					{answers}
				</div>
			</div>
		)
	}
}

SurveyQuestion.propTypes = {
	index: t.number.isRequired,
	placeholder: t.string,
	type: t.oneOf(['text', 'select', 'radio']).isRequired,
	question: t.string.isRequired,
	options: t.array,
	inputChanged: t.func
}

SurveyQuestion.defaultProps = {
	placeholder: "Type here",
	inputChanged: false
}

export default SurveyQuestion
