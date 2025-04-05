// Frontend/src/data/sampleImages.ts
export const sampleThumbnails = [
  {
    id: 1,
    color: '#e57373',
    title: 'Sample Video 1',
  },
  {
    id: 2,
    color: '#81c784',
    title: 'Sample Video 2',
  },
  {
    id: 3,
    color: '#64b5f6',
    title: 'Sample Video 3',
  },
  {
    id: 4,
    color: '#ffb74d',
    title: 'Sample Video 4',
  },
  {
    id: 5,
    color: '#ba68c8',
    title: 'Sample Video 5',
  },
  {
    id: 6,
    color: '#4fc3f7',
    title: 'Sample Video 6',
  },
  {
    id: 7,
    color: '#aed581',
    title: 'Sample Video 7',
  },
];

export const getRandomSampleThumbnail = () => {
  const randomIndex = Math.floor(Math.random() * sampleThumbnails.length);
  return sampleThumbnails[randomIndex];
};