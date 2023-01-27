const Letter = require("./index.js");

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: 1,
          name: "Leanne Graham",
          username: "Bret",
          email: "Sincere@april.biz",
          address: {
            street: "Kulas Light",
            suite: "Apt. 556",
            city: "Gwenborough",
            zipcode: "92998-3874",
            geo: {
              lat: "-37.3159",
              lng: "81.1496",
            },
          },
          phone: "1-770-736-8031 x56442",
          website: "hildegard.org",
          company: {
            name: "Romaguera-Crona",
            catchPhrase: "Multi-layered client-server neural-net",
            bs: "harness real-time e-markets",
          },
          posts: [],
        },
      ]),
  })
);

describe("Letter", () => {
  let letter;

  beforeEach(() => {
    letter = new Letter();
  });

  it("should return an array of users with posts", async () => {
    const users = await letter.get();

    expect(Array.isArray(users)).toStrictEqual(true);
    expect(users.length).toBeGreaterThan(0);
    expect(users[0]).toHaveProperty("posts");
  });

  it("should return an empty array if there is an error fetching users", async () => {
    Letter.prototype.getUsers = jest.fn(() => Promise.reject());

    const users = await letter.get();

    expect(users).toBeNull();
  });

  it("should return an array of posts filtered by userId", () => {
    const posts = [
      { id: 1, userId: 1, title: "Post 1" },
      { id: 2, userId: 2, title: "Post 2" },
      { id: 3, userId: 1, title: "Post 3" },
    ];

    const userId = 1;
    const result = letter.getPostsFromUser(posts, userId);

    expect(result).toHaveLength(2);
    expect(result[0].id).toEqual(1);
    expect(result[1].id).toEqual(3);
  });

});
