const express = require('express');

const Post = require('../models/posts');

const checkAuth = require('../middlware/check-auth');

const router = express.Router();

const extractFile = require('../middlware/file')



router.post('', extractFile , checkAuth, function(req, res, next) {
  const url = req.protocol + '://' + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  }); // input incoming

  // send data to database
  return post.save().then((createdPost) => {
    console.log(createdPost);
    res.status(201).json({
      message: 'Posts Created Succesfuly!',
      posts: {...createdPost}
    });
  })
  next();
});


router.get('', function(req, res, next) {

  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  let fetchedPosts;
  const postQuery = Post.find();

  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

    postQuery.then(documents => {
        console.log(documents); // data [ {} ]
        fetchedPosts = documents;
        return Post.count();
      }).then(count => {
        res.status(200).json({
          message: 'Posts Succesfuly!',
          posts: fetchedPosts,
          totalPosts: count
        });
      })

  });

// deleleted api post
router.delete('/:id', checkAuth,  (req, res, next) => {
    Post.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
      console.log(result);
      if(result.n > 0) {
      res.status(200).json({ message: 'Deleting Successfuly'})
      } else {
      res.status(401).json({message: 'Not authorized'})
      }
    })
});

  module.exports = router;
