import React from 'react';

export default class MentionOrder extends React.Component {

	render() {
	  	return (
			<div className="mentions-right-column">
				<a href="#" className="no-style mentions-mentioner d-flex align-items-center">
					<div className="mentions-mentioner-place">{this.props.order}</div>
					<div className="prestigio-thumbnail mentions-mentioner-thumb mr-2" style={{backgroundImage: this.props.image}}></div>
					<p className="small-text mb-0 ellipsis">{this.props.name}</p>
					<p className="small-text op-67 mb-0 ml-auto mr-1">{this.props.num}</p>
				</a>
			</div>
	  	);
	}
}
