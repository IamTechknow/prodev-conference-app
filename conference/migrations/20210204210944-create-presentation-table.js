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
  return db.createTable('presentations', {
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
    presenter_name: {
      notNull: true,
      type: 'string',
      length: 100,
    },
    company_name: {
      length: 100,
      type: 'string',
    },
    title: {
      notNull: true,
      type: 'string',
      length: 100,
    },
    synopsis: {
      notNull: true,
      type: 'text',
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
        name: 'presentation_event_id_fk',
        table: 'events',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      }
    },
    status_id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: 'presentation_presentation_status_id_fk',
        table: 'presentation_statuses',
        rules: {
          onDelete: 'NO ACTION',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      },
      defaultValue: 1,
    },
  });
};

exports.down = function(db) {
  return db.dropTable('presentations');
};

exports._meta = {
  "version": 1
};
