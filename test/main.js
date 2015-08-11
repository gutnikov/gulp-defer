var gutil = require("gulp-util"),
    should = require("should"),
    defer = require("../index"),
    fs = require("fs"),
    vm = require("vm");

describe('gulp-defer',function(){

    describe('Moving scripts and css links to defer',function(){

        it('should remove script tag and include script injection into defer section',function(done){

            var file = new gutil.File({
                base: "test/fixtures/",
                path: "test/fixtures/basic-defer.html",
                contents: fs.readFileSync("test/fixtures/basic-defer.html")
            });

            testDefer = defer();
            testDefer.on("data", function (newFile) {
                should.exist(newFile);
                should.exist(newFile.contents);
                String(newFile.contents).should.equal(String(fs.readFileSync("test/expected/basic-defer.html"), "utf8"));
                done();
            });
            testDefer.write(file);
        });


        it('should handle multiple defer sections',function(done){
                var file = new gutil.File({
                    base: "test/fixtures/",
                    path: "test/fixtures/multi-defer.html",
                    contents: fs.readFileSync("test/fixtures/multi-defer.html")
                });

                testDefer = defer();
                testDefer.on("data", function (newFile) {
                    should.exist(newFile);
                    should.exist(newFile.contents);
                    String(newFile.contents).should.equal(String(fs.readFileSync("test/expected/multi-defer.html"), "utf8"));
                    done();
                });
                testDefer.write(file);
        });

        it('should handle multiple scripts inside defer section',function(done){
                    var file = new gutil.File({
                        base: "test/fixtures/",
                        path: "test/fixtures/multi-scripts.html",
                        contents: fs.readFileSync("test/fixtures/multi-scripts.html")
                    });

                    testDefer = defer();
                    testDefer.on("data", function (newFile) {
                        should.exist(newFile);
                        should.exist(newFile.contents);
                        String(newFile.contents).should.equal(String(fs.readFileSync("test/expected/multi-scripts.html"), "utf8"));
                        done();
                    });
                    testDefer.write(file);
        });

        it('should remove css link tag and include injection into defer section',function(done){
                    var file = new gutil.File({
                        base: "test/fixtures/",
                        path: "test/fixtures/defer-link.html",
                        contents: fs.readFileSync("test/fixtures/defer-link.html")
                    });

                    testDefer = defer();
                    testDefer.on("data", function (newFile) {
                        should.exist(newFile);
                        should.exist(newFile.contents);
                        String(newFile.contents).should.equal(String(fs.readFileSync("test/expected/defer-link.html"), "utf8"));
                        done();
                    });
                    testDefer.write(file);
        });

        it('should handle both script and css links on a page',function(done){
                    var file = new gutil.File({
                        base: "test/fixtures/",
                        path: "test/fixtures/mixed.html",
                        contents: fs.readFileSync("test/fixtures/mixed.html")
                    });

                    testDefer = defer();
                    testDefer.on("data", function (newFile) {
                        should.exist(newFile);
                        should.exist(newFile.contents);
                        String(newFile.contents).should.equal(String(fs.readFileSync("test/expected/mixed.html"), "utf8"));
                        done();
                    });
                    testDefer.write(file);
        });


    });

});