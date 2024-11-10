import React from 'react'
import "../styles/Loader.css";

const Loader = () => {
    return (
		<section className="loaderContainer">
			<div className="loader"></div>
			<div className="loaderText">Loading...</div>
		</section>
	);
}

export default Loader
