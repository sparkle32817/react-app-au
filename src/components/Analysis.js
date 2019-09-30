import React from 'react';
import Brand from './Brand';

export default class Analysis extends React.Component {

	render() {

		let brands = [];
		if(this.props.data.brands){

			brands = this.props.data.brands.map((data, index) => (
				<Brand key={index} brand={data}></Brand>
			));
		}

	  	return (
			<div>
				<div className="prestigio-pane px-3 pt-3 mb-3 prestigio-shadow d-flex flex-column justify-content-center">
					<a href="/brand/profile.html" className="no-style d-none d-md-block">
						<div className="d-flex align-items-center mb-3">
							<div className="prestigio-thumbnail mr-2" style={{backgroundImage: `url(`+this.props.data.user_avatar+`)`}}></div>
							<p className="small-text mb-0 ellipsis">{this.props.data.user_name}</p>
						</div>
					</a>
					<div className="small-title-span p-0 mb-1"><span>POST METRICS</span></div>
					<div className="row pr-close-row">
						<div className="col mb-3">
							<span className="small-text op-67"><strong>Reach</strong></span>
							<h3 className="mb-0">{this.props.data.reach}k</h3>
						</div>
						<div className="col mb-3">
							<span className="small-text op-67"><strong>Engagement</strong></span>
							<h3 className="mb-0">{this.props.data.engagement}k</h3>
						</div>
					</div>
					<div className="small-title-span p-0 mb-2"><span>TAGGED BRANDS</span></div>
					<div className="mb-2">
						{brands}
					</div>
				</div>
			</div>
	  	);
	}
}
