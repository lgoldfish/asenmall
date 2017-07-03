var express = require('express');
var router = express.Router();
var path = require("path")
var Banner = require(path.join(__dirname, "../models/Banner.js"))
var Commodity = require(path.join(__dirname, "../models/Commodity.js"))
var Media = require(path.join(__dirname, "../models/Media.js"))
    /* GET home page. */
router.get('/', function(req, res, next) {
    // 查询媒体板块
    Media.find({}).sort({ "_id": -1 }).then((data3) => {
        // banner图查询
        Banner.find().then((data1) => {
            Commodity.find({}).sort({ '_id': -1 }).then((data2) => {

                //遍历筛选Media 数据
                var lbt = [];
                var news = [];
                var mediapic = [];

                for (var i in data3) {
                    if (data3[i]["newstitle"]) {


                        lbt.push(data3[i])
                    } else if (data3[i]["mewstitle2"]) {
                        news.push(data3[i])
                    } else if (data3[i]["id"]) {
                        mediapic.push(data3[i])
                    }
                }
                // console.log(mediapic)
                // 遍历筛选数据库数据(商品数据)
                var zncs = [];
                var hjsb = [];
                var qgsb = [];
                var dhj = [];
                var fjl = [];
                var hjpj = [];
                var qgpj = [];
                var ldbh = [];
                var gywj = [];
                var hc = [];
                for (var i = 0; i < data2.length; i++) {
                    switch (data2[i].id) {
                        case "智能仓储":
                            zncs.push(data2[i]);
                            break;
                        case "焊接设备":
                            hjsb.push(data2[i]);
                            break;
                        case "切割设备":
                            qgsb.push(data2[i]);
                            break;
                        case "电焊机":
                            dhj.push(data2[i]);
                            break;
                        case "辅具类":
                            fjl.push(data2[i]);
                            break;
                        case "焊接配件":
                            hjpj.push(data2[i]);
                            break;
                        case "切割配件":
                            qgpj.push(data2[i]);
                            break;
                        case "劳动保护":
                            ldbh.push(data2[i]);
                            break;
                        case "工业五金":
                            gywj.push(data2[i]);
                            break;
                        case "焊材":
                            hc.push(data2[i]);
                            break;
                    }
                }
                res.render("index", {
                    banner: data1,
                    zncs,
                    hjsb,
                    qgsb,
                    dhj,
                    fjl,
                    hjpj,
                    qgpj,
                    ldbh,
                    gywj,
                    hc,
                    lbt,
                    news,
                    mediapic
                })
            }, (err) => {
                console.log("err", err)
            })
        }, (err) => {
            console.log("err", err)
        })
    }, (err) => {
        console.log("查询media失败", err)
    })

});



// 列表页路由
router.get("/list/:id", function(req, res) {
        var lists = req.params.id
        Banner.find().then((data) => {
            Commodity.find({ id: lists }).sort({ _id: -1 }).then((data3) => {

                Commodity.find({}).sort({ '_id': -1 }).then((data2) => {
                    // 遍历筛选数据库数据
                    var zncs = [];
                    var hjsb = [];
                    var qgsb = [];
                    var dhj = [];
                    var fjl = [];
                    var hjpj = [];
                    var qgpj = [];
                    var ldbh = [];
                    var gywj = [];
                    var hc = [];
                    for (var i = 0; i < data2.length; i++) {
                        switch (data2[i].id) {
                            case "智能仓储":
                                zncs.push(data2[i]);
                                break;
                            case "焊接设备":
                                hjsb.push(data2[i]);
                                break;
                            case "切割设备":
                                qgsb.push(data2[i]);
                                break;
                            case "电焊机":
                                dhj.push(data2[i]);
                                break;
                            case "辅具类":
                                fjl.push(data2[i]);
                                break;
                            case "焊接配件":
                                hjpj.push(data2[i]);
                                break;
                            case "切割配件":
                                qgpj.push(data2[i]);
                                break;
                            case "劳动保护":
                                ldbh.push(data2[i]);
                                break;
                            case "工业五金":
                                gywj.push(data2[i]);
                                break;
                            case "焊材":
                                hc.push(data2[i]);
                                break;
                        }
                    }

                    if (req.query.fromvue) {
                        res.send(data3)
                    } else {
                        res.render("list", {
                            banner: data,
                            commodity: data3,
                            listname: lists,
                            zncs,
                            hjsb,
                            qgsb,
                            dhj,
                            fjl,
                            hjpj,
                            qgpj,
                            ldbh,
                            gywj,
                            hc
                        })
                    }
                }, (err) => {
                    console.log("err", err)
                })
            }, (err) => {
                console.log("commodity查询失败", err)
            })

        }, (err) => {
            console.log("err", err)
        })

    })
    // 详情页路由
