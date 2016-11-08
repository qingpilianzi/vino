var gulp=require("gulp");
var fs=require("fs");
var connect=require("gulp-connect");		
var respond=require("gulp-respond");


var uglify=require("gulp-uglify");
var concat=require("gulp-concat");

var ngAnnotate = require("gulp-ng-annotate");	//整理
var ngmin = require("gulp-ngmin");			//压缩angular

var clean = require("gulp-clean");

var minifyCss = require("gulp-minify-css");
var minifyHtml = require("gulp-minify-html");
var rename = require("gulp-rename");

var rev = require("gulp-rev");	//加密
var collector = require("gulp-rev-collector");	//替换

gulp.task("clean" , function () {
	return gulp.src(["./src/js/build/","./src/css/build/","./src/build/"])
				.pipe(clean())
})

gulp.task("miniJs",["clean"],function(){
	//console.log(1)
	return gulp.src(["src/js/app.js","src/js/config.js","src/js/controller.js","src/js/directive.js","src/js/ocLazyLoad.min.js","src/js/iscroll5.js","src/js/swiper.min.js","src/js/zepto.min.js"])
		.pipe(ngAnnotate())
		.pipe(ngmin())
		.pipe(uglify())
		.pipe(concat("all.min.js"))
		.pipe(rev())
		.pipe(gulp.dest("src/js/build/"))
		.pipe(rev.manifest("miniJs.json"))
		.pipe(gulp.dest("./src/"))
})

gulp.task("miniCss",["miniJs"],function(){
	return gulp.src("./src/css/*.css")
		.pipe(minifyCss())
		.pipe(concat("all.min.css"))
		.pipe(rev())
		.pipe(gulp.dest("src/css/build/"))
		.pipe(rev.manifest("miniCss.json"))
		.pipe(gulp.dest("./src/"))
})

gulp.task("miniHtml",["miniCss"],function(){
	return gulp.src("./src/index.html")
		.pipe(minifyHtml())
		.pipe(rename(function(path){
			//console.log(path);
			path.basename = "build";
		}))
		.pipe(gulp.dest("./src/"))
})

gulp.task("rev",["miniHtml"],function(){
	return gulp.src(["./src/build.html","./src/miniJs.json","miniCss.json"])
		.pipe(collector())
		.pipe(gulp.dest("./src/"))
})

gulp.task("watch",function(){
	return gulp.watch(["./src/js/*.js","./src/css/index.css"],["rev"])
})


gulp.task("connect",function(){
	var params={};
	//启动本地server
	connect.server({
		root:["./lib","./src"],
		port:8000,
		livereload:true,
		//本地server中间件，完成本地动态编译
		middleware:function(){
			return [function(req,res,next){
				//console.log("开始操作");
				next();
			},function(req,res){
				var path=req.url.split("?").shift();
				//console.log(path)
				path=path=="/" ? "/index.html":path;
				url = "src"+ path;
				//console.log(url)
				if(!fs.existsSync(url)){
					url = "lib" + path;
				}
				gulp.src(url)
					.pipe(respond(res));
			}];
		}
	})
})
gulp.task("serve",["rev","connect","watch"]);