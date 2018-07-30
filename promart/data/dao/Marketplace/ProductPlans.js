var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'PROMART_PRODUCT_PLANS',
	'properties': [
		{
			'name': 'Id',
			'column': 'PRODUCT_PLAN_ID',
			'type': 'INTEGER',
			'id': true,
		}, {
			'name': 'Product',
			'column': 'PRODUCT_PLAN_PRODUCT',
			'type': 'INTEGER',
			'required': true
		}, {
			'name': 'Type',
			'column': 'PRODUCT_PLAN_TYPE',
			'type': 'INTEGER',
			'required': true
		}, {
			'name': 'Price',
			'column': 'PRICE',
			'type': 'DOUBLE',
			'required': true
		}, {
			'name': 'Support',
			'column': 'PRODUCT_PLAN_SUPPORT',
			'type': 'INTEGER',
			'required': true
		}, {
			'name': 'Sales',
			'column': 'PRODUCT_PLAN_SALES',
			'type': 'INTEGER',
			'required': true
		}, {
			'name': 'Unit',
			'column': 'PRODUCT_PLAN_UNIT',
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
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM PROMART_PRODUCT_PLANS");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};