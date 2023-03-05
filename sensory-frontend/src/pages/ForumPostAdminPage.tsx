import { useEffect, useState } from 'react';
import './styles/PostList.css'; 

// Define an interface for the Post object
interface Post {
  PostInformation_Id: number;
  PostInformation_Title: string;
  PostInformation_Content: string;
  PostCategory_Id: number;
}

// Define a function to fetch the list of posts from the API
async function fetchPosts(): Promise<Post[]> {
  const response = await fetch('http://localhost:3081/api/postinformation');
  const data = await response.json();
  return data;
}

// Define a function to delete a post from the list of posts and from the API
async function deletePost(postId: number): Promise<void> {
  await fetch(`/api/forum/${postId}`, { method: 'DELETE' });
}

// Define a component to display a single post with a delete button
function PostItem({ post, onDelete }: { post: Post; onDelete: (postId: number) => void }) {
  const handleDeleteClick = () => {
    onDelete(post.PostInformation_Id);
  };

  return (
    <div className="post-item">
      <h2 className="post-item-title">{post.PostInformation_Title}</h2>
      <p className="post-item-content">{post.PostInformation_Content}</p>
      <button className="post-item-delete-button" onClick={handleDeleteClick}>
        Delete
      </button>
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
    setPosts(posts.filter(post => post.PostInformation_Id !== postId));
  };

  return (
    <div className="post-list">
      <div className="post-list-header">
        <div className="post-list-title">Title</div>
        <div className="post-list-content">Content</div>
        <div className="post-list-delete">Delete</div>
      </div>
      {posts.map(post => (
        <PostItem key={post.PostInformation_Id} post={post} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default PostList;