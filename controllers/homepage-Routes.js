const router = require('express').Router();
const { User, Department, Jobs, Employee } = require('../models');
const { checkAuthenticated } = require('../utils/checkAuth');

// New route for /homepage
router.get('/homepage', checkAuthenticated, async (req, res) =>{
  res.render('homepage');
})

// Existing route
router.get('/', checkAuthenticated, async (req, res) =>{
  res.render('homepage');
})

// GET All Departments
router.get('/departments', async (req, res) => {
  try {
      const departmentData = await Department.findAll({
          include: [
              { 
                  model: Jobs,
                  include: [ Employee ] 
              }
          ]
      });

      const departments = departmentData.map((department) => department.get({ plain: true }));

      res.render('departments', { departments });
  } catch (err) {
      res.status(500).json(err);
  };
});



// GET a single Department by id
router.get('/departments/:id', async (req, res) => {
  try {
      const departmentData = await Department.findByPk(req.params.id, {
          include: [
              { 
                  model: Jobs,
                  include: [ Employee ] 
              }
          ]
      });

      if (!departmentData) {
          res.status(404).json({ message: 'No department found with this id!' });
          return;
      }

      const department = departmentData.get({ plain: true });

      res.render('department', { department });
  } catch (err) {
      res.status(500).json(err);
  };
});

module.exports = router;