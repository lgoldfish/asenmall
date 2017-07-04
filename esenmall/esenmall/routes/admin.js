var express = require('express');
var router = express.Router()
var path = require('path');
var fs = require("fs")
var Banner = require(path.join(__dirname, "../models/Banner.js"))
var Commodity = require(path.join(__dirname, "../models/Commodity.js"))
var User = require(path.join(__dirname, "../models/User.js"))
var Media = require(path.join(__dirname, "../models/Media.js"))
var Feedback = require(path.join(__dirname, "../models/Feedback.js"))
var multer = require('multer');
var upload = multer({ dest: "public/images/" })
var EventEmitter = require('events').EventEmitter;

router.get("/", function(req, res) {
        res.render("admin/login")
        console.log("admin")
    })
    // admin/home 页路由 及渲染商品管理页面 --------------------------------------------------------
router.get("/home", function(req, res) {
        console.log("cookie999", req.cookies)
        if (req.cookies.username) {
            var page = req.query.page || 1;
            var pageCount = 8;
            Commodity.count().then((aCount) => {
                Commodity.find({}).skip((page - 1) * pageCount).limit(pageCount).sort({ _id: -1 }).then((data) => {

                    res.render("admin/home", {
                        title: "待操作",
                        userregist: "未提交",
                        username: req.cookies.username,
                        count: aCount,
                        commodity: data,
                        commodityCount: Math.ceil(aCount / pageCount),
                        currentPage: page
                    })

                }, (err) => {
                    res.send("err", err)
                })

            }, (err) => {
                console.log("查询数据总条数失败")
            })
        } else {
            res.redirect("/admin")
        }
    })
    //商品分类查询
router.post("/home/select", function(req, res) {
    var page = req.query.page || 1;
    var pageCount = 100;
    Feedback.count({ id: req.body.id }).then((aCount) => {
        Feedback.find({ id: req.body.id }).skip((page - 1) * pageCount).limit(pageCount).sort({ _id: -1 }).then((data) => {
            console.log("Commodity数据", data)
            res.render("admin/home", {
                title: "查询成功",
                commodity: data,
                commodityCount: Math.ceil(aCount / pageCount),
                currentPage: page,
                count: aCount,
                username: req.cookies.username
            })

        }, (err) => {
            res.send("err", err)
        })

    }, (err) => {
        console.log("查询数据总条数失败")
    })
})

// 添加/更新banner 图 页面-----------------------------------------------------------------

router.get("/home/banner", (req, res) => {
    res.render("admin/banner", {
        username: req.cookies.username,
        status: "待操作",
    })
})
router.post("/home/banner", upload.single("image"), (req, res) => {
    Banner.find({ id: req.body.id }).then((data) => {
        if (data.length != 0) {
            console.log("data", data[0].img)
            fs.unlink("public/images/" + data[0].img, function(err) {
                if (err) {
                    res.render("admin/banner", {
                        username: req.cookies.username,
                        status: "删除图片失败"
                    })

                }
                console.log("图片删除成功")
                Banner.remove({ id: req.body.id }).then((suc2) => {
                    uploadData(req, res)

                }, (err) => {
                    res.render("admin/banner", {
                        username: req.cookies.username,
                        status: "数据库原数据删除失败"
                    })
                })
            })
        } else {
            console.log("数据库为空,直接上传")
            uploadData(req, res);
        }

    }, (err) => {
        res.render("admin/banner", {
            username: req.cookies.username,
            status: "查询数据库失败"
        })
    })
})

// 该函数用于图片上传
function uploadData(req, res) {
    if (req.file) {
        var extname = path.extname(req.file.originalname)
        var oldPath = "public/images/" + req.file.filename;
        var newPath = "public/images/" + req.file.filename + extname;
        console.log(oldPath, newPath)
        fs.rename(oldPath, newPath, (err, data) => {
            if (err) {
                console.log("图片上传成功，修改失败")
            } else {
                req.body.img = req.file.filename + extname;
                console.log("req.body", req.body)
                Banner.create(req.body).then((data) => {
                    if (data) {
                        console.log("666666666666666666")
                        res.render("admin/banner", {
                            username: req.cookies.username,
                            status: "上传成功"
                        })
                    } else {
                        res.render("admin/banner", {
                            username: req.cookies.username,
                            status: "图片存入数据库，失败"
                        })
                    }
                }, (err) => {
                    res.render("admin/banner", {
                        username: req.cookies.username,
                        status: "图片存入数据库时发生错误"
                    })
                })
            }
        })
    } else {
        res.render("admin/banner", {
            username: req.cookies.username,
            status: "图片上传失败，请重试"
        })
    }
}



