var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'PROMART_LICENSES',
	'properties': [
		{
			'name': 'Id',
			'column': 'LICENSE_ID',
			'type': 'INTEGER',
			'id': true,
		}, {
			'name': 'Name',
			'column': 'LICENSE_NAME',
			'type': 'VARCHAR',
			'required': true
		}, {
			'name': 'Location',
			'column': 'LICENSE_LOCATION',
			'type': 'VARCHAR',
			'required': true
		}]
});
exports.list = function(settings) {
	return dao.list(settings);
};

exports.get = function(id) {
	return dao.find(id);
};

exports.create = function(entity) {
	return dao.insert(entity);
};

exports.update = function(entity) {
	return dao.update(entity);
};

exports.delete = function(id) {
	dao.remove(id);
};

exports.count = function() {
	return dao.count();
};

exports.customDataCount = function() {
	var resultSet = query.execute("SELECT COUNT(*) FROM LICENSES");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};