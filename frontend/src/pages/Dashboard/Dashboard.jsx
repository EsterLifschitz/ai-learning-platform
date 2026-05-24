import { useState, useEffect } from 'react';
import { learningService } from '../../services/apiService';
import DashboardNav from '../../components/Dashboard/DashboardNav/DashboardNav';
import LearningForm from '../../components/Dashboard/LearningForm/LearningForm';
import AIResponseDisplay from '../../components/Dashboard/AIResponseDisplay/AIResponseDisplay';
import './Dashboard.css';

function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  const [lesson, setLesson] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await learningService.getCategories();
        setCategories(res.data || []);
      } catch (err) {
        setError('Failed to load categories.');
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategory) {
      setSubCategories([]);
      return;
    }
    const fetchSubCategories = async () => {
      try {
        const res = await learningService.getSubCategories(selectedCategory);
        setSubCategories(res.data || []);
        setSelectedSubCategory(''); 
      } catch (err) {
        setError('Failed to load subcategories.');
      }
    };
    fetchSubCategories();
  }, [selectedCategory]);

  const handleGenerateLesson = async (e) => {
    e.preventDefault();
    setError('');
    setLesson('');

    if (!selectedCategory || !selectedSubCategory || !userPrompt.trim()) {
      setError('Please fill in all setup fields');
      return;
    }

    try {
      setLoading(true);
      const res = await learningService.generatePrompt({
        category_id: selectedCategory,
        sub_category_id: selectedSubCategory,
        prompt: userPrompt
      });
      setLesson(res.data?.response || ''); 
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate lesson.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <DashboardNav />
      {error && <div className="panel-error">{error}</div>}
      <div className="workspace-container">
        <LearningForm 
          categories={categories}
          subCategories={subCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSubCategory={selectedSubCategory}
          setSelectedSubCategory={setSelectedSubCategory}
          userPrompt={userPrompt}
          setUserPrompt={setUserPrompt}
          onSubmit={handleGenerateLesson}
          loading={loading}
        />
        <AIResponseDisplay lesson={lesson} loading={loading} />
      </div>
    </div>
  );
}

export default Dashboard;