// 添加商品--------------------------------------------------------------------------

router.get("/home/commodityAdd", (req, res) => {
    res.render("admin/commodityAdd", {
        username: req.cookies.username,
        status: "待操作",
    })
})

router.post("/home/commodityAdd", upload.fields([{ name: "mainpic" }, { name: "images" }]), (req, res) => {
    var event = new EventEmitter();
    req.body.images = [];
    if (req.files) {
        // 上传mainpic 图片
        var extname = path.extname(req.files.mainpic[0].originalname)
        var oldPath = "public/images/" + req.files.mainpic[0].filename;
        var newPath = "public/images/" + req.files.mainpic[0].filename + extname;
        fs.rename(oldPath, newPath, (err, data) => {
            if (err) {
                console.log("mainpic图片上传成功，图片名修改失败")
                res.render("admin/commodityAdd", {
                    status: "上传失败，请重新上传",
                    username: req.cookies.username
                })
                fs.unlink(oldPath)
            } else {

                req.body.mainpic = req.files.mainpic[0].filename + extname;
                // 循环images 中的图片
                req.files.images.forEach(function(value, i) {
                    var extname2 = path.extname(value.originalname)
                    var oldPath2 = "public/images/" + value.filename;
                    var newPath2 = "public/images/" + value.filename + extname;
                    fs.rename(oldPath2, newPath2, (err, data) => {
                        if (err) {
                            console.log("images图片上传成功，图片名修改失败")
                            fs.unlink(oldPath2)
                        } else {
                            req.body.images[i] = value.filename + extname;
                            if (i == req.files.images.length - 1) {
                                event.emit('getAll');
                            }
                        }
                    })

                })

            }

            event.on("getAll", function() {
                Commodity.create(req.body).then((data) => {
                    res.render("admin/commodityAdd", {
                        status: "上传成功",
                        username: req.cookies.username
                    })

                }, (err) => {
                    res.render("admin/commodityAdd", {
                        status: "上传失败",
                        username: req.cookies.username
                    })

                })

            })
        })

    } else {
        console.log("信息上传失败")
        res.render("admin/commodityAdd", {
            status: "上传失败，请重新上传",
            username: req.cookies.username
        })
    }



})

// 商品删除路由-----------------------------------------------
router.get("/home/remove/:id/:mainpic", (req, res) => {
    var event2 = new EventEmitter();

    // 删除 数据库中的数据

    event2.on("removesuccess", function() {
            Commodity.remove({ _id: req.params.id }).then((data) => {
                if (data) {

                    console.log("删除数据成功")
                    res.redirect("/admin/home")
                } else {
                    res.send("删除数据成功，删除图片失败")
                    console.log("删除数据成功，删除图片失败")
                }
            }, (err) => {
                res.send("删除数据失败")
                console.log("删除数据失败")
            })

        })
        //删除本地mainpic图片及image图片
    console.log("111111")
    fs.unlink("public/images/" + req.params.mainpic)
    console.log("22222")
    Commodity.findById(req.params.id).then((data) => {
        console.log("data", data)
        console.log("data.images", data.images)
        data.images.forEach((value, i) => {
            fs.unlink("public/images/" + value)
            if (i == data.images.length - 1) {
                event2.emit("removesuccess")
            }
        })

    }, (err) => {
        console.log("查找数据失败")
        res.send("查找数据失败")
    })

})

// 商品修改页面----------------------------------------------------
router.get("/home/update/:id/:mainpic", (req, res) => {
    // 渲染页面
    Commodity.findById(req.params.id).then((data) => {
        res.render("admin/update", {
            title: "修改完数据后提交",
            value: data,
            username: req.cookies.username
        })
    }, (err) => {
        console.log("数据查询失败")
    })
})

// 数据更改post传值

