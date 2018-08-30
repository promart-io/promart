var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'PROMART_PRODUCTS',
	'properties': [
		{
			'name': 'Id',
			'column': 'PRODUCT_ID',
			'type': 'INTEGER',
			'id': true,
		}, {
			'name': 'Name',
			'column': 'PRODUCT_NAME',
			'type': 'VARCHAR',
			'required': true
		}, {
			'name': 'Description',
			'column': 'PRODUCT_DESCRIPTION',
			'type': 'VARCHAR',
		}, {
			'name': 'Industry',
			'column': 'PRODUCT_INDUSTRY',
			'type': 'INTEGER',
			'required': true
		}, {
			'name': 'Category',
			'column': 'PRODUCT_CATEGORY',
			'type': 'INTEGER',
			'required': true
		}, {
			'name': 'Vendor',
			'column': 'PRODUCT_VENDOR',
			'type': 'INTEGER',
			'required': true
		}, {
			'name': 'Region',
			'column': 'PRODUCT_REGION',
			'type': 'INTEGER',
			'required': true
		}, {
			'name': 'Country',
			'column': 'PRODUCT_COUNTRY',
			'type': 'INTEGER',
			'required': true
		}, {
			'name': 'Solution',
			'column': 'PRODUCT_SOLUTION',
			'type': 'INTEGER',
			'required': true
		}, {
			'name': 'Image',
			'column': 'PRODUCT_IMAGE',
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
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM PROMART_PRODUCTS");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};