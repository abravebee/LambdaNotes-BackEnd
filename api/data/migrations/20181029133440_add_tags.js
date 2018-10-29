
exports.up = function(knex, Promise) {
  return knex.schema.table('notes', function(tbl) {
    tbl
      .string('tags')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('notes', function(tbl) {
    tbl.dropColumn('tags');
  });
};
