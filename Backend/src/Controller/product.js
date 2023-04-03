const productmodel = require("../Model/product");
let {
     isPresent,
     isValidadd,
     isValidPrice,

} = require("../Middleware/validation");

const createproduct = async (req, res) => {
     try {
          let data = req.body;
          console.log("file which i want", req.namefile);
          if (!req.namefile)
               return res
                    .status(400)
                    .send({ status: false, message: "please upload file" })

          if (!/[\/.](gif|jpg|jpeg|tiff|png)$/i.test(req.namefile)) {
               return res
                    .status(400)
                    .send({ status: false, message: "this file format is wrong" });
          }
          data.file = req.namefile;
          let { name, price, description } = data

          if (!isPresent(name)) return res.status(400).send({ status: false, message: "name is mandatory" })
          if (!isValidadd(name)) return res.status(400).send({ status: false, message: "name containt only these letters [a-zA-Z0-9_ ,.-]" })

          if (!isValidPrice(price)) return res.status(400).send({ status: false, message: "please write a valid price" })

          if (!isPresent(description)) return res.status(400).send({ status: false, message: "description is mandatory" })

          let user = await productmodel.create(data);
          return res.status(201).send({ status: true, message: user });
     } catch (err) {
          return res.status(500).send({ status: false, message: err.message });
     }
};

const getproduct = async (req, res) => {
     try {
          let data = await productmodel.find({ isdeleted: false });
          return res.status(200).send({ status: true, data: data });
     } catch (err) {
          return res.status(500).send({ status: false, message: err.message });
     }
};

const deleteproduct = async (req, res) => {
     try {
          let { id } = req.body;
          let data = await productmodel.findOneAndUpdate(
               { _id: id },
               { $set: { isdeleted: true } }
          );
          console.log(data);
          return res.status(200).send({ status: true, data: data });
     } catch (err) {
          return res.status(500).send({ status: false, message: err.message });
     }
};

const updateproduct = async (req, res) => {
     try {
          let data = req.body;
          data.file = req.namefile;

          let { id, name, price, description } = data;

          if (!isPresent(name)) return res.status(400).send({ status: false, message: "name is mandatory" })
          if (!isValidadd(name)) return res.status(400).send({ status: false, message: "name containt only these letters [a-zA-Z0-9_ ,.-]" })

          if (!isValidPrice(price)) return res.status(400).send({ status: false, message: "please write a valid price" })

          if (!isPresent(description)) return res.status(400).send({ status: false, message: "description is mandatory" })

          console.log("data we want to update is", data);

          let user = await productmodel.findOneAndUpdate(
               { _id: id },
               { $set: data },
               { new: true }
          );
          return res.status(200).send({ status: true, data: user });
     } catch (err) {
          return res.status(500).send({ status: false, message: err.message });
     }
};

const getbyid = async (req, res) => {
     try {
          console.log(req.params.id);
          let data = await productmodel.findById(req.params.id);
          return res.status(200).send({ status: true, data: data });
     } catch (err) {
          return res.status(500).send({ status: false, message: err.message });
     }
};

const searchproduct = async (req, res) => {
     try {
          let data = req.body;
          let { name } = data;
          let obj = { isdeleted: false };
          obj["name"] = { $regex: `${name}` };
          console.log("data which we are", data, obj);

          let user = await productmodel.find(obj);
          console.log("users info are here", user);
          return res.status(200).send({ status: true, data: user });
     } catch (err) {
          return res.status(500).send({ status: false, message: err.message });
     }
};

module.exports = {
     createproduct,
     getproduct,
     deleteproduct,
     updateproduct,
     getbyid,
     searchproduct,
}
