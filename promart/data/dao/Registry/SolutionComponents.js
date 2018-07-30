var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'PROMART_SOLUTION_COMPONENTS',
	'properties': [
		{
			'name': 'Id',
			'column': 'SOLUTION_COMPONENT_ID',
			'type': 'INTEGER',
			'id': true,
		}, {
			'name': 'Solution',
			'column': 'SOLUTION_COMPONENT_SOLUTION',
			'type': 'INTEGER',
		}, {
			'name': 'Component',
			'column': 'SOLUTION_COMPONENT_COMPONENT',
			'type': 'INTEGER',
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
	var resultSet = query.execute("SELECT COUNT(*) FROM SOLUTIONCOMPONENTS");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};