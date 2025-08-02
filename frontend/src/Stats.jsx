import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Stats = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/shorturls')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);
  return (
    <div>
      <h3>📊 URL Statistics</h3>
      {data.length === 0 ? (
        <p>No shortened URLs found.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Shortcode</th>
              <th>Original URL</th>
              <th>Clicks</th>
              <th>Created At</th>
              <th>Expires At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.shortcode}</td>
                <td><a href={item.url} target="_blank" rel="noreferrer">{item.url}</a></td>
                <td>{item.clicks}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
                <td>{new Date(item.expiry).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default Stats;
