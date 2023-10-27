const fs = require(`fs`)

const HomePage = async (req, res) => {
    const filepath = (`./public/home.html`)
    const htmlContent = fs.readFileSync(filepath, `utf-8`)
    res.send(htmlContent)
}

const MovieDetailPage = async (req, res) => {
    const filepath = (`./public/movie.html`)
    const htmlContent = fs.readFileSync(filepath, `utf-8`)
    res.send(htmlContent)
}


module.exports={
    HomePage,
    MovieDetailPage,
}

