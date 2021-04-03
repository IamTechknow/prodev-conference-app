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
  return db.createTable('events', {
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
    },
    from: {
      type: 'date',
    },
    to: {
      type: 'date'
    },
    description: {
      notNull: true,
      type: 'text',
    },
    logo_url: {
      length: 100,
      type: 'string',
    },
    account_id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: 'events_accounts_id_fk',
        table: 'accounts',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      }
    },
    location_id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: 'events_locations_id_fk',
        table: 'locations',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      }
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
    number_of_presentations: {
      notNull: true,
      type: 'int',
      defaultValue: 10,
    },
    maximum_number_of_attendees: {
      notNull: true,
      type: 'int',
      defaultValue: 100,
    },
  });
};

exports.down = function(db) {
  return db.dropTable('events');
};

exports._meta = {
  "version": 1
};
