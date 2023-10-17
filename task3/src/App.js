import React, { Component } from 'react';

import './App.css';

import Header from './Components/Header';
import Form from './Components/Form';
import EmojiList from './Components/EmojiList';
import Loader from './Components/Loader';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			emojis: [],
			loading: true,
		};
	}
	fetchAll = (e) => {
		const url = process.env.REACT_APP_URL_ALL;
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				this.setState({ ...this.state, emojis: data, loading: false });
			});
	};

	componentDidMount() {
		this.fetchAll();
	}

	handleInputChange = (e) => {
		const { name, value } = e.target;
		this.setState({ ...this.state, [name]: value });
	};

	fetchEmojis = (e) => {
		e.preventDefault();
		this.setState({ loading: true });
		const search = this.state.search;
		const url = `process.env.REACT_APP_URL_SEARCH=${search}&access_key=process.env.REACT_APP_TOKEN`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				this.setState({ ...this.state, emojis: data, loading: false });
			});
	};

	render() {
		const { search, emojis } = this.state;
		return (
			<div className='App'>
				<Header />
				<Form
					search={search}
					handleInput={this.handleInputChange}
					fetchEmojis={this.fetchEmojis}
				/>
				{this.state.loading ? <Loader /> : <EmojiList emojis={emojis} />}
			</div>
		);
	}
}

export default App;