var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'PROMART_COMPONENTS',
	'properties': [
		{
			'name': 'Id',
			'column': 'COMPONENT_ID',
			'type': 'INTEGER',
			'id': true,
		}, {
			'name': 'Name',
			'column': 'COMPONENT_NAME',
			'type': 'VARCHAR',
			'required': true
		}, {
			'name': 'Repository',
			'column': 'COMPONENT_REPOSITORY',
			'type': 'VARCHAR',
			'required': true
		}, {
			'name': 'Description',
			'column': 'COMPONENT_DESCRIPTION',
			'type': 'VARCHAR',
		}, {
			'name': 'Industry',
			'column': 'COMPONENT_INDUSTRY',
			'type': 'INTEGER',
			'required': true
		}, {
			'name': 'Category',
			'column': 'COMPONENT_CATEGORY',
			'type': 'INTEGER',
			'required': true
		}, {
			'name': 'License',
			'column': 'COMPONENT_LICENSE',
			'type': 'INTEGER',
			'required': true
		}, {
			'name': 'Developer',
			'column': 'COMPONENT_DEVELOPER',
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
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM PROMART_COMPONENTS");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};