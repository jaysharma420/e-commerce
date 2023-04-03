const usermodel = require("../Model/User")
let {
    isPresent, 
    isValidName, isValidEmail, isValidPassword
} = require("../Middleware/validation")

const registration = async function (req, res) {
    try {
        const data = req.body
        if (Object.keys(data).length == 0 ) return res.status(400).send({ status: false, message: "Please Enter data to Register the User" })

        let {name,password,email} = data

        if (!isPresent(name)) return res.status(400).send({ status: false, message: "name is mandatory" })
        if (!isValidName(name)) return res.status(400).send({ status: false, message: "Please Provide the valid name" })

        if (!isPresent(email)) return res.status(400).send({ status: false, message: "email is mandatory" })
        if (!isValidEmail(email)) return res.status(400).send({ status: false, message: "email should be in  valid format eg:- name@gmail.com" })
        if (await usermodel.findOne({ email })) return res.status(400).send({ status: false, message: "This email is already Registered Please give another Email" })

        if (!isPresent(password)) return res.status(400).send({ status: false, message: "Password is mandatory" })
        if (!isValidPassword(password)) return res.status(400).send({ status: false, message: "password must have {8-15} character one capital one small one number and one special character[#?!@$%^&*-]" })

        const user = await usermodel.create(data)
        return res.status(201).send({ status: true, data: user })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
const Login = async (req, res) => {
    try {
        const data = req.body
        let {password,email} = data

        if (Object.entries(req.body).length === 0) {
            return res.status(400).send({ status: false, message: "Please enter email and Password" })
        }
        if (!isPresent(email)) {
            return res.status(400).send({ status: false, message: "Please enter email" })
        }
        if (!isValidEmail(email)) {
            return res.status(400).send({ status: false, message: "Please enter Email in correct format like jay58@gmail.com" })
        }
        if (!isPresent(password)) {
            return res.status(400).send({ status: false, message: "Please enter Password" })
        }
        if (!isValidPassword(password)) {
            return res.status(400).send({ status: false, message: "password must have {8-15} character one capital one small one number and one special character[#?!@$%^&*-]" })
        }

        const user = await usermodel.findOne(data)
        if (!user) return res.status(404).send({ status: false, message: "user not found" })
        return res.status(200).send({ status: false, data: user })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { registration, Login }