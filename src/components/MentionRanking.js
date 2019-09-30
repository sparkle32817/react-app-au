import React from 'react';
import MentionOrder from './MentionOrder'

export default class MentionRanking extends React.Component {

	render() {
		
		let mentionOrders = [];
		if(this.props.dataSet){

			mentionOrders = this.props.dataSet.map((data, index) => (
				<MentionOrder key={index} name={data.username} image={`url(`+data.avatar+`)`} num={data.mention_count}></MentionOrder>
			));
		}

	  	return (
			<div className="mentions-right-column">
				<div className="prestigio-pane mb-3 prestigio-shadow">
					<h4 className="px-2 pt-2">Top mentioners</h4>
					<div className="mentions-mentioner-group">
						{mentionOrders}
					</div>
				</div>
			</div>
	  	);
	}
}
