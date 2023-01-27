class Letter {
  async get() {
    try {
      const users = await this.getUsers();
      const posts = await this.getPosts();

      users.forEach((user) => {
        user.posts = this.getPostsFromUser(posts, user.id);
      });

      return users;
    } catch {
      console.error("Error fetching users with posts");
      return null;
    }
  }

  getPostsFromUser(posts, userId) {
    return posts
      .filter((post) => post.userId === userId)
      .map((post) => {
        const { userId, ...rest } = post;
        return rest;
      });
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      try {
        fetch("https://jsonplaceholder.typicode.com/users").then((response) => {
          resolve(response.json());
        });
      } catch {
        reject("Error fetching users");
      }
    });
  }

  getPosts() {
    return new Promise((resolve, reject) => {
      try {
        fetch("https://jsonplaceholder.typicode.com/posts").then((response) => {
          resolve(response.json());
        });
      } catch {
        reject("Error fetching posts");
      }
    });
  }
}

module.exports = Letter;
