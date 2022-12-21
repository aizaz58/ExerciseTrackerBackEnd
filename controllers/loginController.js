const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const logInController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check if user provide email and password
  if (!(email && password)) {
    return res
      .status(400)
      .json({
        statusText: "fail",
        message: "please provide email and password",
      });
  }


  //check if user with this  email exists or not

  const user = await User.findOne({ email }).exec()

  if (!user) {
    return res
      .status(404)
      .json({ statusText: "fail", message: "user does not exist" });
  }

  //check provided password is correct or not
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const accessToken = jwt.sign(
     {"userInfo": { "email": user.email ,"firstName":user.firstName,"lastName":user.lastName,"id":user._id}},
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15min" }
    );
    const refreshToken = jwt.sign(
      {"userInfo": { "email": user.email ,"firstName":user.firstName,"lastName":user.lastName,"id":user._id}},
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    //cookie with refreshtoken
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //only accessible by web server not through js
      secure: true,
      sameSite: "None", //cross-site cookie
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res
      .status(200)
      .json({
        statusText: "ok",
        message: `${user.firstName} successfully logged in.`,
        accessToken: accessToken,
      });
  } else {
    return res
      .status(401)
      .json({
        statusText: "fail",
        message: "pleaase provide correct password.",
      });
  }
});

const refresh = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res
      .status(401)
      .json({ statusText: "fail", message: "unAuthorized" });
  }
  const refreshToken=cookies.jwt

  jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,asyncHandler(async(err,decoded)=>{

if(err)return res.status(403).json({statusText:"fail",message:"forbidden"})


const foundUser=await User.findOne({email:decoded.userInfo.email}).select('-password').exec()

if(!foundUser)return res.status(401).json({statusText:"fail",message:"unAuthorized"})

const accessToken = jwt.sign(
    {"userInfo": { "email": foundUser.email ,"firstName":foundUser.firstName,"lastName":foundUser.lastName,"id":foundUser._id}},
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15min" }
  );


res.json({accessToken,foundUser})
  }))
};

const logOut = (req, res) => {
    const cookie=req.cookies
    if(!cookie?.jwt)return res.status(204).json({statusText:"fail",message:"noContent"})
    res.clearCookie("jwt",{sameSite:"None",httpOnly:true,secure:true})
    res.json({statusText:"ok",message:"successfully logOut"})
};
module.exports = { logInController, refresh, logOut };
