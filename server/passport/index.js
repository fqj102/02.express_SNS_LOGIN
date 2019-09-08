const KakaoStrategy = require('passport-kakao').Strategy;
const NaverStrategy = require('passport-naver').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GithubStrategy = require('passport-github').Strategy;

const { User } = require('../models');

module.exports = (passport) => {

  passport.serializeUser((user, done) => {
    console.log('3. 로그인 완료.. 시리얼라이저')
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log('3. 세션정보 확인.. 디 시리얼라이저')
    User.findAll({
      where: { id },
    })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  // 카카오 로그인 전략
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: '/api/auth/kakao/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('1. 카카오 프로필정보를 확인합니다.')
    try {
      const exUser = await User.findAll({
        where: {
          snsId: profile.id,
          provider: 'kakao',
        }
      });
      if (exUser[0]) {
        console.log('2. DB에 유저 정보가 있습니다.', exUser[0].email)
        done(null, exUser[0]);
      } else {
        console.log('2. DB에 유저가 존재하지 않습니다. 유저를생성합니다.')
        const newUser = await User.create({
          email: profile._json && profile._json.kaccount_email,
          nick: profile.displayName,
          snsId: profile.id,
          provider: 'kakao',
        });
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }
  ))

  // 네이버 로그인 전략
  passport.use(new NaverStrategy({
    clientID: process.env.NAVER_ID,
    clientSecret: process.env.NAVER_SECRET,
    callbackURL: '/api/auth/naver/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('1. 네이버 프로필정보를 확인합니다.')
    try {
      const exUser = await User.findAll({
        where: {
          snsId: profile.id,
          provider: 'naver',
        }
      });
      if (exUser[0]) {
        console.log('2. DB에 유저 정보가 있습니다.', exUser[0].email)
        done(null, exUser[0]);
      } else {
        console.log('2. DB에 유저가 존재하지 않습니다. 유저를생성합니다.')
        const newUser = await User.create({
          email: profile.emails[0].value,
          nick: profile.displayName,
          snsId: profile.id,
          provider: 'naver',
        });
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }
  ))

  // 페이스북 로그인 전략
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: '/api/auth/facebook/callback',
    profileFields: ['id', 'email', 'displayName']
    // 페북 로그인은 이메일을 보여주기 위해 필드 설정을 해줘야함..
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('1. 페이스북 프로필정보를 확인합니다.')
    try {
      const exUser = await User.findAll({
        where: {
          snsId: profile.id,
          provider: 'facebook',
        }
      });
      if (exUser[0]) {
        console.log('2. DB에 유저 정보가 있습니다.', exUser[0].email)
        done(null, exUser[0]);
      } else {
        console.log('2. DB에 유저가 존재하지 않습니다. 유저를생성합니다.')
        const newUser = await User.create({
          email: profile.emails[0].value,
          nick: profile.displayName,
          snsId: profile.id,
          provider: 'facebook',
        });
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }
  ))

  // 깃허브 로그인 전략
  passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    scope: ['user:email']
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('1. 깃헙 프로필정보를 확인합니다.')
    // console.log(profile)
    try {
      const exUser = await User.findAll({
        where: {
          snsId: profile.id,
          provider: 'github',
        }
      });
      if (exUser[0]) {
        console.log('2. DB에 유저 정보가 있습니다.', exUser[0].email)
        done(null, exUser[0]);
      } else {
        console.log('2. DB에 유저가 존재하지 않습니다. 유저를생성합니다.')
        const newUser = await User.create({
          email: profile.emails[0].value,
          nick: profile.username,
          snsId: profile.id,
          provider: 'github',
        });
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }
  ))
}