router.get("/detail/:id", function(req, res) {
    Banner.find().then((data) => {
        Commodity.findById(req.params.id).then((data3) => {
            Commodity.find({}).sort({ '_id': -1 }).then((data2) => {
                // 遍历筛选数据库数据
                var zncs = [];
                var hjsb = [];
                var qgsb = [];
                var dhj = [];
                var fjl = [];
                var hjpj = [];
                var qgpj = [];
                var ldbh = [];
                var gywj = [];
                var hc = [];
                for (var i = 0; i < data2.length; i++) {
                    switch (data2[i].id) {
                        case "智能仓储":
                            zncs.push(data2[i]);
                            break;
                        case "焊接设备":
                            hjsb.push(data2[i]);
                            break;
                        case "切割设备":
                            qgsb.push(data2[i]);
                            break;
                        case "电焊机":
                            dhj.push(data2[i]);
                            break;
                        case "辅具类":
                            fjl.push(data2[i]);
                            break;
                        case "焊接配件":
                            hjpj.push(data2[i]);
                            break;
                        case "切割配件":
                            qgpj.push(data2[i]);
                            break;
                        case "劳动保护":
                            ldbh.push(data2[i]);
                            break;
                        case "工业五金":
                            gywj.push(data2[i]);
                            break;
                        case "焊材":
                            hc.push(data2[i]);
                            break;
                    }
                }
                if (req.query.fromvue) {
                    res.send(data3)
                } else {
                    res.render("detail", {
                        banner: data,
                        commodity: data3,
                        title: data3.title,
                        listname: data3.id,
                        images: data3.images,
                        zncs,
                        hjsb,
                        qgsb,
                        dhj,
                        fjl,
                        hjpj,
                        qgpj,
                        ldbh,
                        gywj,
                        hc
                    })
                }
            }, (err) => {
                console.log("err", err)
            })

        }, (err) => {
            console.log(err)
        })

    }, (err) => {
        console.log("err", err)
    })

})

// 获取allList.html页面路由--------------------------------
router.get("/allList", (req, res) => {
    Banner.find().then((data) => {
        Commodity.count().then((aCount) => {
            var page = req.query.page || 1;
            var pageCount = 12;
            Commodity.find({}).skip((page - 1) * pageCount).limit(pageCount).sort({ _id: -1 }).then((data3) => {
                Commodity.find({}).sort({ '_id': -1 }).then((data2) => {
                    // 遍历筛选数据库数据
                    var zncs = [];
                    var hjsb = [];
                    var qgsb = [];
                    var dhj = [];
                    var fjl = [];
                    var hjpj = [];
                    var qgpj = [];
                    var ldbh = [];
                    var gywj = [];
                    var hc = [];
                    for (var i = 0; i < data2.length; i++) {
                        switch (data2[i].id) {
                            case "智能仓储":
                                zncs.push(data2[i]);
                                break;
                            case "焊接设备":
                                hjsb.push(data2[i]);
                                break;
                            case "切割设备":
                                qgsb.push(data2[i]);
                                break;
                            case "电焊机":
                                dhj.push(data2[i]);
                                break;
                            case "辅具类":
                                fjl.push(data2[i]);
                                break;
                            case "焊接配件":
                                hjpj.push(data2[i]);
                                break;
                            case "切割配件":
                                qgpj.push(data2[i]);
                                break;
                            case "劳动保护":
                                ldbh.push(data2[i]);
                                break;
                            case "工业五金":
                                gywj.push(data2[i]);
                                break;
                            case "焊材":
                                hc.push(data2[i]);
                                break;
                        }
                    }

                    console.log("00000000000000000000000")
                    res.render("allList", {
                        banner: data,
                        commodity: data3,
                        zncs,
                        hjsb,
                        qgsb,
                        dhj,
                        fjl,
                        hjpj,
                        qgpj,
                        ldbh,
                        gywj,
                        hc,
                        count: aCount,
                        commodityCount: Math.ceil(aCount / pageCount),
                        currentPage: page
                    })
                }, (err) => {
                    console.log("err", err)
                })
            }, (err) => {
                res.send("err", err)
            })
        }, (err) => {
            console.log("查询数据总条数失败")
        })

    }, (err) => {
        console.log("err", err)
    })

})

