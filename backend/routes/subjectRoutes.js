// routes/subjectRoutes.js

const express = require('express');
const router = express.Router();

const {getSubject,getSubjectId,addSubject,updateSubject,deleteSubject} = require('../controllers/subjectController');

// Protected routes (require authentication)
router.post('/add',addSubject);
router.get('/', getSubject);
router.get('/:id', getSubjectId);
router.put('/update/:id', updateSubject);
router.delete('/delete/:id', deleteSubject);

module.exports = router;