// Project: Coursera Capstone - React Website
// Files packed here. Copy each file into your project folder (or use the file names as shown).

// ----------------------- package.json -----------------------
{
  "name": "capstone-project",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-scripts": "5.0.1",
    "react-router-dom": "6.14.1",
    "uuid": "9.0.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}

// ----------------------- public/index.html -----------------------
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Capstone Project</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

// ----------------------- src/index.js -----------------------
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// ----------------------- src/App.jsx -----------------------
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Appointment from './components/Appointment';
import Notifications from './components/Notifications';
import Reviews from './components/Reviews';
import Profile from './components/Profile';

export default function App() {
  return (
    <div className="app">
      <header className="site-header">
        <h1>Capstone Clinic</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/appointment">Book</Link>
          <Link to="/notifications">Notifications</Link>
          <Link to="/reviews">Reviews</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <footer className="site-footer">© {new Date().getFullYear()} Capstone Project</footer>
    </div>
  );
}

// ----------------------- src/pages/Home.jsx -----------------------
import React from 'react';

export default function Home(){
  return (
    <div>
      <h2>Welcome to the Capstone Clinic</h2>
      <p>This demo site shows mockups, static pages converted to React, booking, notifications, reviews, and profile management.</p>
    </div>
  )
}

// ----------------------- src/pages/About.jsx -----------------------
import React from 'react';

export default function About(){
  return (
    <div>
      <h2>About This Project</h2>
      <p>This is a sample project for the Coursera Capstone. It includes the components required by the rubric.</p>
    </div>
  )
}

// ----------------------- src/components/Appointment.jsx -----------------------
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Appointment(){
  const [appointments, setAppointments] = useState(() => {
    const raw = localStorage.getItem('appointments');
    return raw ? JSON.parse(raw) : [];
  });
  const [form, setForm] = useState({ name: '', date: '', time: '', reason: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if(!form.name || !form.date || !form.time) {
      setMessage('Please fill name, date and time');
      return;
    }
    const newApp = { id: uuidv4(), ...form, createdAt: new Date().toISOString() };
    const next = [newApp, ...appointments];
    setAppointments(next);
    localStorage.setItem('appointments', JSON.stringify(next));
    setForm({ name: '', date: '', time: '', reason: '' });
    setMessage('Appointment booked successfully');
  }

  const handleCancel = id => {
    const next = appointments.filter(a => a.id !== id);
    setAppointments(next);
    localStorage.setItem('appointments', JSON.stringify(next));
  }

  return (
    <div>
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="card">
        <label>Name<input name="name" value={form.name} onChange={handleChange} /></label>
        <label>Date<input type="date" name="date" value={form.date} onChange={handleChange} /></label>
        <label>Time<input type="time" name="time" value={form.time} onChange={handleChange} /></label>
        <label>Reason<textarea name="reason" value={form.reason} onChange={handleChange} /></label>
        <button type="submit">Book</button>
        {message && <p className="muted">{message}</p>}
      </form>

      <section>
        <h3>Your Appointments</h3>
        {appointments.length === 0 && <p>No appointments yet.</p>}
        <ul className="list">
          {appointments.map(a => (
            <li key={a.id} className="list-item">
              <div>
                <strong>{a.name}</strong> — {a.date} @ {a.time}
                <div className="muted">{a.reason}</div>
              </div>
              <div>
                <button onClick={() => handleCancel(a.id)}>Cancel</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

// ----------------------- src/components/Notifications.jsx -----------------------
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Notifications(){
  const [notes, setNotes] = useState(() => {
    const raw = localStorage.getItem('notes');
    return raw ? JSON.parse(raw) : [
      { id: uuidv4(), text: 'Welcome to the Capstone Clinic!', read: false, time: new Date().toISOString() },
    ];
  });
  const [text, setText] = useState('');

  const add = () => {
    if(!text) return;
    const n = { id: uuidv4(), text, read: false, time: new Date().toISOString() };
    const next = [n, ...notes];
    setNotes(next);
    localStorage.setItem('notes', JSON.stringify(next));
    setText('');
  }
  const markRead = id => {
    const next = notes.map(n => n.id === id ? { ...n, read: true } : n);
    setNotes(next);
    localStorage.setItem('notes', JSON.stringify(next));
  }
  const remove = id => {
    const next = notes.filter(n => n.id !== id);
    setNotes(next);
    localStorage.setItem('notes', JSON.stringify(next));
  }

  return (
    <div>
      <h2>Notifications</h2>
      <div className="card">
        <input placeholder="Write a notification" value={text} onChange={e=>setText(e.target.value)} />
        <button onClick={add}>Add</button>
      </div>

      <ul className="list">
        {notes.map(n=> (
          <li key={n.id} className={`list-item ${n.read ? 'read' : ''}`}>
            <div>
              <div>{n.text}</div>
              <div className="muted">{new Date(n.time).toLocaleString()}</div>
            </div>
            <div>
              {!n.read && <button onClick={()=>markRead(n.id)}>Mark read</button>}
              <button onClick={()=>remove(n.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ----------------------- src/components/Reviews.jsx -----------------------
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Reviews(){
  const [reviews, setReviews] = useState(()=>{
    const raw = localStorage.getItem('reviews');
    return raw ? JSON.parse(raw) : [
      { id: uuidv4(), name: 'Priya', rating: 5, text: 'Great experience!', time: new Date().toISOString() }
    ];
  });
  const [form, setForm] = useState({ name: '', rating: 5, text: '' });

  const submit = e => {
    e.preventDefault();
    if(!form.name || !form.text) return;
    const r = { id: uuidv4(), ...form, time: new Date().toISOString() };
    const next = [r, ...reviews];
    setReviews(next);
    localStorage.setItem('reviews', JSON.stringify(next));
    setForm({ name: '', rating: 5, text: '' });
  }

  return (
    <div>
      <h2>Reviews</h2>
      <form onSubmit={submit} className="card">
        <label>Name<input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} /></label>
        <label>Rating<select value={form.rating} onChange={e=>setForm({...form, rating: Number(e.target.value)})}>
          {[5,4,3,2,1].map(r=> <option key={r} value={r}>{r}</option>)}
        </select></label>
        <label>Review<textarea value={form.text} onChange={e=>setForm({...form, text:e.target.value})} /></label>
        <button type="submit">Submit Review</button>
      </form>

      <ul className="list">
        {reviews.map(r=> (
          <li key={r.id} className="list-item">
            <div>
              <strong>{r.name}</strong> — {r.rating} ⭐
              <div className="muted">{r.text}</div>
              <div className="muted">{new Date(r.time).toLocaleString()}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ----------------------- src/components/Profile.jsx -----------------------
import React, { useState, useEffect } from 'react';

export default function Profile(){
  const [profile, setProfile] = useState(()=>{
    const raw = localStorage.getItem('profile');
    return raw ? JSON.parse(raw) : { name: '', email: '', bio: '' };
  });
  const [message, setMessage] = useState('');

  useEffect(()=>{
    localStorage.setItem('profile', JSON.stringify(profile));
  }, [profile]);

  const save = e => {
    e.preventDefault();
    setMessage('Profile saved');
    setTimeout(()=>setMessage(''), 2500);
  }

  return (
    <div>
      <h2>Profile Management</h2>
      <form onSubmit={save} className="card">
        <label>Name<input value={profile.name} onChange={e=>setProfile({...profile, name:e.target.value})} /></label>
        <label>Email<input value={profile.email} onChange={e=>setProfile({...profile, email:e.target.value})} /></label>
        <label>Bio<textarea value={profile.bio} onChange={e=>setProfile({...profile, bio:e.target.value})} /></label>
        <button type="submit">Save Profile</button>
        {message && <div className="muted">{message}</div>}
      </form>

      <div className="card">
        <h3>Current Profile</h3>
        <div><strong>Name:</strong> {profile.name || '-'} </div>
        <div><strong>Email:</strong> {profile.email || '-'} </div>
        <div><strong>Bio:</strong> {profile.bio || '-'}</div>
      </div>
    </div>
  )
}

// ----------------------- src/styles.css -----------------------
:root{ font-family: Arial, Helvetica, sans-serif; }
body{ margin:0; padding:0; background:#f6f8fa; color:#111 }
.app{ max-width:1000px; margin:24px auto; padding:12px }
.site-header{ display:flex; align-items:center; justify-content:space-between; gap:16px }
.site-header h1{ margin:0 }
.site-header nav a{ margin-left:12px; text-decoration:none }
.site-main{ margin-top:20px }
.card{ background:white; padding:12px; border-radius:8px; box-shadow:0 1px 4px rgba(0,0,0,0.06); margin-bottom:12px }
.list{ list-style:none; padding:0 }
.list-item{ display:flex; justify-content:space-between; gap:12px; padding:8px 0; border-bottom:1px solid #eee }
.muted{ color:#666; font-size:0.9em }
button{ padding:8px 10px; border-radius:6px; border:1px solid #ccc; background:#fff; cursor:pointer }
input, textarea, select{ width:100%; padding:8px; margin-top:6px; margin-bottom:8px; box-sizing:border-box }

// ----------------------- README.md -----------------------
# Capstone Project - Coursera (React)

This repository contains a sample implementation for the Coursera Capstone project. It includes mockups (not included here), static pages converted to a React app, appointment booking, notifications, reviews, profile management, and instructions to run and deploy.

## How to run
1. Clone repository
2. `npm install`
3. `npm start`

## What to upload for peer review
- GitHub repo link
- screenshots/ folder with images proving each task
- deployed link (Netlify / Vercel / GitHub Pages)

---

// ----------------------- NOTES -----------------------
// - Add a folder `screenshots/` at project root and put the required 17 screenshots.
// - To deploy: create a new site on Netlify or Vercel and connect your GitHub repo, or use `npm run build` and GitHub Pages.
// - This demo uses localStorage so peers can verify stateful components without backend.

// End of project package
