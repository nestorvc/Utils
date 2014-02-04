// -----------------------
// Variables
// -----------------------

// Main dependecies
var Schema = _MONGOOSE.Schema;

// -----------------------
// Schema
// -----------------------

var ejemploSchema = new Schema({

  nombre: {
    type: String,
    default: '',
    trim: true
  },
  apellidos: {
    type: String,
    default: '',
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: {
    type: Date,
    default: null
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'Ejemplo'
  }
});


// -----------------------
// Methods
// -----------------------

ejemploSchema.method({

  createIt: function(callback) {
    console.log(_DEBUG + "CREATING EJEMPLO..."); //DEBUG
    var self = this;
    self.save(callback);
  }

});

// -----------------------
// Statics
// -----------------------

ejemploSchema.static({

  readIt: function(id, callback) {
    console.log(_DEBUG + "READING EJEMPLO..."); //DEBUG
    this.findOne({
      _id: id,
      deletedAt: null
    })
      .exec(callback)
  },

  updateIt: function(object, callback) {
    console.log(_DEBUG + "UPDATING EJEMPLO..."); //DEBUG
    this.findOneAndUpdate({
        _id: object._id
      }, {
        //field: object.field
      },
      null, callback);
  },

  upsertIt: function(id, object, callback) {
    console.log(_DEBUG + "UPSERTING EJEMPLO..."); //DEBUG
    this.findOneAndUpdate({
      _id: id,
      deletedAt: null
    }, {
      //field: object.field
    }, {
      upsert: true
    }, callback);
  },

  deleteIt: function(id, callback) {
    console.log(_DEBUG + "DELETING EJEMPLO..."); //DEBUG
    this.update({
        _id: id
      }, {
        deletedAt: Date.now()
      },
      null, callback);
  },

  loadAll: function(callback) {
    console.log(_DEBUG + "LOADING EJEMPLOS..."); //DEBUG
    this.find({
      deletedAt: null
    }).sort('createdAt')
      .lean()
      .exec(callback)
  },
});

// -----------------------
// Register
// -----------------------

_MONGOOSE.model('Ejemplo', ejemploSchema);