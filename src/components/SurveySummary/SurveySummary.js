import React from 'react';

const SurveySummary = props => (
	<div className="survey-summary">
		<h2>Summary</h2>
		{props.data.map((question, index) => (
			<div className="card mt-4" key={index}>
				<div className="card-body">
					<h5 className="card-title">{question.question}</h5>
					<p className="card-text">Answer: {question.answer}</p>
				</div>
			</div>
		))}
	</div>
)

export default SurveySummary