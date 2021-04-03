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

exports.up = async function(db) {
  await db.createTable('presentation_statuses', {
    id: {
      notNull: true,
      primaryKey: true,
      type: 'int',
      unsigned: true,
    },
    status: {
      length: 9,
      notNull: true,
      type: 'string',
      unique: true,
    },
  });

  await db.runSql(`
    INSERT INTO presentation_statuses(id, status)
    VALUES
    (1, 'SUBMITTED'),
    (2, 'APPROVED'),
    (3, 'REJECTED');
  `);
};

exports.down = function(db) {
  return db.dropTable('presentation_statuses');
};

exports._meta = {
  "version": 1
};
