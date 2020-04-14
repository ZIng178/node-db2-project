
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {VIN:12345678, Make:"LandRover", Model : "Range Rover Evoque",Mileage :'10,000'},
        {VIN:23143343123, Make:"Dodge", Model : "HellCat",Mileage :'30,000'},
        {VIN:452342424234, Make:"Subaru", Model : "WRX",Mileage :'20,000'}
      ])
    });
};
