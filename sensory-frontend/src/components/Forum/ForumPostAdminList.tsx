import { useEffect, useState } from 'react';

// Define an interface for the Post object
interface Post {
  id: number;
  title: string;
  content: string;
}

// Define a function to fetch the list of posts from the API
async function fetchPosts(): Promise<Post[]> {
  const response = await fetch('/api/postinformation');
  const data = await response.json();
  return data.posts;
}

// Define a function to delete a post from the list of posts and from the API
async function deletePost(postId: number): Promise<void> {
  await fetch(`/api/forum/${postId}`, { method: 'DELETE' });
}

// Define a component to display a single post with a delete button
function PostItem({ post, onDelete }: { post: Post; onDelete: (postId: number) => void }) {
  const handleDeleteClick = () => {
    onDelete(post.id);
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
}

// Define a component to display a list of posts
function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    }
    fetchData();
  }, []);

  const handleDelete = async (postId: number) => {
    await deletePost(postId);
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <div>
      {posts.map(post => (
        <PostItem key={post.id} post={post} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default PostList;