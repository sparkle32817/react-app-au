import React from 'react';
import MentionRow from './MentionRow';

export default class MentionContainer extends React.Component {

	render() {

		let mentionRows = [];
		if(this.props.dataSet){

			mentionRows = this.props.dataSet.map((data, index) => (
				<MentionRow key={index} data={data}></MentionRow>
			));
		}

	  	return (										
			<div className="mention-container">
				{mentionRows}
			</div>
	  	);
	}
}
