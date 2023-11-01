export async function wait(time = 1200) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, time);
  });
}
