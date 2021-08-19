//catch the frontend routes(Crud Operation)
const router = require("express").Router();//import router
let Student = require("../models/student");

//frontend url(http://localhost:8070/student/add)  
router.route("/add").post((req,res)=>{//route for create or insert
    const name = req.body.name;
    const age = Number(req.body.age);//cast number format. without destructure method
    const gender = req.body.gender;

    const newStudent = new Student({
        name,
        age,
        gender
    })

    //pass the object to the db
    newStudent.save()
    .then(()=>{
        res.json("Student is added")
    }).catch((err)=>{
        console.log(err);
    })

})

//frontend url(http://localhost:8070/student)
router.route("/").get((req,res)=>{//route for display all student
    Student.find()
    .then((students)=>{
        res.json(students)
    }).catch((err)=>{
        console.log(err)
    })
})

//frontend url for update student details(http://localhost:8070/student/update/345fgt98)
router.route("/update/:id").put(async(req,res)=>{//put method used for update details
    let userId = req.params.id;
    const {name,age,gender} = req.body;//using destructure method

    const updateStudent ={//creates an object for the data needed to update.
        name,
        age,
        gender//this data comes from frontend
    }
    await Student.findByIdAndUpdate(userId,updateStudent)
    .then(()=>{//if update is success send response to the frontend
        res.status(200).send({status: "User Updated"})//status is not a key word. we can use any word insteated of that word

    }).catch((err)=>{
        console.log(err);//if getting an error display that error in the console 
        res.status(500).send({status: "Error with updating data"});//and display the error msg in frontend
    })
})

router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;

    await Student.findByIdAndDelete(userId)//find the user using id
    .then(()=>{
        res.status(200).send({status: "User deleted"})//send the response to the frontend
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with delete user"})//500 is internal server error
    })
})

router.route("/get/:id").get(async(req,res)=>{
    let userId = req.params.id;//fetch user id
    await Student.findById(userId)
    .then((students)=>{
        //res.json(students)
        res.status(200).send({status: "User fetched",students})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with get user"})//send error to the backend using response code and status
    })
})

module.exports = router;//export the router