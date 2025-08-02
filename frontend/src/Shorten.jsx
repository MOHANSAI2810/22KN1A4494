// src/Shorten.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Shorten = () => {
  const [url, setUrl] = useState('');
  const [validity, setValidity] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [shortLink, setShortLink] = useState('');
  const [expiry, setExpiry] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { url };
    if (validity) payload.validity = parseInt(validity);
    if (shortcode) payload.shortcode = shortcode;

    try {
      const res = await axios.post('http://localhost:5000/shorturls', payload, {
        headers: {
          clientID: import.meta.env.VITE_CLIENT_ID,
          clientSecret: import.meta.env.VITE_CLIENT_SECRET
        }
      });
      setShortLink(res.data.shortLink);
      setExpiry(res.data.expiry);
      setError('');
    } catch (err) {
      setShortLink('');
      setExpiry('');
      setError(err.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <input className="input" type="text" placeholder="Enter long URL" value={url} onChange={(e) => setUrl(e.target.value)} required />
        <input className="input" type="number" placeholder="Validity (minutes) — optional" value={validity} onChange={(e) => setValidity(e.target.value)} />
        <input className="input" type="text" placeholder="Custom shortcode (optional)" value={shortcode} onChange={(e) => setShortcode(e.target.value)} />
        <button className="button" type="submit">Shorten</button>
      </form>
      {shortLink && (
        <div className="output">
          <p><strong>Short Link:</strong> <a href={shortLink} target="_blank" rel="noreferrer">{shortLink}</a></p>
          <p><strong>Expires At:</strong> {expiry}</p>
        </div>
      )}
      {error && <div className="error"><p>Error: {error}</p></div>}
    </>
  );
};

export default Shorten;
