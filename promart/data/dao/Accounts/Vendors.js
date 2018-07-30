var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'PROMART_VENDORS',
	'properties': [
		{
			'name': 'Id',
			'column': 'VENDOR_ID',
			'type': 'INTEGER',
			'id': true,
		}, {
			'name': 'Name',
			'column': 'VENDOR_NAME',
			'type': 'VARCHAR',
			'required': true
		}, {
			'name': 'Rating',
			'column': 'VENDOR_RATING',
			'type': 'DOUBLE',
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
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM PROMART_VENDORS");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};