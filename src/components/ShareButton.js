import React from 'react';

export default class ShareButton extends React.Component {

	render() {
	  	return (
		  	<div className="text-right">
		  		<button type="button" className="prestigio-btn prestigio-blue-white prestigio-shadow" data-toggle="modal" data-target="#shareModal">
					<i className="fa fa-share-alt"></i> SHARE
				</button>
	  		</div>
	  	);
	}
}
