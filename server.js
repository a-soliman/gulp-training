const staticServer 		= require('static-server');

const server = new staticServer({
	rootPath: './public/',
	port: 3000
});

server.start(() => {
	console.log(`Server started pn port ${server.port}`);
});