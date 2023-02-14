const uuid = require("uuid")
const fs = require("fs")


const file = process.cwd() + "/data/users.json";
const uniqueRandomID = uuid.v4()

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';

exports.create = (req, res) => {
  const { name, isAdmin, username, password } = req.body
  console.log(req.body)

  fs.readFile(file, "utf-8", async (readErr, data) => {
    if (readErr) {
      res.json({ status: "false", message: readErr })
    }

    const obj = data ? JSON.parse(data) : []

    const newPassword = await bcrypt.hash(password, saltRounds);
    console.log(newPassword);
    const newUser = {
      id: uniqueRandomID,
      name, isAdmin, username, password: newPassword
    }

    obj.push(newUser)

    fs.writeFile(file, JSON.stringify(obj), (err) => {
      if (err) {
        res.json({ status: "false", message: err })
      }

      res.json({ status: true, result: obj })
    })
  })
}
exports.update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body
  fs.readFile(file, "utf-8", (readErr, data) => {
    if (readErr) {
      return res.json({ status: false, message: readErr });
    }

    const parsedData = JSON.parse(data);

    const updateData = parsedData.map((userObj) => {
      if (userObj.id == id) {
        return { ...userObj, name };
      } else {
        return userObj;
      }
    });

    fs.writeFile(file, JSON.stringify(updateData), (writeErr) => {
      if (writeErr) {
        return res.json({ status: false, message: writeErr });
      }

      return res.json({ status: true, result: updateData });
    });
  });
};

exports.getAll = (req, res) => {
  fs.readFile(file, "utf-8", (readErr, data) => {
    if (readErr) {
      res.json({ status: "false", message: readErr })
    }

    const obj = data ? JSON.parse(data) : []
    res.json({ status: true, result: obj })
  })
}

exports.delete = (req, res) => {

  const { id } = req.params;
  fs.readFile(file, "utf-8", (readErr, data) => {
    if (readErr) {
      res.json({ status: "false", message: readErr })
    }

    const obj = data ? JSON.parse(data) : []
    const newArr = obj.filter((e) => {

      return e.id != id
    })

    fs.writeFile(file, JSON.stringify(newArr), (err) => {
      if (err) {
        res.json({ status: "false", message: err })
      }

      res.json({ status: true, result: newArr })
    })

    res.json({ status: true, result: newArr })
  })
}

exports.login = (req, res) => {
  const { username, password } = req.body
  if (!username || !password) return res.json({ status: false, message: "Please complete your information" })

  fs.readFile(file, "utf-8",async (readErr, data) => {
    if (readErr) {
      return res.json({ status: false, message: readErr })
    }

    const parsedData = data ? JSON.parse(data) : [];
    
    let user;
    for (let i = 0; i < parsedData.length; i++) {
      if (username == parsedData[i].username) {
        const decrypt = await bcrypt.compare(
          password,
          parsedData[i].password
        );

        if (decrypt) {
          user = {
            id: parsedData[i].id,
            username: parsedData[i].username,
            isAdmin:parsedData[i].isAdmin,
            name:parsedData[i].name
          };
          break;
        }
      }
    }

    if (user) {
      return res.json({
        status: true,
        result: user
      })
    }
    else {
      return res.json({
        status: false,
        message: "Tanii email esvel nuuts ug buruu baina"
      })
    }

  })
}
