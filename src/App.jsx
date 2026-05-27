import React from "react";

function App() {
  const projects = [
    {
      title: "BRFSS Diabetes Analysis",
      description:
        "Analyzed CDC BRFSS data using Python and data visualization techniques.",
    },
    {
      title: "Mental Health and Crime Analysis",
      description:
        "Performed statistical analysis and visualization using R and Quarto.",
    },
    {
      title: "AI in Video Game Design",
      description:
        "Literature review on AI systems, reinforcement learning, and procedural generation.",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial",
        padding: "40px",
      }}
    >
      <h1 style={{ fontSize: "48px" }}>John Yuan</h1>

      <p style={{ fontSize: "20px", maxWidth: "800px" }}>
        Master's student in Applied Modelling and Quantitative Methods with
        interests in software development, QA testing, data science, and AI.
      </p>

      <div style={{ marginTop: "20px", display: "flex", gap: "15px" }}>
        <span>GitHub</span>
        <span>LinkedIn</span>
        <span>Email</span>
      </div>

      <h2 style={{ marginTop: "60px", fontSize: "32px" }}>
        Projects
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {projects.map((project) => (
          <div
            key={project.title}
            style={{
              backgroundColor: "#1e293b",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>

            <button
              style={{
                marginTop: "10px",
                padding: "10px 16px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              View Project <span>↗</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;