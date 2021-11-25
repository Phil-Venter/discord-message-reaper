const fs = require('fs');
const path = require('path');

module.exports = (dir) => {
	return fs.readdirSync(dir)
		.flatMap(file => {
			const fullPath = path.join(dir, file);
			if (fs.lstatSync(fullPath).isDirectory()) {
				return getFiles(fullPath);
			} else if(fullPath.endsWith('.js')) {
				return path.resolve(fullPath);
			}
		})
		.filter(_ => _);
};