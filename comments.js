// Create web server

var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var Post = require('../models/post');

// GET /comments
router.get('/', function(req, res, next) {
  Comment.find(function(err, comments) {
    if (err) {
      return next(err);
    }
    res.json(comments);
  });
});

// POST /comments
router.post('/', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.save(function(err, comment) {
    if (err) {
      return next(err);
    }
    res.json(201, comment);
  });
});

// GET /comments/:id
router.get('/:id', function(req, res, next) {
  Comment.findById(req.params.id, function(err, comment) {
    if (err) {
      return next(err);
    }
    res.json(comment);
  });
});

// PUT /comments/:id
router.put('/:id', function(req, res, next) {
  Comment.findById(req.params.id, function(err, comment) {
    if (err) {
      return next(err);
    }
    comment.content = req.body.content;
    comment.save(function(err, comment) {
      if (err) {
        return next(err);
      }
      res.json(comment);
    });
  });
});

// DELETE /comments/:id
router.delete('/:id', function(req, res, next) {
  Comment.findByIdAndRemove(req.params.id, function(err, comment) {
    if (err) {
      return next(err);
    }
    res.json(comment);
  });
});

// GET /comments/post/:id
router.get('/post/:id', function(req, res, next) {
  Comment.find({post: req.params.id}, function(err, comments) {
    if (err) {
      return next(err);
    }
    res.json(comments);
  });
});

// POST /comments/post/:id
router.post('/post/:id', function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    var comment = new Comment(req.body);
    comment.post = post;
    comment.save(function(err, comment) {
      if (err) {
        return next(err);
      }
      res.json(201, comment);
    });
  });
});

module.exports = router;