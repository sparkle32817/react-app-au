import React from 'react';

export default class Brand extends React.Component {

	render() {
	  	return (
			<div className="mentions-right-column">
				<a href="/influencer/brand-profile.html" className="no-style">
					<div className="profile-timeline-tag mr-0 d-flex align-items-center prestigio-shadow">
						<div className="prestigio-thumbnail mr-2" style={{backgroundImage: `url(`+this.props.brand.logo+`)`}}></div>
						<p className="mb-0 small-text ellipsis">{this.props.brand.name}</p>
					</div>
				</a>
			</div>
	  	);
	}
}
