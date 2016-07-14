var EventEmitter = require('events').EventEmitter;

var life = new EventEmitter();

var removeEvent = function () {
	console.log('remove');
}

//绑定自定义事件，on返回EventEmitter对象，方便链式调用
life.on('sayhello', function(who){
	console.log('hello ' + who);
});
life.on('sayhello', function(who){
	console.log('hello again ' + who);
});

life.on('sayhehe', test);

//life.removeListener('sayhehe', test);

//手动触发
life.emit('sayhello', 'everlose');

life.emit('sayhehe', 'everlose');