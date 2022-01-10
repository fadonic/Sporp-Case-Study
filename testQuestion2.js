const mergePosts = posts => {
  let duplicatePosts = []
  let uniquePosts = []
  let memo = {}

  for (let postList of posts) {
    for (let postItem of postList) {
      duplicatePosts.push(postItem) //Array.push has constant time therefore the algorithm takes O(m*n) time complexity and O(n) space complexity , m=row and n = col
    }
  }
  for (let postItem of duplicatePosts) {
    if (!memo[postItem.id]) {
      uniquePosts.push(postItem) // O(n) time complexity and O(2*n)=>O(n) space complexity,  n = length of duplicatePosts
      memo[postItem.id] = true
    }
  }
  sortPosts(uniquePosts) // O(nlogn)
  return uniquePosts // overal time compexity is O(n*m) + O(n) + O(nlogn) = O(n*m) upper bound, while the space complexity is O(3n)=>O(n) ignoring constant
}

const sortPosts = posts => {
  posts.sort((a, b) => {
    if (a.created_at > b.created_at) {
      return -1
    }
    if (a.created_at < b.created_at) {
      return 1
    }
    if (a.id > b.id) {
      return -1
    }
    if (a.id < b.id) {
      return 1
    }
    return 0
  }) // O(nlog n) complexity and constant space O(1)
}

console.log(
  mergePosts([
    [
      { id: 1, des: 'post1', created_at: new Date().toISOString() + 1 },
      { id: 2, des: 'post2', created_at: new Date().toISOString() + 2 },
      { id: 3, des: 'post3', created_at: new Date().toISOString() + 3 }
    ],
    [
      { id: 3, des: 'post3', created_at: new Date().toISOString() + 3 },
      { id: 6, des: 'post4', created_at: new Date().toISOString() + 5 },
      { id: 5, des: 'post5', created_at: new Date().toISOString() + 5 }
    ]
  ])
)
