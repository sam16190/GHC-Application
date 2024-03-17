const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const questionsData = JSON.parse(fs.readFileSync('./assets/questions.json', 'utf-8'));

const router = express.Router();
router.get('/', (req, res) => {
  res.json(questionsData);
});

router.get('/filter', (req, res) => {
    const { category, question, correct_answer } = req.query;
  
    let filteredQuestions = questionsData;
  
    if (category) {
      filteredQuestions = filteredQuestions.filter(q => q.category === category);
    }
  
    if (question) {
      filteredQuestions = filteredQuestions.filter(q => q.question.includes(question));
    }
  
    if (correct_answer) {
      filteredQuestions = filteredQuestions.filter(q => q.correct_answer === correct_answer);
    }
  
    res.json(filteredQuestions);
  });
app.use('/api/questions', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
