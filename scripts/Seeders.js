export default async (Database) => {
  // **==========================================================================
  // *                           USERS
  // **==========================================================================
  await Database.Users.bulkCreate([
    {
      email: "omar_elsahragty@hotmail.com",
      password: "$2a$10$yQeb44ZCO1Z8x5ncPv5hh.DekQH8EuZSPfnFnlrf2380o.ovalVHm", // ! Password123
    },
  ]);
};
