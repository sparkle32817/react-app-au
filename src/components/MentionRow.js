import React from 'react';
import Profile from './Profile';
import Analysis from './Analysis';
import ShareButton from './ShareButton';

export default class MentionRow extends React.Component {

	render() {
	  	return (
			<div>
				<div className="mention-row  mb-3">
					<div className="mention-body">
						<div className="row pr-close-row">
							<div className="col col-12 col-md-7 mb-2">
								<Profile data={this.props.data} image={'url(https://picsum.photos/99)'}></Profile>
							</div>
							<div className="col col-12 col-md-5">
								<Analysis data={this.props.data}></Analysis>
								<ShareButton></ShareButton>
							</div>
						</div>
					</div>
				</div>
				<div className="row pr-close-row">
					<div className="col col-8 offset-2 offset-lg-3">
						<hr/>
					</div>
				</div>
			</div>
	  	);
	}
}
