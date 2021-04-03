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
  return db.createTable('attendees', {
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
    },
    name: {
      notNull: true,
      type: 'string',
      length: 100,
    },
    company_name: {
      length: 100,
      type: 'string',
    },
    created: {
      notNull: true,
      type: 'timestamp',
      defaultValue: new String('CURRENT_TIMESTAMP'),
    },
    event_id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: 'attendee_event_id_fk',
        table: 'events',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      }
    },
  });
};

exports.down = function(db) {
  return db.dropTable('attendees');
};

exports._meta = {
  "version": 1
};
