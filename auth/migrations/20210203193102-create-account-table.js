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
  return db.createTable('accounts', {
    id: {
      autoIncrement: true,
      notNull: true,
      primaryKey: true,
      type: 'int',
      unsigned: true,
    },
    email: {
      length: 100,
      notNull: true,
      type: 'string',
      unique: true,
    },
    hashed_password: {
      length: 100,
      notNull: true,
      type: 'string',
    },
    name: {
      length: 100,
      notNull: true,
      type: 'string',
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
  return db.dropTable('accounts');
};

exports._meta = {
  "version": 1
};
