import React from 'react'
import t from 'prop-types'

import styles from './ProgressBar.module.css'

const ProgressBar = props => (
	<div className={styles.ProgressBar}>
		<div className={styles.Inner}
			style={{'width': 100 * ((props.currentPage - 1)/ props.totalPages) + '%',
				background: props.color}}></div>
	</div>
)

ProgressBar.propTypes = {
	currentPage: t.number.isRequired,
	totalPages: t.number.isRequired,
	color: t.string
}

ProgressBar.defaultProps = {
	color: "#00F",
	currentPage: 0
}

export default ProgressBar
