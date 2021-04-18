'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('locations', {
    id: {
      autoIncrement: true,
      notNull: true,
      primaryKey: true,
      type: 'int',
      unsigned: true,
    },
    name: {
      length: 100,
      notNull: true,
      type: 'string',
      unique: true,
    },
    city: {
      length: 100,
      notNull: true,
      type: 'string',
    },
    state: {
      length: 2,
      notNull: true,
      type: 'string',
    },
    maximum_vendor_count: {
      notNull: true,
      type: 'int',
      unsigned: true,
    },
    room_count: {
      notNull: true,
      type: 'int',
      unsigned: true,
    },
    created: {
      notNull: true,
      type: 'timestamp',
      defaultValue: new String('CURRENT_TIMESTAMP'),
    },
    updated: {
      notNull: true,
      type: 'timestamp',
      defaultValue: new String('CURRENT_TIMESTAMP'),
    },
    version: {
      notNull: true,
      type: 'int',
      defaultValue: 1,
    },
  });
};

exports.down = function(db) {
  return db.dropTable('locations');
};

exports._meta = {
  "version": 1
};
