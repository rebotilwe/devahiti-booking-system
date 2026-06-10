import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM blog_posts ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// Get single blog post by slug
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const result = await db.query(
      'SELECT * FROM blog_posts WHERE slug = $1',
      [slug]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

// Create new blog post (Admin only)
router.post('/', async (req, res) => {
  const { title, excerpt, content, category, image_url, slug, read_time } = req.body;
  
  if (!title || !content || !slug) {
    return res.status(400).json({ error: 'Title, content, and slug are required' });
  }

  try {
    const result = await db.query(
      `INSERT INTO blog_posts (title, excerpt, content, category, image_url, slug, read_time, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
       RETURNING *`,
      [title, excerpt || '', content, category || 'General', image_url || '', slug, read_time || '5 min read', 'published']
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ error: 'Failed to create blog post' });
  }
});

// Update blog post (Admin only)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, excerpt, content, category, image_url, slug, read_time, status } = req.body;

  try {
    const result = await db.query(
      `UPDATE blog_posts 
       SET title = $1, excerpt = $2, content = $3, category = $4, 
           image_url = $5, slug = $6, read_time = $7, status = $8, updated_at = NOW()
       WHERE id = $9
       RETURNING *`,
      [title, excerpt, content, category, image_url, slug, read_time, status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ error: 'Failed to update blog post' });
  }
});

// Delete blog post (Admin only)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM blog_posts WHERE id = $1', [id]);
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

export default router;