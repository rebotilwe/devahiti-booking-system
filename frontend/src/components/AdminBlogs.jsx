import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, X, Eye, Upload } from "lucide-react";

const API_URL = "https://devahiti-booking-system.onrender.com/api";

export default function AdminBlogs() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
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
    
    if (name === "title") {
      setFormData((prev) => ({ ...prev, slug: generateSlug(value) }));
    }
  };

// More aggressive compression for blog images
const compressImage = (file, maxWidth = 600, quality = 0.5) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Reduce max width to 600px (smaller = less base64 size)
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Use lower quality (0.5 = 50% quality)
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

// Handle image file selection with compression
const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  // Check file size (max 3MB - reduced from 5MB)
  if (file.size > 3 * 1024 * 1024) {
    alert("Image size should be less than 3MB");
    return;
  }
  
  // Check file type
  if (!file.type.startsWith("image/")) {
    alert("Please select an image file");
    return;
  }
  
  setImageFile(file);
  setImagePreview(URL.createObjectURL(file));
  setUploadingImage(true);
  
  try {
    // Compress image with smaller dimensions and lower quality
    const compressedImage = await compressImage(file, 600, 0.5);
    setFormData(prev => ({ ...prev, image_url: compressedImage }));
    console.log("Image compressed and ready to save");
  } catch (error) {
    console.error("Error compressing image:", error);
    alert("Failed to process image");
  } finally {
    setUploadingImage(false);
  }
};

  // Clear selected image
  const clearImage = () => {
    setImageFile(null);
    setImagePreview("");
    setFormData(prev => ({ ...prev, image_url: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.slug) {
      alert("Please fill in all required fields (Title, Content, Slug)");
      return;
    }
    
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
        setImageFile(null);
        setImagePreview("");
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
        const error = await response.json();
        alert(`Failed to save post: ${error.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Error saving post. Please try again.");
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
    if (post.image_url && post.image_url.startsWith("data:image")) {
      setImagePreview(post.image_url);
    } else {
      setImagePreview("");
    }
    setImageFile(null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
      try {
        const response = await fetch(`${API_URL}/blog/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchPosts();
          alert("Post deleted successfully");
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
            setImageFile(null);
            setImagePreview("");
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
              {/* Title */}
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
              
              {/* Slug */}
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
              
              {/* Category */}
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
              
              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium mb-1">Excerpt (Short Description)</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#65AEEA]"
                  placeholder="A brief summary of the post..."
                />
              </div>
              
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-1">Featured Image</label>
                <div className="mt-1 flex items-center gap-4">
                  <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition ${imagePreview ? 'border-[#65AEEA] bg-[#65AEEA]/5' : 'border-gray-300'}`}>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {uploadingImage ? (
                        <div className="w-8 h-8 border-2 border-[#65AEEA] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <p className="text-xs text-gray-500">Click to upload image</p>
                          <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
                          <p className="text-xs text-green-600 mt-1">Image will be compressed automatically</p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {imagePreview && (
                    <div className="relative">
                      <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border" />
                      <button
                        type="button"
                        onClick={clearImage}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Image URL (alternative) */}
              <div>
                <label className="block text-sm font-medium mb-1">Image URL (alternative)</label>
                <input
                  type="text"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#65AEEA]"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">Use a URL instead of uploading (optional)</p>
              </div>
              
              {/* Read Time */}
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
              
              {/* Content */}
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
              
              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={uploadingImage}
                  className="flex-1 py-2 bg-[#65AEEA] text-white rounded-lg hover:bg-[#4A9FD9] transition disabled:opacity-50"
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
              <div className="flex gap-4">
                {(post.image_url) && (
                  <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                    <img 
                      src={post.image_url} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
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