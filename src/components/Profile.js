import React from 'react';

export default class Profile extends React.Component {

	render() {

		let social_url = "http://www."+this.props.data.social+".com/";
		let social_css = "ptp-h-sn "+this.props.data.social;

		const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
		let current_datetime = new Date(this.props.data.created_time);
		let formatted_date = months[current_datetime.getMonth()] + " " + current_datetime.getDate() + " " + current_datetime.getFullYear() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes();

	  	return (
			<div>
				<a href={social_url} className="no-style">
					<div className="profile-timeline-post pb-2 mb-0 prestigio-shadow">
						<div className="ptp-header mb-2 d-flex justify-content-between relative">
							<div className="ptp-header-left d-flex">
								<div className="prestigio-thumbnail" style={{backgroundImage: `url(`+this.props.data.user_avatar+`)`}}></div>
								<div className="ptp-header-left-text ml-2 d-flex flex-column justify-content-between">
									<div className="ptp-header-name">{this.props.data.user_name}</div>
									<div className="ptp-header-info">
										<span className={social_css}>{this.props.data.social}</span>
										<span className="ptp-h-sep">.</span>
										<span className="ptp-h-date">{formatted_date}</span>
										<span className="ptp-h-sep">.</span>
										<span className="ptp-h-prv"><i className="fa fa-world"></i></span>
									</div>
								</div>
							</div>
						</div>
						<div className="ptp-content mb-2">
							<div className="ptp-c-text">
								<p className="mb-0">{this.props.data.text}</p>
							</div>
							<div className="ptp-c-thumb">
								<img src={this.props.data.picture} alt="" />
							</div>
						</div>
						<div className="ptp-footer d-flex">
							<div className="ptp-f-container d-flex align-items-center">
								<div className="ptp-f-icon">
									<i className="fa fa-thumbs-up"></i>
								</div>
								<div className="ptp-f-text">
									6k
								</div>
							</div>
							<div className="ptp-f-container d-flex align-items-center">
								<div className="ptp-f-icon">
									<i className="fa fa-comment"></i>
								</div>
								<div className="ptp-f-text">
									886
								</div>
							</div>
							<div className="ptp-f-container d-flex align-items-center">
								<div className="ptp-f-icon">
									<i className="fa fa-share-alt"></i>
								</div>
								<div className="ptp-f-text">
									27
								</div>
							</div>
						</div>
					</div>
				</a>
			</div>
	  	);
	}
}
