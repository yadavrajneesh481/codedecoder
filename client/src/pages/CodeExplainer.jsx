import React, { useState } from 'react';
import axios from "axios";
import "./CodeExplainer.css"
import ReactMarkdown from "react-markdown";
import { useNavigate } from 'react-router-dom';

function CodeExplainer() {
    const [codeInput, setCodeInput] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleExplain = async () => {
        if (!codeInput.trim()) return;

        setLoading(true);

        try {
            // Get token from localStorage
            const token = localStorage.getItem("token");

            if (!token) {
                alert("You must be logged in to use this feature");
                navigate("/login");
                return;
            }

            // Send token in Authorization header
            const res = await axios.post(
                "https://codedecoder-1.onrender.com/api/explain/code",
                { code: codeInput },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            setResponse(res.data.output);
        } catch (error) {
            console.error("Error:", error);
            setResponse("⚠ Error: Failed to get AI response");
        }

        setLoading(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <div className="wrapper">
            <div className="topbar">
                <div className="logo">⚡ Code Explainer IDE</div>
    <div>
    <button className='btn' ><a href="/" style={{color:"white", textDecoration:"none"}}>Home</a></button>
    <button className='btn' onClick={handleLogout}>Logout</button>
    </div>
            </div>

            <div className="card-container">
                <div className="input-card">
                    <div className="subtitle">Code Editor</div>

                    <div className="editor-wrapper">
                        <textarea
                            className="code-input"
                            value={codeInput}
                            onChange={(e) => setCodeInput(e.target.value)}
                            placeholder="// Write your code here..."
                        ></textarea>
                    </div>

                    <button
                        className="btn"
                        onClick={handleExplain}
                        disabled={loading || !codeInput.trim()}
                    >
                        {loading ? "⏳ thinking..." : "Explain Code"}
                    </button>
                </div>

                <div className="output-card">
                    <div className="subtitle">AI Explanation</div>
                    <div className="explanation-output">
                        <ReactMarkdown>{response}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeExplainer;
