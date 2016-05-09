// grab the mongoose module
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Product', {
    name 		    : String,
    color 		    : [String],
    size            : [{
                          name: String,
                          color: String
                      }],
    image           : [String],
	sub_category 	: String,
    main_category   : { type: Schema.Types.ObjectId, ref: 'Category' },
    user            : { type: Schema.Types.ObjectId, ref: 'User' },
    created_date    : { type : Date, default: Date.now }
});
