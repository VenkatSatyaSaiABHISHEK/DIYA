'use client';

import { useState, useEffect } from 'react';
import { contentService } from '../services/content.service';
import type { ContentPost } from '../types';

export function useContent() {
  const [posts, setPosts] = useState<ContentPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    contentService
      .listPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading };
}
