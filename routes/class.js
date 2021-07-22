const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const db = require("../config/db");
const { v4: uuidV4 } = require("uuid");

router.post("/create", (req, res) => {
  const { name } = req.body;

  // Simple validation
  if (!name) {
    return res.status(400).json({ msg: "Please enter class name" });
  }

  // sql for user
  let sqlCheck = `SELECT * from classes WHERE slug = ?`;
  let sql = "INSERT INTO classes SET ?";
  const slug = slugify(name).toLowerCase();

  db.query(sqlCheck, slug, (err, course) => {
    if (course.length > 0) return res.status(400).json({ msg: "Class Exists" });

    const data = {
      class_name: name.toLowerCase(),
      slug: slugify(name).toLowerCase(),
      uid: uuidV4(),
    };

    db.query(sql, data, (err) => {
      if (err) {
        return res.status(401).json({ msg: "Unable to store data" });
      }

      return res.status(200).json({ data });
    });
  });
});

router.get("/", (req, res) => {
  let getQuery = `SELECT * FROM classes`;

  db.query(getQuery, (err, result) => {
    return res.status(200).json(result);
  });
});

router.put("/", (req, res) => {
  const { class_name, slug } = req.body;
  const newSlug = slugify(class_name).toLowerCase();

  var updatedata = "UPDATE classes SET class_name = ?, slug = ? WHERE slug = ?";

  console.log(req.body);

  db.query(
    updatedata,
    [class_name.toLowerCase(), newSlug, slug],
    function (error) {
      if (error) return res.status(400).json({ msg: "Unable to update" });

      res.status(200).json({ msg: "updated" });
    }
  );
});

router.delete("/:uid", (req, res) => {
  const { uid } = req.params;
  let delQuery = "DELETE FROM classes WHERE uid = ?";
  db.query(delQuery, [uid], (err, result) => {
    if (err) {
      res.send(err).status(400);
    } else {
      res.json({ success: true }).status(200);
    }
  });
});

module.exports = router;
