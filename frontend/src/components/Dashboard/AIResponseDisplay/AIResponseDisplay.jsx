import './AIResponseDisplay.css';

function AIResponseDisplay({ lesson, loading }) {
  return (
    <div className="workspace-panel">
      <h2 className="panel-title border-bottom">Study Workspace</h2>
      {loading && (
        <div className="loader-box">
          <div className="spinner"></div>
          <span>Generating lesson content...</span>
        </div>
      )}
      {!loading && !lesson && (
        <div className="empty-workspace">Select configurations and click "Start Lesson".</div>
      )}
      {!loading && lesson && (
        <div className="lesson-content">{lesson}</div>
      )}
    </div>
  );
}

export default AIResponseDisplay;