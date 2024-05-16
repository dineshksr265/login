import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
	const [imageUrl, setImageUrl] = useState('');
	const { t } = useTranslation();

	useEffect(() => {
		axios.get('https://dog.ceo/api/breeds/image/random')
			.then(response => {
				setImageUrl(response.data.message);
			})
			.catch(error => {
				console.error('Error fetching image:', error);
			});
	}, []);


	return (
		<div className="dashboard-container">
			<h3>{t('welcome')}</h3>
			{ imageUrl && <img src={imageUrl} alt="dashboardImg" style={{ width: "300px", height: "300px" }} /> }
		</div>
	);
};

export default Dashboard;