router.post("/home/reupdate", upload.fields([{ name: "mainpic" }]), (req, res) => {
    var event = new EventEmitter();

    // 监听数据获取状况
    event.on("getAll", function() {
        console.log("空文件")
        console.log("000000000000000000000000000", req.body)
        Commodity.update({ _id: req.body._id }, { $set: req.body }).then((data) => {
            console.log("更新成功", data)
            res.redirect("/admin/home")

        }, (err) => {
            res.send("上传服务器失败")

        })

    })

    // 判断对象是否为空
    function isEmptyObject(e) {　　
        for (var name in e) {　　　　
            return true; //返回false，不为空对象
            　　
        }　　　　
        return false; //返回true，为空对象
    }
    console.log("req.files", req.files)
    console.log('ssss');
    console.log(isEmptyObject(req.files));
    console.log('22222');
    if (isEmptyObject(req.files)) {

        // 删掉本地图片
        Commodity.findById(req.body._id).then((data) => {
            fs.unlink("public/images/" + data.mainpic)

            // 上传mainpic 图片
            var extname = path.extname(req.files.mainpic[0].originalname)
            var oldPath = "public/images/" + req.files.mainpic[0].filename;
            var newPath = "public/images/" + req.files.mainpic[0].filename + extname;
            fs.rename(oldPath, newPath, (err, data) => {
                if (err) {
                    console.log("mainpic图片上传成功，图片名修改失败")
                    fs.unlink(oldPath)
                    res.render("admin/home", {
                        title: "上传失败，请重新上传",
                        username: req.cookies.username
                    })
                } else {

                    req.body.mainpic = req.files.mainpic[0].filename + extname;

                    event.emit('getAll');
                }
            })

        }, () => {
            console.log("删除本地图片失败")
        })

    } else {
        event.emit("getAll");
        console.log("图片未更新");
    }
})

//管理用户页面路由-----------------------------------------------------------
router.get("/home/regist", (req, res) => {
    res.render("admin/regist", {
        username: req.cookies.username,
        status: "填写完整后请提交"
    })
})

router.post("/home/regist", (req, res) => {
        // console.log("----------------",req.body)
        if (req.body.username && req.body.password) {
            if (req.body.password == req.body.password2) {
                var users = {}
                users.username = req.body.username;
                users.password = req.body.password;
                // console.log("users",users)
                User.create(users).then((data) => {
                    res.render("admin/regist", {
                        username: req.cookies.username,
                        status: "注册成功"
                    })
                }, (err) => {
                    res.render("admin/regist", {
                        username: req.cookies.username,
                        status: "注册失败"
                    })
                })
            } else {
                res.render("admin/regist", {
                    username: req.cookies.username,
                    status: "两次密码不一致"
                })
            }
        } else {
            res.render("admin/regist", {
                username: req.cookies.username,
                status: "用户名或密码不能为空"
            })
        }
    })
    // 后台登录页面

router.post("/login", (req, res) => {
    if (req.body.username && req.body.password) {
        username = req.body.username
        User.findOne({ username }).then((data) => {
            if (data) {
                if (req.body.password == data.password) {
                    res.cookie("username", data.username)
                    res.redirect("/admin/home")
                } else {
                    res.send("密码错误")
                }
            } else {
                res.send("用户名为空")
            }
        }, (err) => {
            res.send("该用户名不存在")
        })
    } else {
        res.send("用户名或密码不能为空")
    }
})

// 媒体板块路由----------------------------------------------------------
router.get("/home/media", (req, res) => {
    res.render("admin/media", {
        username: req.cookies.username,
        status: "待操作",
    })
})

//一、轮播图
router.post("/home/media/1", upload.single("newspic"), (req, res) => {
        if (req.file) {
            var extname = path.extname(req.file.originalname)
            var oldPath = "public/images/" + req.file.filename;
            var newPath = "public/images/" + req.file.filename + extname;
            console.log(oldPath, newPath)
            fs.rename(oldPath, newPath, (err, data) => {
                if (err) {
                    console.log("图片上传成功，修改失败")
                } else {
                    req.body.newspic = req.file.filename + extname;
                    console.log("req.body", req.body)
                    Media.create(req.body).then((data) => {
                        if (data) {
                            res.render("admin/media", {
                                username: req.cookies.username,
                                status: "图片存入数据库"
                            })
                        } else {
                            res.render("admin/media", {
                                username: req.cookies.username,
                                status: "图片存入数据库，失败"
                            })
                        }
                    }, (err) => {
                        res.render("admin/media", {
                            username: req.cookies.username,
                            status: "图片存入数据库时发生错误"
                        })
                    })
                }
            })
        } else {
            console.log("图片上传失败，请重试")
            res.render("admin/media", {
                username: req.cookies.username,
                status: "图片上传失败，请重试"
            })

        }
    })
    // ----新闻添加/更新----
