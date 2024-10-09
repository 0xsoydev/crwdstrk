"use client"; // If you're using the latest Next.js app router
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Articles from '../../components/Articles';
import '../../stylesheets/Articles.css'; // Make sure to include the .css extension

const Article = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const subscriptionKey = 'eb8665dab85f4e06a1aa9705e3536c38'; // Replace with your actual subscription key

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.nhs.uk/mental-health/?api-version=1.0&subscription-key=${subscriptionKey}`, {
                    headers: {
                        'Ocp-Apim-Subscription-Key': subscriptionKey,
                    },
                });

                console.log(response.data); // Check response structure

                // Assuming response.data.articles contains the list of articles
                setData(response.data.articles || []); // Adjust based on actual structure
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Error fetching data. Please check your subscription key and try again.');
                setLoading(false);
            }
        };

        fetchData();
    }, [subscriptionKey]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='cardContainer'>
            {Array.isArray(data) && data.length > 0 ? (
                data.map((item, index) => (
                    <Articles key={index} title={item.title} description={item.description} />
                ))
            ) : (
                <div>No articles available</div>
            )}
        </div>
    );
};

export default Article;
