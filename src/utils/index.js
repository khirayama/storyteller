export function startStory(story) {
  const _story = JSON.parse(JSON.stringify(story));

  return Promise.all(_story.map((scene) => {
    return new Promise(resolve => {
      if (scene.screen.imagePath) {
        const img = new Image();
        img.src = scene.screen.imagePath;
        img.addEventListener('load', (event) => {
          scene.screen.img = img;
          if (scene.screen.width && !scene.screen.height) {
            const scale = img.width / scene.screen.width;
            scene.screen.height = img.height / scale;
          }
          if (!scene.screen.width && scene.screen.height) {
            const scale = img.height / scene.screen.height;
            scene.screen.width = img.width / scale;
          }
          resolve();
        });
      } else {
        resolve();
      }
    });
  })).then(() => {
    return _story;
  });
}

