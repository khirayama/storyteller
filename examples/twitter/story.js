const transitionColor = '#1da1f2';

const home = {
  id: '/home',
  title: {
    text: 'Home Screen'
  },
  description: {
    fontSize: 14,
    text: "url: /\nDisplay timeline"
  },
  grid: {
    x: 0,
    y: 0
  },
  screen: {
    width: 300,
    imagePath: './images/home.png'
  },
  transitions: [{
    color: transitionColor,
    to: {
      description: {
        text: 'transition rate: 5%(Example)'
      },
      id: '/posts/show',
      offset: {
        x: 0,
        y: 30
      }
    },
    from: {
      description: {
        text: 'transition rate: 5%(Example)'
      },
      x: 244,
      y: 247,
      radius: 8
    }
  }, {
    color: transitionColor,
    room: {
      x: 60,
      y: 60
    },
    to: {
      id: '/posts/new',
      offset: {
        x: 0,
        y: 60
      }
    },
    from: {
      x: 271,
      y: 517,
      radius: 8
    }
  }, {
    color: transitionColor,
    room: {
      x: 30,
      y: -30
    },
    to: {
      id: '/search',
      offset: {
        x: 0,
        y: 30
      }
    },
    from: {
      x: 128,
      y: 63,
      radius: 8
    }
  }, {
    color: transitionColor,
    to: {
      id: '/notifications/index',
      offset: {
        x: 0,
        y: 30
      }
    },
    from: {
      x: 204,
      y: 63,
      radius: 8
    }
  }, {
    color: transitionColor,
    room: {
      x: -30,
      y: 90
    },
    to: {
      id: '/menu',
      offset: {
        x: 0,
        y: 30
      }
    },
    from: {
      x: 21,
      y: 31,
      radius: 8
    }
  }]
};

const postsShow = {
  id: '/posts/show',
  grid: {
    x: 1,
    y: 0
  },
  screen: {
    width: 300,
    imagePath: './images/posts_show.png'
  },
  transitions: [{
    color: transitionColor,
    room: {
      x: 120,
      y: 0
    },
    to: {
      id: '/posts/new',
      offset: {
        x: 0,
        y: 30
      }
    },
    from: {
      x: 271,
      y: 517,
      radius: 8
    }
  }]
};

const postsNew = {
  id: '/posts/new',
  grid: {
    x: 1,
    y: 1
  },
  screen: {
    width: 300,
    imagePath: './images/posts_new.png'
  },
  transitions: [{
    color: transitionColor,
    room: {
      x: 0,
      y: 30
    },
    to: {
      id: '/home',
      offset: {
        x: 0,
        y: 30
      }
    },
    from: {
      x: 271,
      y: 20,
      radius: 8
    }
  }]
};

const search = {
  id: '/search',
  grid: {
    x: 1,
    y: 2
  },
  screen: {
    width: 300,
    imagePath: './images/search.png'
  },
  transitions: []
};

const notificationsIndex = {
  id: '/notifications/index',
  grid: {
    x: 1,
    y: 3
  },
  screen: {
    width: 300,
    imagePath: './images/notifications_index.png'
  },
  transitions: []
};

const menu = {
  id: '/menu',
  grid: {
    x: 1,
    y: 4
  },
  screen: {
    width: 300,
    imagePath: './images/menu.png'
  },
  transitions: [{
    color: transitionColor,
    to: {
      id: '/profile',
      offset: {
        x: 0,
        y: 30
      }
    },
    from: {
      x: 21,
      y: 31,
      radius: 8
    }
  }]
};

const profile = {
  id: '/profile',
  grid: {
    x: 2,
    y: 0
  },
  screen: {
    width: 300,
    imagePath: './images/profile.png'
  },
  transitions: []
};

export const story = [home, postsShow, postsNew, search, notificationsIndex, menu, profile];
