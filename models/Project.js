const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    },
    lang: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true
    },
    download: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Projects', ProjectSchema);
