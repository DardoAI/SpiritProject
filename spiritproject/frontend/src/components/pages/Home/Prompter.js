const Prompter = ({ prompt, setPrompt, sendPreviewContent, setStage }) => {
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
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>
        <button
          className="btn btn-primary"
          onClick={(event) => sendPreviewContent(event)}
        >
          Content Preview
        </button>
      </div>
      <div>
        <p>Here your preview will be displayed</p>
      </div>
      <div className="d-flex flex-column align-items-center">
        <button
          className="btn btn-primary"
          onClick={() => {
            if (prompt.length > 0) setStage(1);
          }}
        >
          Discover
        </button>
      </div>
    </div>
  );
};

export default Prompter;
