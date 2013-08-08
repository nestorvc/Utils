/* ===================
    Variables
   =================== */

// Main dependecies
var Schema = _MONGOOSE.Schema;

/* ===================
    Schema
   =================== */

// Schema example
var exampleSchema = new Schema({

    id: {
        type: Number,
        default: 0,
        trim: true
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    body: {
        type: String,
        default: '',
        trim: true
    },
    /*    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    comments: [{
        body: {
            type: String,
            default: ''
        },
        user: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    tags: {
        type: [],
        get: getTags,
        set: setTags
    },
    image: {
        cdnUri: String,
        files: []
    },*/
    createdAt: {
        type: Date,
        default: Date.now
    }

});

/* ===================
    Validations
   =================== */

// Validation example
exampleSchema.path('title').validate(function(title) {
    return title.length > 0
}, 'Title must be filled');

/* ===================
    Pre-remove hooks
   =================== */

// Pre-hook example
exampleSchema.pre('remove', function(next) {
    var imager = new Imager(imagerConfig, 'S3');
    var files = this.image.files;

    // if there are files associated with the item, remove from the cloud too
    imager.remove(files, function(err) {
        if (err) return next(err);
    }, 'article');

    next();
});


/* ===================
    Methods
   =================== */

exampleSchema.method({

    //Method example
    uploadAndSave: function(cb) {
        this.save(cb);
    }

});

/* ===================
    Statics
   =================== */

exampleSchema.static({

    //Static example
    load: function(id, cb) {
        this.findOne({
            _id: id
        })
            .populate('user', 'name email')
            .populate('comments.user')
            .exec(cb)
    },
});

/* ===================
    Register
   =================== */

_MONGOOSE.model('ExampleModel', exampleSchema);