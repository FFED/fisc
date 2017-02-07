#!/usr/bin/env node

var Liftoff = require('liftoff');
var argv = require('minimist')(process.argv.slice(2));
var path = require('path');
//实例化一个命令行工具
var cli = new Liftoff({
	name: 'fisc', // 命令名字
	processTitle: 'fisc', //同上即可
	moduleName: 'fisc', //同上即可
	configName: 'fis-conf', //配置文件名称

	// 设置为支持js后缀
	extensions: {
		'.js': null
	}
});

//启动命令
cli.launch({
	cwd: argv.r || argv.root, //当前输入fisc命令的目录
	configPath: argv.f || argv.file //读取当前命令目录下的配置文件路径
}, function(env) {
	var commands = argv["_"],
			proxyIndex = commands.indexOf('proxy'),
			fis = require(!env.modulePath ? '../index.js' : env.modulePath);

	// 启动代理服务器
	if(proxyIndex !== -1) {
		var proxy = require('./proxy.js'),
				pxhost = argv.pxhost || '127.0.0.1',
				pxport = argv.pxport || '8080',
				pxlisten = argv.pxlisten || '8090';


		console.log('--------启动代理服务器-----------');
		console.log( '代理服务器：' + '127.0.0.1:' + pxlisten );
		console.log( '代理的地址' + '-------' + pxhost );
		console.log( '代理的端口' + '-------' + pxport );


		proxy(pxhost, pxport ,pxlisten);

		// 移除proxy信息，否则fis命令会报错
		argv["_"].splice(proxyIndex, 1);
		delete argv.pxhost;
		delete argv.pxport;
		delete argv.pxlisten;
	}

	// fis命令
	if(!(proxyIndex !== -1 && argv["_"].length == 0)) {
		process.title = this.name + ' ' + process.argv.slice(2).join(' ') + ' [ ' + env.cwd + ' ]';
		/**
		 * 配置插件查找路径，优先查找本地项目里面的 node_modules，然后
		 * 才是全局环境下面安装的 fisa 目录里面的 node_modules
		 */
		fis.require.paths.unshift(path.join(env.cwd, 'node_modules'));
		fis.require.paths.push(path.join(path.dirname(__dirname), 'node_modules'));
		fis.cli.name = this.name;
		fis.cli.run(argv, env);
	}
});