var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'PROMART_CUSTOMERS',
	'properties': [
		{
			'name': 'Id',
			'column': 'CUSTOMER_ID',
			'type': 'INTEGER',
			'id': true,
		}, {
			'name': 'FirstName',
			'column': 'CUSTOMER_FIRST_NAME',
			'type': 'VARCHAR',
			'required': true
		}, {
			'name': 'LastName',
			'column': 'CUSTOMER_LAST_NAME',
			'type': 'VARCHAR',
			'required': true
		}, {
			'name': 'Email',
			'column': 'CUSTOMER_EMAIL',
			'type': 'VARCHAR',
			'required': true
		}, {
			'name': 'Address',
			'column': 'CUSTOMER_ADDRESS',
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
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM PROMART_CUSTOMERS");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};