// 搜索框模糊查询------------------------------------

router.get("/find", (req, res) => {
    Banner.find().then((data) => {
        var find = req.query.find
        console.log("6666666666666", find)
        Commodity.find({}).sort({ '_id': -1 }).then((data2) => {
            Commodity.find({ title: eval("/" + find + "/i") }).count().then((aCount) => {
                Commodity.find({ title: eval("/" + find + "/i") }).sort({ '_id': -1 }).then((data3) => {
                    // 遍历筛选数据库数据
                    var zncs = [];
                    var hjsb = [];
                    var qgsb = [];
                    var dhj = [];
                    var fjl = [];
                    var hjpj = [];
                    var qgpj = [];
                    var ldbh = [];
                    var gywj = [];
                    var hc = [];
                    for (var i = 0; i < data2.length; i++) {
                        switch (data2[i].id) {
                            case "智能仓储":
                                zncs.push(data2[i]);
                                break;
                            case "焊接设备":
                                hjsb.push(data2[i]);
                                break;
                            case "切割设备":
                                qgsb.push(data2[i]);
                                break;
                            case "电焊机":
                                dhj.push(data2[i]);
                                break;
                            case "辅具类":
                                fjl.push(data2[i]);
                                break;
                            case "焊接配件":
                                hjpj.push(data2[i]);
                                break;
                            case "切割配件":
                                qgpj.push(data2[i]);
                                break;
                            case "劳动保护":
                                ldbh.push(data2[i]);
                                break;
                            case "工业五金":
                                gywj.push(data2[i]);
                                break;
                            case "焊材":
                                hc.push(data2[i]);
                                break;
                        }
                    }
                    if (aCount != 0) {
                        if (req.query.fromvue) {
                            console.log("data3333", data3)
                            res.send(data3)
                        } else {
                            res.render("find", {
                                banner: data,
                                commodity: data3,
                                aCount,
                                zncs,
                                hjsb,
                                qgsb,
                                dhj,
                                fjl,
                                hjpj,
                                qgpj,
                                ldbh,
                                gywj,
                                hc
                            })
                        }
                    } else {
                        if (req.query.fromvue) {
                            console.log("data3333", data3)
                            res.send(data3)
                        } else {
                            res.render("find", {
                                banner: data,
                                commodity: data3,
                                aCount: 0,
                                zncs,
                                hjsb,
                                qgsb,
                                dhj,
                                fjl,
                                hjpj,
                                qgpj,
                                ldbh,
                                gywj,
                                hc
                            })
                        }

                    }
                }, (err) => {
                    console.log("err", err)
                })
            }, (err) => {
                console.log("err", err)
            })
        }, (err) => {
            res.send("err", err)
        })

    }, (err) => {
        console.log("err", err)
    })

})

// 关于我们页面路由---------------------------------------------

router.get("/aboutUs", (req, res) => {
    Banner.find().then((data) => {
        Commodity.find({}).sort({ '_id': -1 }).then((data2) => {
            var zncs = [];
            var hjsb = [];
            var qgsb = [];
            var dhj = [];
            var fjl = [];
            var hjpj = [];
            var qgpj = [];
            var ldbh = [];
            var gywj = [];
            var hc = [];
            for (var i = 0; i < data2.length; i++) {
                switch (data2[i].id) {
                    case "智能仓储":
                        zncs.push(data2[i]);
                        break;
                    case "焊接设备":
                        hjsb.push(data2[i]);
                        break;
                    case "切割设备":
                        qgsb.push(data2[i]);
                        break;
                    case "电焊机":
                        dhj.push(data2[i]);
                        break;
                    case "辅具类":
                        fjl.push(data2[i]);
                        break;
                    case "焊接配件":
                        hjpj.push(data2[i]);
                        break;
                    case "切割配件":
                        qgpj.push(data2[i]);
                        break;
                    case "劳动保护":
                        ldbh.push(data2[i]);
                        break;
                    case "工业五金":
                        gywj.push(data2[i]);
                        break;
                    case "焊材":
                        hc.push(data2[i]);
                        break;
                }
            }
            res.render("aboutUs", {
                banner: data,
                zncs,
                hjsb,
                qgsb,
                dhj,
                fjl,
                hjpj,
                qgpj,
                ldbh,
                gywj,
                hc
            })
        }, (err) => {
            res.send("err", err)
        })

    }, (err) => {
        console.log("err", err)
    })

})










module.exports = router;
