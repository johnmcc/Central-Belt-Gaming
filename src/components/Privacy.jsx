import React from 'react';
import Header from './Header';
import Footer from './Footer';

import "./Privacy.css";

const Privacy = () => {
	return <div id="app">
			<Header />
			<p id="privacy">I'm not storing your data. I am using Google Analytics to track generalised site statistics - read their <a href="https://support.google.com/analytics/answer/6004245?hl=en">privacy policy</a> if you like.</p>
			<Footer />
	</div>
}

export default Privacy;
