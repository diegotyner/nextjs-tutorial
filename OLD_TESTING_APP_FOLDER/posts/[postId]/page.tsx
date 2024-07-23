import React from 'react'

const page = ( { params }: {params: {postId: string}} ) => {
  return (
    <div>page: {params.postId}</div>
  )
}

export default page