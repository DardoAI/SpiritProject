import React from "react";

const Home = () => {
  return (
    <div className="container border border-dark d-flex flex-column gap-5 p-5 text-white">
      <div className="d-flex flex-column align-items-center">
        <h1>Spirit</h1>
        <p>Ask, and I will discover for you.</p>
      </div>
      <div className="d-flex flex-row gap-2">
        <textarea
          className="form-control"
          rows="3"
          placeholder="Type your text here..."
        ></textarea>
        <button className="btn btn-primary">Content Preview</button>
      </div>
      <div>
        <p>Here your preview will be displayed</p>
      </div>
      <div className="d-flex flex-column align-items-center">
        <button className="btn btn-primary">Discover</button>
      </div>
    </div>
  );
};

export default Home;
