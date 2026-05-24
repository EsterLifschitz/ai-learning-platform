import './LearningForm.css';

function LearningForm({ 
  categories, subCategories, selectedCategory, setSelectedCategory, 
  selectedSubCategory, setSelectedSubCategory, userPrompt, setUserPrompt, 
  onSubmit, loading 
}) {
  return (
    <div className="setup-panel">
      <h2 className="panel-title">Lesson Setup</h2>
      <form onSubmit={onSubmit} className="setup-form">
        <div className="select-group">
          <label className="select-label">Category</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)} 
            className="custom-select"
          >
            <option value="">Select Category</option>
            {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
          </select>
        </div>

        <div className="select-group">
          <label className="select-label">Subcategory</label>
          <select 
            value={selectedSubCategory} 
            disabled={!selectedCategory} 
            onChange={(e) => setSelectedSubCategory(e.target.value)} 
            className="custom-select disabled-select"
          >
            <option value="">Select Subcategory</option>
            {subCategories.map(sub => <option key={sub._id} value={sub._id}>{sub.name}</option>)}
          </select>
        </div>

        <div className="select-group">
          <label className="select-label">What do you want to learn?</label>
          <textarea 
            value={userPrompt} 
            onChange={(e) => setUserPrompt(e.target.value)} 
            className="custom-textarea" 
            placeholder="Ask anything..."
          ></textarea>
        </div>

        <button type="submit" disabled={loading} className="generate-btn">
          {loading ? 'Generating...' : 'Start Lesson'}
        </button>
      </form>
    </div>
  );
}

export default LearningForm;