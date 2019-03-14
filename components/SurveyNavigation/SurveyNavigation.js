import React from 'react';
import { Link } from 'react-router-dom'
import t from 'prop-types'
import styles from './SurveyNavigation.module.css'

const SurveyNavigation = props => (
	<div className={styles.SurveyNavigation}>
		<Link to={{ pathname: "/question/"+(props.currentPage - 1) }}>
			<button className="btn btn-primary"
			onClick={props.backClicked}
			disabled={props.currentPage === 1 ? "disabled" : null}>
				back
			</button>
		</Link>
		<Link to={props.currentPage === props.totalPages ? "/summary" :
			{ pathname: "/question/"+(props.currentPage + 1) }}>
			<button
				className="btn btn-primary"
				onClick={props.nextClicked}
				disabled={props.currentPage === props.totalPages + 1 || !props.nextStepEnabled}>
					{props.currentPage === props.totalPages ? "finish" : "next"}
			</button>
		</Link>
	</div>
)

SurveyNavigation.propTypes = {
	backClicked: t.func,
	nextClicked: t.func,
	totalPages: t.number,
	currentPage: t.number,
	nextStepEnabled: t.bool
}

SurveyNavigation.defaultProps = {
	currentPage: 0,
	nextStepEnabled: true
}

export default SurveyNavigation