router.post("/home/media/2", (req, res) => {
        console.log("req.body", req.body)
        Media.create(req.body).then((data) => {
            res.render("admin/media", {
                username: req.cookies.username,
                status: "数据存入数据库"
            })
        }, (err) => {
            res.render("admin/media", {
                username: req.cookies.username,
                status: "数据存入数据库时发生错误"
            })
        })

    })
    //----展示图添加/更新----<
router.post("/home/media/pic", upload.single("img"), (req, res) => {
    Media.find({ id: req.body.id }).then((data) => {
        if (data.length != 0) {
            console.log("data", data[0].img)
            fs.unlink("public/images/" + data[0].img, function(err) {
                if (err) {
                    console.log("删除图片失败")
                }
                console.log("图片删除成功")
                Media.remove({ id: req.body.id }).then((suc2) => {
                    uploadData2(req, res)

                }, (err) => {
                    console.log("数据库原数据删除失败")
                })
            })
        } else {
            console.log("数据库为空,直接上传")
            uploadData2(req, res);
        }

    }, (err) => {
        console.log("查询数据库失败")
    })
})

// 该函数用于图片上传
function uploadData2(req, res) {
    if (req.file) {
        var extname = path.extname(req.file.originalname)
        var oldPath = "public/images/" + req.file.filename;
        var newPath = "public/images/" + req.file.filename + extname;
        console.log(oldPath, newPath)
        fs.rename(oldPath, newPath, (err, data) => {
            if (err) {
                console.log("图片上传成功，修改失败")
            } else {
                req.body.img = req.file.filename + extname;
                console.log("req.body", req.body)
                Media.create(req.body).then((data6) => {
                    console.log("data6", data6)
                    if (data6) {
                        console.log("图片存入数据库")
                        res.render("admin/media", {
                            username: req.cookies.username,
                            status: "图片存入数据库"
                        })
                    } else {
                        console.log("图片存入数据库，失败")
                        res.render("admin/media", {
                            username: req.cookies.username,
                            status: "图片存入数据库，失败"
                        })
                    }
                }, (err) => {
                    console.log("图片存入数据库时发生错误")
                    res.render("admin/media", {
                        username: req.cookies.username,
                        status: "图片存入数据库时发生错误"
                    })
                })
            }
        })
    } else {
        console.log("图片上传失败，请重试")
        res.render("admin/media", {
            username: req.cookies.username,
            status: "图片上传失败，请重试"
        })
    }
}

// 客户留言管理---------------------------------------------------
router.get("/home/feedback", function(req, res) {
        if (req.cookies.username) {
            var page = req.query.page || 1;
            var pageCount = 4;
            Feedback.count().then((aCount) => {
                Feedback.find({}).skip((page - 1) * pageCount).limit(pageCount).sort({ _id: -1 }).then((data) => {
                    res.render("admin/feedback", {
                        title: "待操作",
                        username: req.cookies.username,
                        count: aCount,
                        feedbacks: data,
                        commodityCount: Math.ceil(aCount / pageCount),
                        currentPage: page
                    })

                }, (err) => {
                    res.send("err", err)
                })

            }, (err) => {
                console.log("查询数据总条数失败")
            })
        } else {
            res.redirect("/admin")
        }
    })
    // 删除留言路由--------------------------------------------
router.get("/home/feedback/:id", function(req, res) {
    // console.log("req.params.id", req.params.id)
    if (req.cookies.username) {
        Feedback.remove({ _id: req.params.id }).then((data6) => {
            // console.log("8888888888888888", data6)
            var page = req.query.page || 1;
            var pageCount = 4;
            Feedback.count().then((aCount) => {
                Feedback.find({}).skip((page - 1) * pageCount).limit(pageCount).sort({ _id: -1 }).then((data) => {
                    console.log("8888888888888888", data)
                    res.render("admin/feedback", {
                        title: "删除成功",
                        username: req.cookies.username,
                        count: aCount,
                        feedbacks: data,
                        commodityCount: Math.ceil(aCount / pageCount),
                        currentPage: page
                    })

                }, (err) => {
                    res.send("err", err)
                })

            }, (err) => {
                console.log("查询数据总条数失败")
            })
        }, (err) => {
            res.send("删除失败")
        })

    } else {
        res.redirect("/admin")
    }
})

module.exports = router;
