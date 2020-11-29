const db = require("../models");
const Resource = db.resources;

// Create and Save a new Resource.
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
  }

  //Create a Resources
  const resource = new Resource({
      topic: req.body.topic,
      title: req.body.title,
      description: req.body.description,
      url: req.body.url,
      category: req.body.category,
      published: req.body.published ? req.body.published : false
  });

  //Save Resource in the database
  resource
    .save(resource)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Some error occurred while creating the Resource." });
    });
};

//Retrieve all Resources from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Tutorial.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving resources." });
    });
};

// Find a single Resources with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Resource.findById(id)
    .then(data => {
        if (!data)
            res.status(404).send({ message: "Not found Resource with id " + id });
        else res.send(data);
    })
    .catch(err => {
        res
            .status(500)
            .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

// Update a Resource by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update can not be empty!" });
      }

      const id = req.params.id;
    
      Resource.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({ message: `Cannot update Resource with id=${id}. Maybe Resource was not found!` });
          } else res.send({ message: "Resource was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({ message: "Error updating Resource with id=" + id });
        });
};

// Delete a Resource with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

  Resource.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `Cannot delete Resource with id=${id}. Maybe Resource was not found!` });
      } else {
        res.send({
          message: "Resource was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete Resource with id=" + id });
};

// Delete all Resources from the database.
exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// Find all published Resources
exports.findAllPublished = (req, res) => {
  
};