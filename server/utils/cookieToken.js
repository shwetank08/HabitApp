const cookieToken = (user, res) => {
    const option = {
        expires: new Date(Date.now()+3*60*60*1000),
        httpOnly: true
    };
    const token = user.generateJWT();
    user.password = undefined;
    
    res.status(200).cookie("token", token, option).json({
        success: true, token, user
    });
}

export default cookieToken;