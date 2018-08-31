var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'PROMART_SOLUTIONS',
	'properties': [
		{
			'name': 'Id',
			'column': 'SOLUTION_ID',
			'type': 'INTEGER',
			'id': true,
		}, {
			'name': 'Name',
			'column': 'SOLUTION_NAME',
			'type': 'VARCHAR',
			'required': true
		}, {
			'name': 'Description',
			'column': 'SOLUTION_DESCRIPTION',
			'type': 'VARCHAR',
		}, {
			'name': 'Repository',
			'column': 'SOLUTION_REPOSITORY',
			'type': 'VARCHAR',
		}, {
			'name': 'URI',
			'column': 'SOLUTION_URI',
			'type': 'VARCHAR',
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
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM PROMART_SOLUTIONS");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};