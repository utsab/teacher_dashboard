export default function challenge() {
  return new Promise((resolve) => {
    resolve({
      title: 'challnege title',
      description: 'challenge description',
      solution: 'challenge solution'
    });
  });
}
