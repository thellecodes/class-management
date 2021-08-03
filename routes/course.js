const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const db = require("../config/db");

router.post("/create", (req, res) => {
  const { name } = req.body;

  // Simple validation
  if (!name) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // sql for user
  let sqlCheck = `SELECT * from courses WHERE slug = ?`;
  let sql = "INSERT INTO courses SET ?";
  const slug = slugify(name).toLowerCase();

  db.query(sqlCheck, slug, (err, course) => {
    if (course.length > 0)
      return res.status(400).json({ msg: "Course Exists" });

    const data = {
      course_name: name.toLowerCase(),
      slug: slugify(name).toLowerCase(),
    };

    db.query(sql, data, (err, result) => {
      if (err) {
        return res.status(401).json({ msg: "Unable to store data" });
      }

      return res.status(200).json({ data });
    });
  });
});

router.get("/", (req, res) => {
  let getQuery = `SELECT * FROM courses`;

  db.query(getQuery, (err, result) => {
    return res.status(200).json(result);
  });
});

router.put("/", (req, res) => {
  const { course_name, students, slug } = req.body;
  const newSlug = slugify(course_name).toLowerCase();

  if (students.length == 0)
    return res.status(400).json({ msg: "Please add students to this course" });

  var updatedata =
    "UPDATE courses SET course_name = ?, course_students = ?, slug = ? WHERE slug = ?";

  db.query(
    updatedata,
    [
      course_name.toLowerCase(),
      students.toString().toLowerCase(),
      newSlug,
      slug,
    ],
    function (error) {
      if (error) return res.status(400).json({ msg: "Unable to update" });

      res.status(200).json({ msg: "updated" });
    }
  );
});

router.delete("/", (req, res) => {
  const { course_id } = req.body;

  let delQuery = "DELETE FROM courses WHERE course_id = ?";
  db.query(delQuery, [course_id], (err, result) => {
    if (err) {
      res.send(err).status(400);
    } else {
      res.json({ success: true }).status(200);
    }
  });
});

module.exports = router;
