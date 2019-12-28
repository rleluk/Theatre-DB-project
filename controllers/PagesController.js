exports.home = (req, res) => {
    res.render('home');
};

exports.wtf = (req, res) => {
    res.redirect('/');
};