export const queryKeys = {
  sample: "sample",
  member: "member",
  posts: "posts",
  reservations: "reservations",
};

export const sampleKeys = {
  key: "sample",
  sample: (id: number) => [sampleKeys.key, { id }],
  samples: () => [sampleKeys.key],
};
