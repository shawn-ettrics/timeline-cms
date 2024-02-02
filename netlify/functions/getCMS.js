// /netlify/functions/fetch-webflow-cms.js
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const WEBFLOW_API_URL = 'www.wildfires.org/timeline-dev-test/timeline-dev-test-page';
  const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN; // Set this in your Netlify environment variables

  const response = await fetch(WEBFLOW_API_URL, {
    headers: {
      'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`,
      'accept-version': '1.0.0'
    }
  });

  if (!response.ok) {
    // If the call was unsuccessful, return the error status
    return {
      statusCode: response.status,
      body: response.statusText
    };
  }

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data.items) // Send back the items from the CMS collection
  };
};
