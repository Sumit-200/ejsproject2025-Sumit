const Student = require('../models/Student');
const cloudinary = require('cloudinary').v2;
 async function addStudent(req, res) {
    try {
       // console.log(req.body, 'req.body');
       // console.log(req.file, 'req.file');
        let result;
        if(req.file) {
            cloudinary.config({
                cloud_name: "dwmgjplnv",
                api_key: "538694639438369",
                api_secret: '98S8TYBa7l5JSz69JZVJN0ybtFc'
            })
             result = await cloudinary.uploader.upload(req.file.path);
           // console.log(result);
        }
        let student = new Student(req.body);
        if(req.file) {
        
        student.studentImage = result.secure_url;
        }
        await student.save();
       // console.log("database updated....");
        let students = await Student.find({});
        res.render('studentlist',{
            students:students
        });
    } catch (err) {
        console.log(err);
    }
}
async function deleteStudent(req, res) {
    try{
        let studentId = req.params._id;
       // console.log(studentId, 'deleteStudent');
        await Student.deleteOne({ _id: studentId  });
        let students = await Student.find({});
        res.render('welcomeadmin', {
            students: students
        })
    } catch (err) {
        console.log(err);
    }

}
async function openEditPage(req ,res) {
    try {
        let studentId = req.params._id;
        let student = await Student.findOne({ _id:studentId});
        if(student) {
            res.render('studenteditpage',{
                student : student
            })
        } else {
            res.render('/');
        }
    
    
    } catch(err) {

    }
    
}

async function editStudent(req ,res) {
    try {
        const studentId = req.params._id;
      //  console.log(studentId ,'studentId');
        let student = await Student.findOne({ _id: studentId});
        if(student) {

        //    console.log(req.body, "res.body");
            student.rollNo = req.body.rollNo;
            student.studentName = req.body.studentName;
            student.fatherName = req.body.fatherName;
            student.course = req.body.course;
            student.branch = req.body.branch;
            student.yearOfAdmisson = req.body.yearOfAdmisson;
            student.yearofCompletionorDropout = req.body.yearofCompletionorDropout;
            await student.save();
            let students = await Student.find({});
            res.render('welcomeadmin' ,{
                students : students
            })

        } else {
            res.end(" student does not found....")
        }


    } catch (err){
        
    }
}

module.exports = {
    addStudent,
    deleteStudent,
    openEditPage,
    editStudent
}