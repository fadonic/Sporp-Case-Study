const getPosts = (userId, postIds) => {
  let postIdsStr = postIds.join() // convert the arrays of ids to string
  let postsList = getPostsFromDb(postIdsStr) // fetch all posts with the given ids and return a collection

  //loop through each post in collection and process further
  let results = []
  for (let postRow of postsList) {
    let userInfoObj = getUserInfo(postRow.user_id) // get owner object with the corresponding id
    postRow.owner = userInfoObj // update postRow owner property with the returned object

    let userWithIdlikedThePost = checkIfUserWithGivenIdLikedThePost(
      userId,
      postRow.id
    ) // return true if user with userId like the post otherwise false
    postRow.liked = userWithIdlikedThePost // update postRow liked property with true or false

    let userWithIdFollowPostOwner = checkIfUserWithIdFollowPostOwner(
      userId,
      postRow.user_id
    ) // return true if user with userId follow this post owner otherwise
    postRow.owner.followed = userWithIdFollowPostOwner // update post owner followed property with true or false

    results.push(row) // push or add each update post struct to results array/list
  }

  return results // return the resultant array/list
}

const getPostsFromDb = postIdsStr => {
  let dbPostsSql = `SELECT * FROM post WHERE id IN (${postIdsStr})`
  let dbPostsQry = exec(dbPostsSql) //e.g mysql_query(dbPostsSql)
  return fetch_query_res(dbPostsQry) // e.g mysql_fetch_array(dbPostsQry)
}

const getUserInfo = userId => {
  let dbUserSql = `SELECT * FROM user WHERE id=${userId}`
  let dbUserQry = exec(dbUserSql) //e.g mysql_query(dbUserSql)
  return fetch_query_res(dbUserQry) // e.g mysql_fetch_array(dbUserQry)
}

const checkIfUserWithGivenIdLikedThePost = (userId, postRowId) => {
  let dbLikeSql = `SELECT * FROM like WHERE post_id=${postRowId} AND user_id=${userId}` // you can use select count(*) query also
  let dbLikeQry = exec(dbLikeSql) //e.g mysql_query(dbLikeSql)
  return mysql_nums_rows(dbLikeQry) > 0 // e.g mysql_nums_rows(dbLikeQry)
}

const checkIfUserWithIdFollowPostOwner = (userId, postOwnerId) => {
  let dbFollowSql = `SELECT * FROM follow WHERE follow_id=${userid} AND following_id=${postOwnerId}`
  let dbFollowQry = exec(dbFollowSql) //e.g mysql_query(dbFollowSql)
  return mysql_nums_rows(dbLikeQry) > 0 // e.g mysql_nums_rows(dbFollowQry)
}
