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
  },
  modifiedAt: {
    type: Date,
    default: Date.now
  }

});


/* ===================
    Methods
   =================== */

exampleSchema.method({

  createIt: function(callback) {
    console.log(_DEBUG + "CREATING..."); //DEBUG
    var self = this;
    self.save(callback);
  }

});

/* ===================
    Statics
   =================== */

exampleSchema.static({

  readIt: function(id, callback) {
    console.log(_DEBUG + "READING..."); //DEBUG
    this.findOne({
      _id: id
    })
      .exec(callback)
  },

  updateIt: function(id, object, callback) {
    console.log(_DEBUG + "UPDATING..."); //DEBUG
    this.update({
        _id: id
      }, {
        //Estos params son custom según el modelo que se esté actualizando
        title: object.title,
        body: object.body,
        modifiedAt: Date.now(),
      },
      null, callback);
  },

  deleteIt: function(id, callback) {
    console.log(_DEBUG + "DELETING..."); //DEBUG
    this.update({
        _id: id
      }, {
        deletedAt: Date.now()
      },
      null, callback);
  },

  loadAll: function(callback) {
    console.log(_DEBUG + "LOADING..."); //DEBUG
    this.find().sort('createdAt').exec(callback)
  },
});

/* ===================
    Register
   =================== */

_MONGOOSE.model('ExampleModel', exampleSchema);