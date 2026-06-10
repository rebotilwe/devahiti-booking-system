import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, X, Eye } from "lucide-react";

const API_URL = "https://devahiti-booking-system.onrender.com/api";

export default function AdminBlogs() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    image_url: "",
    read_time: "5 min read",
  });

  // Fetch all blog posts
  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/blog`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Auto-generate slug from title
    if (name === "title") {
      setFormData((prev) => ({ ...prev, slug: generateSlug(value) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingPost 
        ? `${API_URL}/blog/${editingPost.id}`
        : `${API_URL}/blog`;
      
      const method = editingPost ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        fetchPosts();
        setShowForm(false);
        setEditingPost(null);
        setFormData({
          title: "",
          slug: "",
          excerpt: "",
          content: "",
          category: "",
          image_url: "",
          read_time: "5 min read",
        });
        alert(editingPost ? "Post updated!" : "Post created!");
      } else {
        alert("Failed to save post");
      }
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Error saving post");
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      category: post.category || "",
      image_url: post.image_url || "",
      read_time: post.read_time || "5 min read",
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        const response = await fetch(`${API_URL}/blog/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchPosts();
          alert("Post deleted");
        } else {
          alert("Failed to delete post");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Error deleting post");
      }
    }
  };

  if (loading) return <div className="text-center py-8">Loading posts...</div>;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-heading">Blog Posts</h2>
          <p className="text-sm text-gray-500">Manage your blog content</p>
        </div>
        <button
          onClick={() => {
            setEditingPost(null);
            setFormData({
              title: "",
              slug: "",
              excerpt: "",
              content: "",
              category: "",
              image_url: "",
              read_time: "5 min read",
            });
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#65AEEA] text-white rounded-lg hover:bg-[#4A9FD9] transition"
        >
          <Plus className="h-4 w-4" /> New Post
        </button>
      </div>

      {/* Blog Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h3 className="text-xl font-heading">
                {editingPost ? "Edit Post" : "Create New Post"}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#65AEEA]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Slug *</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg bg-gray-50"
                />
                <p className="text-xs text-gray-500 mt-1">URL-friendly identifier (auto-generated from title)</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#65AEEA]"
                >
                  <option value="">Select Category</option>
                  <option value="Philosophy">Philosophy</option>
                  <option value="Stress Management">Stress Management</option>
                  <option value="Teacher Training">Teacher Training</option>
                  <option value="Wellness">Wellness</option>
                  <option value="Reflections">Reflections</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Excerpt (Short Description)</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#65AEEA]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Content (HTML) *</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows={10}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#65AEEA] font-mono text-sm"
                  placeholder="<p>Your blog content here...</p>"
                />
                <p className="text-xs text-gray-500 mt-1">HTML formatting allowed (e.g., &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;h3&gt;)</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  type="text"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#65AEEA]"
                  placeholder="/images/your-image.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">Path to image in assets folder or external URL</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Read Time</label>
                <input
                  type="text"
                  name="read_time"
                  value={formData.read_time}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#65AEEA]"
                  placeholder="5 min read"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#65AEEA] text-white rounded-lg hover:bg-[#4A9FD9] transition"
                >
                  {editingPost ? "Update Post" : "Publish Post"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Blog Posts List */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No blog posts yet. Click "New Post" to create one.
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 bg-[#65AEEA]/10 text-[#65AEEA] rounded-full">
                      {post.category || "Uncategorized"}
                    </span>
                    <span className="text-xs text-gray-400">{post.read_time}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{post.excerpt}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Slug: /blog/{post.slug} • Created: {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => window.open(`/blog/${post.slug}`, "_blank")}
                    className="p-2 text-gray-500 hover:text-[#65AEEA] transition"
                    title="View"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(post)}
                    className="p-2 text-gray-500 hover:text-blue-500 transition"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2 text-gray-500 hover:text-red-500 transition"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}