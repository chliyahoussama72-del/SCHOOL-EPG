const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, studentController.getAllStudents);
router.post('/', auth, studentController.createStudent);
router.get('/:id', auth, studentController.getStudentById);
router.put('/:id', auth, studentController.updateStudent);
router.delete('/:id', auth, studentController.deleteStudent);

module.exports = router;
