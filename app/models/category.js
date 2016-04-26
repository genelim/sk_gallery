// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Category', {
	main_category 		: String,
    sub_category 		: [String],
    image               : [String]
});
