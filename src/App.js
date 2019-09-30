import React from 'react';
import './App.css';
import MentionContainer from './components/MentionContainer';
import MentionRanking from './components/MentionRanking';
const getMention = require('./services/APIFunctions').getMention;
const getMentionCount = require('./services/APIFunctions').getMentionCount;

export default class App extends React.Component {

	constructor()
	{
		super();
		this.state = {
			datum: [],
			orders: [],
			loading_status: true,
			rows_status: true,
			options: [
				{
				  name: 'Date',
				  value: 'created_time',
				},
				{
				  name: 'Name',
				  value: 'user_name',
				},
			  ],
			  value: 'Date',
		};

		this.filter = '';
		this.limit = 4;
		this.is_first = true;
	}

	setDatas = async() => {

		console.log("filter::"+this.filter);
		console.log("limit::"+this.limit);

		if (!this.is_first && this.state.loading_status)
		{
			return;
		}

		this.is_first = false;

		this.setState({ loading_status: true});
		this.setState({ datum: await getMention(this.filter, this.limit, this.state.datum), orders: await getMentionCount()});
		this.setState({ loading_status: false, rows_status: false});
		
	}

	clickAll = async() => {

		console.log("loading_stauts::", this.state.loading_status);
		if (this.filter === "" || this.state.loading_status)
		{
			return;
		}

		this.setState({ rows_status: true});
		this.limit = 4;
		this.filter = '';
		this.setDatas();
	}

	clickFacebook = () => {

		console.log("loading_stauts::", this.state.loading_status);
		if (this.state.loading_status)
		{
			return;
		}

		this.setState({ rows_status: true});
		this.limit = 4;
		this.filter = 'facebook';
		this.setDatas();
	}

	clickInstagram = () => {
		
		console.log("loading_stauts::", this.state.loading_status);
		if (this.state.loading_status)
		{
			return;
		}

		this.setState({ rows_status: true});
		this.limit = 4;
		this.filter = 'instagram';
		this.setDatas();
	}
	
	handleChange = (event) => {

		let dataSet = this.state.datum;
		let value = event.target.value;
		
		for (let i=0; i<dataSet.length-1; i++)
		{
			for (let j=i+1; j<dataSet.length; j++)
			{
				if (dataSet[i][value] > dataSet[j][value])
				{
					[dataSet[i], dataSet[j]] = [dataSet[j], dataSet[i]];
				}
			}
		}
	
		this.setState({ datum: dataSet, value: value });
	};

	handleScroll = (e) => {

		if ( window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && !this.state.loading_status && this.state.datum.request )
		{
			console.log("loading_stauts::", this.state.loading_status);
			// Do awesome stuff like loading more content!
			this.limit += 4;
			this.setDatas();
		}
	}

	async componentDidMount() {
		
		window.addEventListener('scroll', this.handleScroll);

		try{
			await this.setDatas();
		}
		catch(err){
			console.log('error::', err);
		}
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	};
	  
	render() {

		let spinner_status	= this.state.loading_status? "-webkit-box": "none";
		let rows_status 	= this.state.rows_status? "none": "-webkit-box";
		let position 		= this.state.rows_status? 200: 10;

		console.log(spinner_status);
		console.log(rows_status);

	  	return (			  
			<div className="row pr-close-row"  onScroll={this.handleScroll}>
				<div className="col col-lg-6 offset-lg-3">
					<div className="row no-gutters">
						<div className="col col-10 col-lg-10 col-md-8 col-sm-8 offset-1 offset-lg-1 offset-md-2 offset-sm-2 prestigio-white-stripe prestigio-shadow">
							<div className="prestigio-responsive-central-pane">
								<div className="row pr-close-row">
									<div className="col col-12 col-md-4 mb-2 mb-md-3">
										<select className="prestigio-new-input w-100 pr-select" onChange={this.handleChange} value={this.state.value}>
											{this.state.options.map(item => (
												<option key={item.value} value={item.value}>
												{item.name}
												</option>
											))}
										</select>
									</div>
									<div className="col col-12 col-md-auto ml-auto mb-3">
										<div className="prestigio-search">
											<input type="search" className="prestigio-new-input w-100" placeholder="Search..." />
											<button type="button" className="prestigio-search-input-btn"><i className="fa fa-search"></i></button>
										</div>
									</div>
								</div>
							</div>
							
							<div className="prestigio-responsive-central-pane">
								<div className="row pr-close-row">
									<div className="col col-auto mb-3">
										<button type="button" className="prestigio-btn prestigio-blue-white-inverse metrics-picker selected prestigio-shadow" onClick={this.clickAll}>ALL</button>
									</div>
									<div className="col col-auto mb-3">
										<button type="button" className="prestigio-btn square metrics-picker prestigio-shadow facebook" onClick={this.clickFacebook}><i className="fa fa-facebook"></i></button>
									</div>
									<div className="col col-auto mb-3">
										<button type="button" className="prestigio-btn square metrics-picker prestigio-shadow instagram" onClick={this.clickInstagram}><i className="fa fa-instagram"></i></button>
									</div>
								</div>
							</div>
							
							<div className="prestigio-tab-pane" id="brand-pane" style={{display: 'inline-block'}} data-tabs="mentions">
								<div className="prestigio-offset-pane-big">
									<div className="row pr-responsive-row" style={{display: rows_status}}>
										<div className="col col-12 col-lg-8">											
											<MentionContainer dataSet={this.state.datum}></MentionContainer>
										</div>
										<div className="col col-lg-4 d-none d-lg-block">
											<MentionRanking dataSet={this.state.orders}></MentionRanking>
										</div>
									</div>
									<div className="d-flex justify-content-center">
										<div className="spinner-border" role="status" style={{display: spinner_status, marginTop: position}}>
											<span className="sr-only">Loading...</span>
										</div>
									</div>
								</div>
							</div>		
						</div>
					</div>
				</div>
			</div>

	  	);
	}
}
