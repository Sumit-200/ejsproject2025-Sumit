const User = require('./models/User');
const bcrypt = require('bcrypt');
async function makeAdmin() {
    try {
        let user = await User.findOne({email: 'Sumit@gmail.com'});
        if(user) {
            console.log("User Updated...");

        } else {

        
        let user = new User ();
        user.firstName = 'Sumit';
        user.lastName = 'kumar';
        user.email = 'Sumit@gmail.com';
        user.password = '123456'
        let encryptredPassword = bcrypt.hashSync('123456', 10);
        user.password = encryptredPassword;
        user.userType = 'Admin';
        await user.save();
        console.log('User Saved Sucessfully............')
        }
    } catch(err) {
        console.log(err)

    }
}
module.exports = makeAdmin