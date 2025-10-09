import React, { useState, useEffect } from "react";

export default function App() {
  const [user, setUser] = useState(localStorage.getItem("loggedInUser") || "");
  const [view, setView] = useState(user ? "home" : "signin");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);

  const quizData = [
    { q: "Who is known as the Father of the Indian Constitution?", o: ["Mahatma Gandhi", "Dr. B.R. Ambedkar", "Jawaharlal Nehru"], a: 1 },
    { q: "When did the Indian Constitution come into effect?", o: ["15th August 1947", "26th January 1950", "2nd October 1952"], a: 1 },
    { q: "Which article guarantees the Right to Equality?", o: ["Article 14", "Article 21", "Article 19"], a: 0 },
    { q: "What is the Preamble?", o: ["An introduction", "A law", "A schedule"], a: 0 },
    { q: "How many Fundamental Duties are there?", o: ["10", "11", "12"], a: 1 }
  ];

  useEffect(() => {
    if (user) localStorage.setItem("loggedInUser", user);
  }, [user]);

  const handleSignup = () => {
    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill all fields!");
      return;
    }
    localStorage.setItem("user", JSON.stringify(formData));
    alert("Registration successful! Please sign in.");
    setView("signin");
  };

  const handleSignin = () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser) {
      alert("No user found. Please sign up first.");
      return;
    }
    if (formData.email === savedUser.email && formData.password === savedUser.password) {
      setUser(savedUser.name);
      setView("home");
    } else {
      alert("Invalid email or password!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser("");
    setView("signin");
  };

  const nextQuestion = (i) => {
    if (i === quizData[quizIndex].a) setScore(score + 1);
    if (quizIndex + 1 < quizData.length) setQuizIndex(quizIndex + 1);
    else alert(`Quiz Completed! Your score: ${score + 1}/${quizData.length}`);
  };

  return (
    <div style={styles.body}>
      <header style={styles.header}>
        <h1>Indian Constitution Awareness</h1>
        <p>Empowering citizens with knowledge of their rights and duties 🇮🇳</p>
      </header>

      <nav style={styles.nav}>
        {user && (
          <>
            <a href="#preamble">Preamble</a>
            <a href="#rights">Rights & Duties</a>
            <a href="#quiz">Quiz</a>
            <a href="#timeline">Timeline</a>
          </>
        )}
        <div style={styles.auth}>
          {user ? (
            <>
              <span>Welcome, {user}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => setView("signin")}>Sign In</button>
              <button onClick={() => setView("signup")}>Sign Up</button>
            </>
          )}
        </div>
      </nav>

      {view === "signup" && (
        <div style={styles.section}>
          <h2>Sign Up</h2>
          <input
            placeholder="Full Name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button onClick={handleSignup}>Register</button>
          <p>Already have an account? <span style={{ color: "#0b3d91", cursor: "pointer" }} onClick={() => setView("signin")}>Sign In</span></p>
        </div>
      )}

      {view === "signin" && (
        <div style={styles.section}>
          <h2>Sign In</h2>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button onClick={handleSignin}>Login</button>
          <p>Don’t have an account? <span style={{ color: "#0b3d91", cursor: "pointer" }} onClick={() => setView("signup")}>Sign Up</span></p>
        </div>
      )}

      {view === "home" && (
        <>
          <section id="preamble" style={styles.section}>
            <h2>The Preamble</h2>
            <p>We, the people of India, having solemnly resolved to constitute India into a Sovereign Socialist Secular Democratic Republic...</p>
          </section>

          <section id="rights" style={styles.section}>
            <h2>Fundamental Rights & Duties</h2>
            <div style={styles.cards}>
              <div style={styles.card}><h3>Right to Equality</h3><p>Ensures equal treatment before law for all citizens.</p></div>
              <div style={styles.card}><h3>Right to Freedom</h3><p>Grants freedom of speech, expression, and movement.</p></div>
              <div style={styles.card}><h3>Right Against Exploitation</h3><p>Prohibits forced labor and child labor.</p></div>
              <div style={styles.card}><h3>Right to Remedies</h3><p>Allows citizens to approach courts for enforcement of rights.</p></div>
              <div style={styles.card}><h3>Fundamental Duties</h3><p>Encourages respect for national symbols and environmental protection.</p></div>
            </div>
          </section>

          <section id="quiz" style={styles.section}>
            <h2>Constitution Quiz</h2>
            <div style={{ textAlign: "center" }}>
              <p>{quizData[quizIndex].q}</p>
              {quizData[quizIndex].o.map((opt, i) => (
                <button key={i} style={styles.optionBtn} onClick={() => nextQuestion(i)}>{opt}</button>
              ))}
              <p>Score: {score}</p>
            </div>
          </section>

          <section id="timeline" style={styles.section}>
            <h2>Timeline of the Constitution</h2>
            <ul>
              <li>1946 - Constituent Assembly formed</li>
              <li>1949 - Constitution adopted</li>
              <li>1950 - Came into effect on January 26</li>
              <li>1976 - 42nd Amendment adds Fundamental Duties</li>
            </ul>
          </section>
        </>
      )}

      <footer style={styles.footer}>
        © 2025 Indian Constitution Awareness | Educational Purpose
      </footer>
    </div>
  );
}

const styles = {
  body: { fontFamily: "Poppins, sans-serif", background: "linear-gradient(180deg,#FF9933 0%,#FFFFFF 50%,#138808 100%)", minHeight: "100vh" },
  header: { background: "rgba(0,0,0,0.7)", color: "#fff", textAlign: "center", padding: "2rem 1rem" },
  nav: { background: "#0b3d91", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem", color: "white", padding: "1rem" },
  auth: { marginLeft: "auto", display: "flex", alignItems: "center", gap: "1rem" },
  section: { background: "rgba(255,255,255,0.9)", margin: "2rem auto", borderRadius: 10, padding: "2rem", maxWidth: 900 },
  cards: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "1rem" },
  card: { background: "#fff", padding: "1.2rem", borderRadius: 8, boxShadow: "0 2px 5px rgba(0,0,0,0.1)" },
  optionBtn: { margin: "0.5rem", padding: "0.6rem 1rem", background: "#0b3d91", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer" },
  footer: { background: "#0b3d91", color: "white", textAlign: "center", padding: "1rem" }
};
