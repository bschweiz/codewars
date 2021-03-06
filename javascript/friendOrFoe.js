// my solution:

function friend(friends){
  let filteredFriends = []
  friends.forEach(f => {
    if (f.length == 4) {
      filteredFriends.push(f);
    }
  })
  return filteredFriends
}

// simpler:

function friend(friends){
  return friends.filter(n => n.length === 4)
}
