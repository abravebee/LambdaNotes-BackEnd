
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes')
  .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'Coffee Ipsum', content: 'Shop, acerbic coffee skinny roast filter skinny aromatic crema to go aged. Et arabica, rich cup caramelization, mazagran coffee café au lait est variety milk. Trifecta instant brewed skinny so grinder, caramelization white robusta siphon redeye aftertaste.'},
        {title: 'Cupcake Ipsum', content: 'Marshmallow halvah pie. Ice cream brownie candy canes cupcake marzipan oat cake cookie. Cake caramels gingerbread. Tart gummies croissant tart dragée gummi bears.'},
        {title: 'Chocolate Milk Ipsum', content: 'Chocolate milk taste sipping enjoy home made sweet absolutely drinking syrup, cow syrup perfect, delicious enjoy home made, sweet home made. Taste, for perfect syrup delicious absolutely chocolaty home made home made delicious cow sweet with chocolaty delicious absolutely sipping.'},
        {title: 'Cheese Ipsum', content: 'I love cheese, especially cheesecake cheese slices. Cheesy feet cream cheese who moved my cheese feta swiss cheese triangles cheesecake hard cheese. Mascarpone mascarpone fondue paneer goat stinking bishop stilton cheese triangles. When the cheese comes out everybody\'s happy melted cheese cauliflower cheese pecorino.'}
      ]);
    });
};
