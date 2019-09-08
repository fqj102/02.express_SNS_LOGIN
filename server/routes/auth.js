const express = require('express');
const router = express.Router();
const passport = require('passport')

router.get('/', (req, res, next) => {
  const exUser = req.user
  if (exUser){
    res.send({ 
      message:'유저있음',
      user:req.user,
    });
  } else {
    res.send({
      message:'로그인 필요',
      user:null,
    })
  }
})


router.get('/logout',(req, res, next) => {
  req.logout();
  req.session.destroy();
  res.redirect('/')
});

// kakao 로그인
router.get('/kakao', passport.authenticate('kakao'));
router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  console.log('4. 카카오 콜백.. 결과 응답을 반환합니다.');
  // res.send({'message':'처리..'})
  res.redirect('/')
});

// naver 로그인
router.get('/naver', passport.authenticate('naver'));
router.get('/naver/callback', passport.authenticate('naver', {
  failureRedirect: '/',
}), (req, res) => {
  console.log('4 네이버 콜백.. 결과 응답을 반환합니다.');
  res.redirect('/')
});

// facebook 로그인
router.get('/facebook', passport.authenticate('facebook', {
  authType: 'rerequest',
  scope: ['public_profile','email']
}));
router.get('/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/',
}), (req, res) => {
  console.log('4 페이스북 콜백.. 결과 응답을 반환합니다.');
  res.redirect('/')
});

// Github 로그인
router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/',
}), (req, res) => {
  console.log('4 깃헙 콜백.. 결과 응답을 반환합니다.');
  res.redirect('/')
});


module.exports = router;